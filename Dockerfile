# Multi-stage build for SvelteKit application
# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine AS runner

# Install dumb-init and curl for proper signal handling and health checks
RUN apk add --no-cache dumb-init curl

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S sveltekit -u 1001

# Set working directory
WORKDIR /app

# Install only production dependencies in the runtime stage
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build

# Copy static files if they exist
COPY --from=builder --chown=sveltekit:nodejs /app/static ./static

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Health check - using curl for reliable health checking (before user switch)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Switch to non-root user
USER sveltekit

# Start the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build/index.js"] 