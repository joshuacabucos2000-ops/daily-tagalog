import Link from 'next/link';

const menuItems = [
  { href: '/dashboard', icon: '⌂', label: 'Dashboard' },
  { href: '/dashboard#lessons', icon: '▤', label: 'Lessons' },
  { href: '/practice', icon: '◎', label: 'Daily practice' },
  { href: '/vocabulary', icon: 'A', label: 'Vocabulary bank' },
  { href: '/translator', icon: '⇄', label: 'English ↔ Filipino' },
];

export default function AppMenu() {
  return (
    <details className="app-menu">
      <summary aria-label="Open navigation menu">
        <span /><span /><span />
      </summary>
      <nav className="menu-panel" aria-label="Main navigation">
        <p className="tiny eyebrow">LEARN</p>
        {menuItems.map(item => (
          <Link href={item.href} key={item.href}>
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
