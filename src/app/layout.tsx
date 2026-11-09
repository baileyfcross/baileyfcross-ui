import type { Metadata } from 'next';
import { SITE_ORIGIN, seoPages } from '@/lib/seo';
import { SEASON_BOOT } from '@/lib/season-boot';
import './globals.css';
import Workspace from '@/components/desktop/Workspace';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: 'Bailey Cross',
  title: {
    default: 'Bailey Cross | Software Developer & Computing Educator',
    template: '%s | Bailey Cross',
  },
  description: seoPages.home.description,
  authors: [{ name: 'Bailey Cross', url: SITE_ORIGIN }],
  creator: 'Bailey Cross',
  publisher: 'Bailey Cross',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#263c27' };
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
