# Daily Tagalog

A cloud-backed conversational Tagalog learning app built with Next.js and Supabase.

## Included

- Email/password accounts through Supabase Auth
- Protected dashboard
- Cloud-synced lesson progress
- Interactive Lesson 1: vocabulary, grammar, translation practice, reading, and speaking prompt
- Responsive mobile and desktop layout

## Environment variables

Create these in `.env.local` locally and in the Vercel project settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

## Supabase setup

Run `schema.sql` once in the Supabase SQL Editor.

## Development

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
```
