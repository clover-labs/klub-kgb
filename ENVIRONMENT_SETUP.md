# Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Directus Configuration
LANDING_DIRECTUS_URL=http://localhost:8055
LANDING_DIRECTUS_COLLECTION_NAME=blog_posts
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LANDING_DIRECTUS_URL` | Directus instance URL | `https://cms.cloverlabs.dev` |
| `LANDING_DIRECTUS_COLLECTION_NAME` | Collection name for blog posts | `landing_test_posts` |

## Directus Collection Schema

Your Directus collection should have the following fields:

- `id` (Primary Key, Auto Increment)
- `status` (String, Required) - for published/draft status
- `title` (String, Required)
- `description` (Text)
- `image` (File/Image) - stores file ID
- `content` (Text/HTML)
- `date_created` (DateTime, Auto)
- `date_updated` (DateTime, Auto)

## Permissions

Make sure the collection is publicly readable:
1. Go to Settings > Roles & Permissions > Public
2. Enable "Read" permission for your blog posts collection

## CORS Configuration

If you're still getting CORS errors, you need to configure Directus to allow requests from your domain:

### Option 1: Configure Directus CORS (Recommended)

1. Go to your Directus admin panel
2. Navigate to Settings > Security & Access
3. In the CORS section, add your domain:
   - For development: `http://localhost:5173`
   - For production: your actual domain
4. Save the settings

### Option 2: Backend API Proxy (Implemented)

The application uses a backend API proxy to avoid CORS issues entirely:

- **Frontend** makes requests to `/api/blog` and `/api/blog/[id]`
- **Backend API** fetches data from Directus server-side
- **No CORS issues** since all Directus requests happen on the server
- **Clean separation** between frontend and external API calls
