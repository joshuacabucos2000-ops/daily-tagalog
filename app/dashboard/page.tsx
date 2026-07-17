import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProgressClient from '@/components/ProgressClient';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data } = await supabase.from('progress').select('percent_complete').eq('lesson_id', 'lesson-1').maybeSingle();
  const progress = data?.percent_complete ?? 0;
  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Learner';

  async function signOut() {
    'use server';
    const client = await createClient();
    await client.auth.signOut();
    redirect('/');
  }

  return (
    <main className="shell">
      <nav className="nav"><Link className="brand" href="/dashboard">Daily Tagalog</Link><form action={signOut}><button className="button secondary">Sign out</button></form></nav>
      <div className="dash-head"><div><p className="tiny eyebrow">MAGANDANG ARAW</p><h1>Welcome, {username}!</h1><p>Keep the momentum going — one practical session today.</p></div><div className="card streak-card"><strong>🔥 1 day</strong><div className="tiny">Current streak</div></div></div>
      <div className="dashboard-grid"><ProgressClient initial={progress}/><aside className="card"><h3>This week</h3><p><strong>{progress > 0 ? 6 : 0}</strong> words learned</p><p><strong>{progress === 100 ? 1 : 0}</strong> lesson completed</p><p><strong>0</strong> conversations</p><hr/><h3>Phrase of the day</h3><p><strong>Kumusta ang araw mo?</strong></p><p className="tiny">How is your day?</p><div className="phrase-answer">Pagod na ako, pero okay lang.</div></aside></div>
    </main>
  );
}
