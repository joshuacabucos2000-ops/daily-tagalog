# Daily Tagalog

A production-style Next.js starter with Supabase email authentication and cloud-synced lesson progress.

## 1. Supabase
1. Create a project at Supabase.
2. Open SQL Editor, copy `supabase/schema.sql`, and run it.
3. In Authentication > URL Configuration, set Site URL to your Vercel URL. Add `http://localhost:3000/auth/callback` for local testing.
4. Copy the Project URL and Publishable key.

## 2. Environment variables
Copy `.env.example` to `.env.local` and fill in both values.
On Vercel, add the same values under Project Settings > Environment Variables.

## 3. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## 4. Deploy
Upload this project to a GitHub repository, import it into Vercel, add the environment variables, and deploy.

## Current features
- Responsive landing page
- Email/password signup and login
- Username stored in auth metadata
- Protected dashboard
- Cloud-synced lesson progress
- Row Level Security
- Sign out
