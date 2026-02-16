# LinkLedger - Intelligent Bookmark Manager

![LinkLedger Hero](https://via.placeholder.com/1200x600/0f172a/ffffff?text=LinkLedger+Dashboard)

**LinkLedger** is a modern, production-ready bookmark manager designed to organize your digital life. Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**, it features secure Google OAuth authentication, real-time synchronization across devices, and a beautiful, responsive interface.

Stop drowning in tabs. Save, organize, and access your favorite links from anywhere.

## 🚀 Key Features

- **⚡ Lightning Fast**: Built on Next.js App Router for optimal performance and SEO.
- **🔒 Secure Authentication**: Robust Google OAuth integration via Supabase Auth with Row Level Security (RLS) ensuring your data remains private.
- **🔄 Real-time Sync**: Instant updates across all open tabs and devices using Supabase Realtime.
- **📱 Fully Responsive**: A mobile-first design that looks great on desktops, tablets, and phones.
- **🎨 Modern UI/UX**: Polished interface with optimistic UI updates, loading states, and smooth transitions.

## 🔮 Roadmap

- [ ] **Smart AI Categorization**: Automatically tag and sort bookmarks using LLMs.
- [ ] **Browser Extension**: Save links directly from your toolbar.
- [ ] **Search & Filtering**: Full-text search across titles and descriptions.
- [ ] **Public Collections**: Share curated lists with the world.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth)
- **Validation**: [Zod](https://zod.dev/)

---

## 📚 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get running in 15 minutes
- **[Deployment Guide](./DEPLOYMENT.md)** - detailed production deployment steps
- **[Contributing Guide](./CONTRIBUTING.md)** - Development guidelines

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) account
- A [Google Cloud Console](https://console.cloud.google.com/) project (for OAuth)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/linkledger.git
cd linkledger
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Supabase Database

Run the following SQL in your Supabase SQL Editor to create the necessary tables and policies:

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

-- Enable Row Level Security (RLS)
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

### 4. Enable Google OAuth

1.  Go to **Authentication > Providers** in Supabase and enable **Google**.
2.  Paste your **Client ID** and **Client Secret** from Google Cloud Console.
3.  Add `http://localhost:3000/auth/callback` to your **Redirect URLs** in Supabase.

### 5. Run the server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app in action.

---

## 🏗️ Project Structure

```bash
app/
├── auth/           # Authentication routes (callback handling)
├── dashboard/      # Protected dashboard pages
├── login/          # Public login page
├── api/            # API routes (if any)
└── layout.tsx      # Root layout and providers
components/         # Reusable UI components
lib/
├── supabaseClient.ts # Client-side Supabase client
└── supabaseServer.ts # Server-side Supabase client (cookies)
types/              # TypeScript definitions
middleware.ts       # Auth protection middleware
```

## 🔒 Security Architecture

LinkLedger uses a "Defense in Depth" strategy:

1.  **Middleware Protection**: Unauthenticated users are redirected before they even reach protected pages.
2.  **Row Level Security (RLS)**: Even if the API is accessed directly, the database rejects queries that don't match the user's ID.
3.  **Server-Side Validation**: Zod schemas validate all inputs before they reach the database.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
