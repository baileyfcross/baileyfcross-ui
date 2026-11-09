import type { Metadata } from 'next';
import { SEASON_BOOT } from '@/lib/season-boot';
import './globals.css';
import Workspace from '@/components/desktop/Workspace';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.baileyfcross.info'),
  title: { default: 'Bailey Cross | Personal Workspace', template: '%s | Bailey Cross' },
  description:
    'Software, computing education, and game development. Explore Bailey Cross’s personal workspace, projects, teaching, and course directory.',
  authors: [{ name: 'Bailey Cross' }],
  openGraph: {
    title: 'Bailey Cross | Personal Workspace',
    description: 'Build things. Teach computing. Stay curious.',
    type: 'website',
  },
};
// Generated before dev/build. Inline the small bundled calculator to select the
// correct theme before paint, even when this HTML was exported months earlier.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT }} />
      </head>
      <body>
        <Workspace>{children}</Workspace>
        <noscript>
          <div className="no-script-note">
            JavaScript enables automatic seasonal appearance and window controls. All page content
            and links remain available.
          </div>
        </noscript>
      </body>
    </html>
  );
}
