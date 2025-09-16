# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run check` - Type-check TypeScript and Svelte files
- `npm run check:watch` - Type-check in watch mode

## Architecture

This is a SvelteKit landing page application with Directus CMS integration:

### Core Technologies
- **SvelteKit** with Node adapter for SSR
- **TypeScript** with strict mode enabled
- **Directus SDK** for CMS integration
- **Vite** as build tool

### Key Patterns

#### API Proxy Pattern
The app uses server-side API routes to proxy Directus requests, avoiding CORS issues:
- Frontend calls `/api/blog` endpoints
- Server routes in `src/routes/api/` handle Directus communication
- All external API calls happen server-side

#### Environment Configuration
- Environment variables use `PUBLIC_` prefix for client accessibility
- Access via `$env/dynamic/public` imports (not `import.meta.env`)
- Configuration centralized in `src/lib/env.ts` with fallback defaults

#### Directus Integration
- Client configured in `src/lib/directus.ts`
- Collection name and URL configured via environment variables
- Posts filtered by `status: 'published'` automatically

### Project Structure
- `/src/lib/` - Shared components, utilities, and Directus client
- `/src/routes/api/` - Server-side API endpoints for proxying external requests
- `/src/routes/` - Page routes and layouts
- Environment variables configured via `.env` file (see ENVIRONMENT_SETUP.md)