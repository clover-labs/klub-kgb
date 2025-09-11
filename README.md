# Landing Page - SvelteKit + Directus

A modern, responsive landing page built with SvelteKit and integrated with Directus CMS for blog post management.

## Features

- 🎨 **Modern Design**: Clean, responsive design with beautiful gradients and animations
- 📱 **Mobile-First**: Fully responsive layout that works on all devices
- 📧 **Newsletter Signup**: Email subscription form with validation
- 📝 **Blog Integration**: Dynamic blog posts fetched from Directus CMS
- 🔗 **Individual Blog Pages**: Each blog post has its own dedicated page
- ⚙️ **Configurable**: Easy environment configuration for Directus settings
- 🚀 **Fast**: Built with SvelteKit for optimal performance

## Tech Stack

- **SvelteKit** - Full-stack web framework
- **TypeScript** - Type safety and better developer experience
- **Directus** - Headless CMS for content management
- **CSS3** - Modern styling with gradients and animations

## Prerequisites

- Node.js (v18 or higher)
- npm
- Directus instance running (local or remote)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd landing-test
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Directus Configuration
PUBLIC_DIRECTUS_URL=http://localhost:8055
PUBLIC_DIRECTUS_COLLECTION_NAME=blog_posts
```

### 3. Directus Setup

1. **Install Directus** (if not already installed):
   ```bash
   npm install -g @directus/cli
   npx directus init
   ```

2. **Create a Collection**:
   - Go to your Directus admin panel
   - Create a new collection called `blog_posts` (or use your preferred name)
   - Add the following fields:
     - `id` (Primary Key, Auto Increment)
     - `title` (String, Required)
     - `description` (Text)
     - `image` (File/Image)
     - `content` (Text/HTML)
     - `created_at` (DateTime, Auto)
     - `updated_at` (DateTime, Auto)

3. **Set Permissions**:
   - Make sure the `blog_posts` collection is publicly readable
   - Go to Settings > Roles & Permissions > Public
   - Enable "Read" permission for the `blog_posts` collection

4. **Add Sample Data**:
   - Create a few blog posts with sample content
   - Upload images for each post

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### 5. Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── BlogCard.svelte      # Blog post card component
│   │   └── NewsletterForm.svelte # Email subscription form
│   ├── api.ts                   # Frontend API service
│   ├── directus.ts              # Backend Directus integration
│   ├── env.ts                   # Environment configuration
│   └── types.ts                 # TypeScript type definitions
├── routes/
│   ├── api/
│   │   ├── blog/
│   │   │   ├── +server.ts       # Blog posts API endpoint
│   │   │   └── [id]/
│   │   │       └── +server.ts   # Individual blog post API
│   │   └── images/
│   │       └── [id]/
│   │           └── +server.ts   # Image proxy API (backup)
│   ├── +layout.svelte           # Global layout
│   ├── +page.svelte             # Landing page
│   ├── +page.ts                 # Landing page data loader
│   └── blog/
│       └── [id]/
│           ├── +page.ts         # Blog post data loader
│           └── +page.svelte     # Individual blog post page
└── static/
    ├── hero-image.svg           # Hero section image
    ├── placeholder-image.svg    # Placeholder for blog cards
    └── placeholder-image-large.svg # Placeholder for blog posts
```

## Customization

### Styling
- Modify the CSS in each component's `<style>` section
- Global styles are defined in `src/routes/+layout.svelte`
- The design uses CSS custom properties for easy theming

### Content
- Update the hero section content in `src/routes/+page.svelte`
- Modify page titles and meta descriptions in the `<svelte:head>` sections
- Replace the hero image in `static/hero-image.svg`

### Directus Integration
- Update the collection name in your `.env` file
- Modify field names in `src/lib/directus.ts` if your Directus schema differs
- Add authentication if needed by updating the Directus client configuration

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_DIRECTUS_URL` | Directus instance URL | `http://localhost:8055` |
| `PUBLIC_DIRECTUS_COLLECTION_NAME` | Collection name for blog posts | `blog_posts` |

## Deployment

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Node.js applications. Make sure to:
- Set the environment variables
- Run `npm run build` during the build process
- Serve the built files from the `build` directory

## Troubleshooting

### Common Issues

1. **Blog posts not loading**:
   - Check if Directus is running
   - Verify the collection name in environment variables
   - Ensure the collection has proper permissions

2. **Images not displaying**:
   - Check if image URLs are accessible
   - Verify Directus file permissions
   - Ensure images are properly uploaded to Directus

3. **Build errors**:
   - Make sure all dependencies are installed
   - Check for TypeScript errors
   - Verify environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.