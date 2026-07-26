# Daily Tagalog

A cloud-backed conversational Tagalog learning app built with Next.js and Supabase.

## Included

- Email/password accounts through Supabase Auth
- Protected dashboard
- Cloud-synced lesson progress
- Interactive lessons with vocabulary, grammar, translation practice, reading, and speaking prompts
- Daily spaced-repetition vocabulary reviews
- Listening practice using the Filipino voice available on the learner's device
- Short reading comprehension sessions with saved daily results
- A 30-lesson first-month beginner course covering daily life, practical conversations, listening, and reading
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
- `components/lesson/` contains the reusable lesson experience.
- `lib/content/lessons.ts` contains the core typed lesson definitions.
- `lib/content/month-one.ts` contains Lessons 4–30 and their vocabulary.
- `lib/supabase/` contains the browser, server, and configuration helpers.
- `schema.sql` contains the database setup and row-level security policies.

## Adding a lesson

Add another typed lesson definition to `lib/content/lessons.ts`. The dynamic
`/lesson/[lessonId]` route automatically supplies the shared vocabulary,
grammar, exercise, reading, audio, progress, and completion experience.

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
