# Daily Tagalog

A cloud-backed conversational Tagalog learning app built with Next.js and Supabase.

## Included

- Email/password accounts through Supabase Auth
- Protected dashboard
- Cloud-synced lesson progress
- Interactive Lesson 1: vocabulary, grammar, translation practice, reading, and speaking prompt
- Daily spaced-repetition vocabulary reviews
- Listening practice using the Filipino voice available on the learner's device
- Short reading comprehension sessions with saved daily results
- Responsive mobile and desktop layout

## Environment variables

Copy the included example file, then replace the placeholders with credentials
from the Supabase project:

```bash
cp .env.example .env.local
```

The application reports a clear configuration error if either required value is
missing.

## Supabase setup

Run `schema.sql` in the Supabase SQL Editor. It is safe to run again when the
schema changes; existing progress is preserved.

## Project structure

- `app/` contains the pages and route handlers used by Next.js.
- `components/` contains shared interface components.
- `lib/supabase/` contains the browser, server, and configuration helpers.
- `schema.sql` contains the database setup and row-level security policies.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```
