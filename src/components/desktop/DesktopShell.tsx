'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, site } from '@/data/site';
import DesktopWindow from './DesktopWindow';
import PixelIcon from './PixelIcon';
import SeasonStatus from './SeasonStatus';
import Navigation from '../Navigation';

function Clock() {
  const [time, setTime] = useState('Eastern Time');
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="desktop-clock" aria-label="Current Eastern time">
      {time}
      <small>ET</small>
    </time>
  );
}
export default function DesktopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Key by route in the layout, so each page starts with its window restored.
  const [minimized, setMinimized] = useState(false),
    [maximized, setMaximized] = useState(false),
    [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const current = navigation.find(
    (item) => item.href.replace(/\/$/, '') === pathname.replace(/\/$/, ''),
  );
  const title = current?.name || 'Workspace';
  const home = pathname === '/';
  function minimize() {
    setMinimized(true);
    restoreRef.current?.focus();
  }
  function restore() {
    setMinimized(false);
    requestAnimationFrame(() => contentRef.current?.focus());
  }
  useEffect(() => {
    function dismiss(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    }
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenu(false);
    }
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', key);
    };
  }, []);
  return (
    <div className={`desktop ${home ? 'desktop-home' : 'desktop-page'}`}>
      <div className="desktop-wallpaper" aria-hidden="true" />
      <div className="wallpaper-shade" aria-hidden="true" />
      <a href="#main-content" className="skip-link" onClick={restore}>
        Skip to content
      </a>
      <header className="desktop-topbar">
        <Link href="/" className="desktop-brand">
          <PixelIcon name="computer" size={17} /> Bailey Cross <span>/ personal workspace</span>
        </Link>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>
      <nav className="desktop-shortcuts" aria-label="Desktop shortcuts">
        {navigation
          .filter((n) => n.name !== 'Home')
          .map((item) => (
            <Link
              className="desktop-shortcut"
              href={item.href}
              key={item.name}
              aria-label={item.href.startsWith('https') ? `${item.name} website` : item.name}
            >
              <PixelIcon name={item.icon} size={37} />
              <span>{item.name}</span>
            </Link>
          ))}
      </nav>
      <div className={`workspace ${maximized ? 'workspace-maximized' : ''}`}>
        {!minimized && (
          <DesktopWindow
            title={`Bailey Cross / ${title}`}
            icon={current?.icon || 'computer'}
            className="main-window"
            draggable={home}
            onMinimize={minimize}
            onMaximize={() => setMaximized((v) => !v)}
            maximized={maximized}
            closeHref={!home ? '/' : undefined}
          >
            <Navigation />
            <main id="main-content" ref={contentRef} tabIndex={-1} className="page-content">
              {children}
            </main>
            <div className="window-status">
              <span>
                {home
                  ? 'A personal space for ideas, code, and curiosity.'
                  : `${title} / Bailey Cross`}
              </span>
              <span>✦</span>
            </div>
          </DesktopWindow>
        )}
        {minimized && (
          <div className="minimized-note">
            <p>Your {title.toLowerCase()} window is minimized.</p>
            <button onClick={restore}>Restore window ↗</button>
          </div>
        )}
        {home && !maximized && (
          <aside className="desktop-widgets" aria-label="Explore the workspace">
            <DesktopWindow title="Teaching" icon="book" className="teaching-widget" draggable>
              <div className="widget-inner">
                <span className="eyebrow">INSIDE THE CLASSROOM</span>
                <h2>
                  Ideas into
                  <br />
                  understanding.
                </h2>
                <p>Practical examples, hands-on work, and connections between ideas.</p>
                <a className="window-link" href={site.courses}>
                  Open course directory <span>↗</span>
                </a>
                <Link href="/teaching/" className="subtle-link">
                  Teaching & research →
                </Link>
              </div>
            </DesktopWindow>
            <DesktopWindow title="Projects" icon="folder" className="projects-widget" draggable>
              <div className="folder-grid">
                <Link href="/projects/">
                  <PixelIcon name="computer" size={38} />
                  <span>Software</span>
                </Link>
                <a href={site.studio}>
                  <PixelIcon name="game" size={38} />
                  <span>Game Studio</span>
                </a>
                <Link href="/hobbies/">
                  <PixelIcon name="mountain" size={38} />
                  <span>Off screen</span>
                </Link>
              </div>
            </DesktopWindow>
            <div className="desktop-sticky">
              <span>NOTE TO SELF</span>
              <p>
                Keep learning.
                <br />
                Keep making.
              </p>
              <span className="sticky-spark">✧</span>
            </div>
          </aside>
        )}
      </div>
      <footer className="taskbar">
        <div className="start-container" ref={menuRef}>
          <button
            className={`start-button ${menu ? 'active' : ''}`}
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="start-navigation"
          >
            <PixelIcon name="computer" size={24} />
            <span>Start</span>
          </button>
          {menu && (
            <nav id="start-navigation" className="start-menu" aria-label="Start navigation">
              <div className="start-heading">
                Bailey Cross<small>Pick a window to explore.</small>
              </div>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMenu(false)}>
                  <PixelIcon name={item.icon} size={22} />
                  {item.name}
                  <span>↗</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
        <button
          ref={restoreRef}
          className={`taskbar-window ${!minimized ? 'active' : ''}`}
          onClick={restore}
          title="Restore active window"
        >
          <PixelIcon name={current?.icon} size={18} />
          <span>{title}</span>
        </button>
        <a href={site.courses} className="taskbar-course">
          <PixelIcon name="book" size={18} />
          <span>Courses ↗</span>
        </a>
        <div className="taskbar-right">
          <SeasonStatus />
          <Clock />
        </div>
      </footer>
    </div>
  );
}
