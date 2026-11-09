'use client';
import { useRef, useState, type ReactNode, type CSSProperties } from 'react';
import Link from 'next/link';
import PixelIcon from './PixelIcon';

type Props = {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  closeHref?: string;
  onMinimize?: () => void;
  maximized?: boolean;
  onMaximize?: () => void;
};
export default function DesktopWindow({
  title,
  icon = 'folder',
  children,
  className = '',
  draggable = false,
  closeHref,
  onMinimize,
  maximized = false,
  onMaximize,
}: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const style = (
    !maximized ? { '--window-x': `${offset.x}px`, '--window-y': `${offset.y}px` } : {}
  ) as CSSProperties;
  return (
    <section
      className={`desktop-window ${className} ${maximized ? 'is-maximized' : ''}`}
      style={style}
      aria-label={title}
    >
      <div
        className={`window-titlebar ${draggable ? 'can-drag' : ''}`}
        onPointerDown={(e) => {
          if (
            !draggable ||
            maximized ||
            e.pointerType === 'touch' ||
            e.button !== 0 ||
            (e.target as HTMLElement).closest('button,a')
          )
            return;
          drag.current = { x: e.clientX, y: e.clientY, startX: offset.x, startY: offset.y };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          setOffset({
            x: Math.max(-80, Math.min(80, d.startX + e.clientX - d.x)),
            y: Math.max(-35, Math.min(100, d.startY + e.clientY - d.y)),
          });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onDoubleClick={() => {
          if (draggable) setOffset({ x: 0, y: 0 });
        }}
      >
        <div className="window-title">
          <PixelIcon name={icon} size={18} />
          <span>{title}</span>
        </div>
        {(onMinimize || onMaximize || closeHref) && (
          <div className="window-controls">
            {onMinimize && (
              <button aria-label={`Minimize ${title}`} onClick={onMinimize}>
                _
              </button>
            )}
            {onMaximize && (
              <button
                aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title}`}
                onClick={onMaximize}
              >
                {maximized ? '▣' : '□'}
              </button>
            )}
            {closeHref && (
              <Link aria-label={`Close ${title} and return home`} href={closeHref}>
                ×
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="window-content">{children}</div>
    </section>
  );
}
