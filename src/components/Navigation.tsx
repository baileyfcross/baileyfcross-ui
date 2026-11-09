'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/site';
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="window-menu" aria-label="Main navigation">
      {navigation.slice(0, 6).map((item) => {
        const active = pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '');
        return (
          <Link
            href={item.href}
            key={item.name}
            aria-current={active ? 'page' : undefined}
            className={active ? 'active' : ''}
          >
            {item.name}
            {item.href.startsWith('https') && <span aria-hidden="true"> ↗</span>}
          </Link>
        );
      })}
    </nav>
  );
}
