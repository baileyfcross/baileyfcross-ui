'use client';
import { usePathname } from 'next/navigation';
import DesktopShell from './DesktopShell';
export default function Workspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <DesktopShell key={pathname}>{children}</DesktopShell>;
}
