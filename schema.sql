create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  percent_complete integer not null default 0 check (percent_complete between 0 and 100),
  current_stage integer not null default 0 check (current_stage between 0 and 4),
  quiz_score integer check (quiz_score between 0 and 3),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.progress add column if not exists current_stage integer not null default 0 check (current_stage between 0 and 4);
alter table public.progress add column if not exists quiz_score integer check (quiz_score between 0 and 3);
alter table public.progress add column if not exists completed_at timestamptz;
alter table public.progress enable row level security;
drop policy if exists "Users read own progress" on public.progress;
drop policy if exists "Users insert own progress" on public.progress;
drop policy if exists "Users update own progress" on public.progress;
create policy "Users read own progress" on public.progress for select using (auth.uid() = user_id);
create policy "Users insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.vocabulary_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  vocabulary_id text not null,
  interval_days integer not null default 0 check (interval_days >= 0),
  ease_factor double precision not null default 2.5 check (ease_factor between 1.3 and 3),
  review_count integer not null default 0 check (review_count >= 0),
  lapse_count integer not null default 0 check (lapse_count >= 0),
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  primary key (user_id, vocabulary_id)
);
create index if not exists vocabulary_reviews_due_idx on public.vocabulary_reviews (user_id, due_at);
alter table public.vocabulary_reviews enable row level security;
drop policy if exists "Users read own vocabulary reviews" on public.vocabulary_reviews;
drop policy if exists "Users insert own vocabulary reviews" on public.vocabulary_reviews;
drop policy if exists "Users update own vocabulary reviews" on public.vocabulary_reviews;
create policy "Users read own vocabulary reviews" on public.vocabulary_reviews for select using (auth.uid() = user_id);
create policy "Users insert own vocabulary reviews" on public.vocabulary_reviews for insert with check (auth.uid() = user_id);
create policy "Users update own vocabulary reviews" on public.vocabulary_reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  vocabulary_reviews integer not null default 0 check (vocabulary_reviews >= 0),
  listening_correct integer not null default 0 check (listening_correct >= 0),
  listening_total integer not null default 0 check (listening_total >= 0),
  reading_correct integer not null default 0 check (reading_correct >= 0),
  reading_total integer not null default 0 check (reading_total >= 0),
  completed_at timestamptz not null default now(),
  primary key (user_id, activity_date)
);
alter table public.daily_activity enable row level security;
drop policy if exists "Users read own daily activity" on public.daily_activity;
drop policy if exists "Users insert own daily activity" on public.daily_activity;
drop policy if exists "Users update own daily activity" on public.daily_activity;
create policy "Users read own daily activity" on public.daily_activity for select using (auth.uid() = user_id);
create policy "Users insert own daily activity" on public.daily_activity for insert with check (auth.uid() = user_id);
create policy "Users update own daily activity" on public.daily_activity for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
