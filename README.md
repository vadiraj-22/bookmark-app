# Smart Bookmark Web App

A production-ready bookmark manager with Google OAuth authentication and real-time synchronization across browser tabs. Built with modern web technologies and best practices.

## 📚 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get running in 15 minutes
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- **[Contributing Guide](./CONTRIBUTING.md)** - Development guidelines
- **[Verification Checklist](./VERIFICATION.md)** - Testing guide
- **[Project Summary](./PROJECT_SUMMARY.md)** - Technical overview
- **[Documentation Index](./DOCUMENTATION_INDEX.md)** - Complete guide to all docs

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Supabase** - Backend as a Service (Auth, Postgres, Realtime)
- **Tailwind CSS** - Utility-first styling
- **Zod** - Runtime validation

## Features

- Google OAuth authentication via Supabase
- Private bookmark management with Row Level Security
- Real-time updates across browser tabs
- Server-side rendering for optimal performance
- Protected routes with middleware
- Form validation and error handling
- Responsive, modern UI design
- Optimistic UI updates

## Project Structure

```
app/
├── auth/callback/      # OAuth callback handler
├── dashboard/          # Main dashboard (protected)
│   ├── AddBookmarkForm.tsx
│   ├── BookmarkCard.tsx
│   ├── BookmarkList.tsx
│   ├── Header.tsx
│   └── page.tsx
├── login/              # Login page
│   ├── LoginButton.tsx
│   └── page.tsx
├── layout.tsx
└── page.tsx
lib/
├── supabaseClient.ts   # Browser client
├── supabaseServer.ts   # Server client
└── validations.ts      # Zod schemas
types/
├── database.types.ts   # Supabase types
└── index.ts            # App types
middleware.ts           # Route protection
```

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud Console account (for OAuth)

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Configuration

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned

#### Create the Bookmarks Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view only their bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their bookmarks
CREATE POLICY "Users can insert own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their bookmarks
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

#### Enable Realtime

1. Go to Database → Replication in Supabase dashboard
2. Enable replication for the `bookmarks` table

### 3. Google OAuth Setup

#### Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Navigate to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen if prompted
6. Application type: "Web application"
7. Add authorized redirect URIs:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
8. Copy the Client ID and Client Secret

#### Configure Supabase Auth

1. In Supabase dashboard, go to Authentication → Providers
2. Enable Google provider
3. Paste your Google Client ID and Client Secret
4. Save changes

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
- Supabase Dashboard → Project Settings → API

**IMPORTANT**: Never commit `.env.local` to version control. Never use the `service_role` key in client-side code.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### 3. Update Google OAuth

Add your Vercel domain to Google Cloud Console authorized redirect URIs:
```
https://your-project-ref.supabase.co/auth/v1/callback
```

## Architecture

### Authentication Flow

1. User clicks "Continue with Google" on `/login`
2. Supabase redirects to Google OAuth
3. Google redirects back to `/auth/callback`
4. Callback exchanges code for session
5. User redirected to `/dashboard`

### Route Protection

Middleware checks authentication status:
- Unauthenticated users → `/login`
- Authenticated users trying to access `/login` → `/dashboard`
- Session refresh handled automatically

### Data Flow

1. **Server Components**: Initial data fetch on page load
2. **Client Components**: Handle user interactions
3. **Realtime Subscriptions**: Sync changes across tabs
4. **Optimistic Updates**: Immediate UI feedback

### Security Model

- **Row Level Security**: Database-level access control
- **Server-Side Auth**: Session validation in middleware
- **Client-Side Auth**: Supabase client with secure cookies
- **Input Validation**: Zod schemas prevent invalid data
- **HTTPS Only**: Enforced in production

## Security Decisions

### Why Row Level Security?

RLS ensures users can only access their own data, even if client-side code is compromised. Policies are enforced at the database level.

### Why Separate Supabase Clients?

- **Server Client**: Uses cookies for SSR-safe authentication
- **Browser Client**: Handles client-side operations and realtime

### Why Middleware for Auth?

Middleware runs before page rendering, enabling:
- Fast redirects without page flash
- Session refresh on every request
- Centralized auth logic

### Environment Variables

- `NEXT_PUBLIC_*` variables are exposed to the browser
- `ANON_KEY` is safe to expose (RLS protects data)
- `SERVICE_ROLE_KEY` must NEVER be used client-side

## Challenges & Solutions

### Challenge 1: Realtime Duplicate Events

**Problem**: Realtime subscriptions can fire multiple times for the same event.

**Solution**: Check for existing IDs before adding to state:
```typescript
if (current.some((b) => b.id === newBookmark.id)) {
  return current
}
```

### Challenge 2: Memory Leaks

**Problem**: Realtime subscriptions persist after component unmount.

**Solution**: Cleanup in useEffect:
```typescript
return () => {
  supabase.removeChannel(channel)
}
```

### Challenge 3: Cookie Handling in Server Components

**Problem**: Server Components can't set cookies directly.

**Solution**: Use middleware to refresh sessions and handle cookie updates.

### Challenge 4: Form Validation

**Problem**: Need both client and server-side validation.

**Solution**: Zod schemas provide type-safe validation reusable on both sides.

### Challenge 5: Optimistic UI Updates

**Problem**: Waiting for database confirmation creates lag.

**Solution**: Update UI immediately, rollback on error:
```typescript
setBookmarks((current) => current.filter((b) => b.id !== id))
```

## Performance Optimizations

- Server Components for initial render (faster FCP)
- Minimal client-side JavaScript
- Optimistic updates for instant feedback
- Indexed database queries
- Realtime subscriptions only for current user

## Development Tips

### Testing Realtime

Open multiple browser tabs to see real-time sync in action.

### Debugging Auth

Check Supabase dashboard → Authentication → Users to verify user creation.

### Database Queries

Use Supabase dashboard → Table Editor to inspect data and test RLS policies.

## Common Issues

### "Invalid login credentials"

- Verify Google OAuth is enabled in Supabase
- Check redirect URIs match exactly
- Ensure environment variables are set

### Realtime not working

- Verify replication is enabled for bookmarks table
- Check browser console for subscription errors
- Ensure RLS policies allow SELECT

### Build fails on Vercel

- Verify all environment variables are set
- Check TypeScript errors with `npm run build`
- Review Vercel build logs

## License

MIT

## Support

For issues or questions, please open a GitHub issue.
