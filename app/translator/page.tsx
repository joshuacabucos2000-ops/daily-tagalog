import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppMenu from '@/components/AppMenu';
import TranslatorClient from './TranslatorClient';
import { createClient } from '@/lib/supabase/server';

export default async function TranslatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <main className="shell translator-shell">
      <nav className="nav">
        <div className="nav-start"><AppMenu /><Link className="brand" href="/dashboard">Daily Tagalog</Link></div>
        <Link className="button secondary" href="/dashboard">Back to dashboard</Link>
      </nav>
      <header className="library-heading">
        <p className="tiny eyebrow">COURSE TRANSLATOR</p>
        <h1>English ↔ Filipino</h1>
        <p>Translate vocabulary and complete example sentences from your Daily Tagalog course.</p>
      </header>
      <TranslatorClient />
    </main>
  );
}
