'use client';
import { useSyncExternalStore } from 'react';
import { SEASON_THEMES, type Season } from '@/lib/seasons';
import PixelIcon from './PixelIcon';
const subscribe = (fn: () => void) => {
  window.addEventListener('seasonchange', fn);
  return () => window.removeEventListener('seasonchange', fn);
};
const snapshot = () => document.documentElement.dataset.season as Season | undefined;
const serverSnapshot = () => undefined;
export default function SeasonStatus() {
  const season = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const theme = season && SEASON_THEMES[season];
  return (
    <details className="season-status">
      <summary>
        <PixelIcon name={theme?.icon || 'leaf'} size={17} />
        <span>
          {theme ? theme.name : 'Seasonal theme'} <small>· Auto</small>
        </span>
      </summary>
      <div className="season-popover">
        <b>One desktop. Four seasons.</b>
        <p>
          Appearance follows the first calendar day of each season in America/New_York, starting at
          midnight Eastern Time.
        </p>
        <ul>
          {Object.entries(SEASON_THEMES).map(([id, item]) => (
            <li key={id}>
              <PixelIcon name={item.icon} size={16} />
              <span>{item.label}</span>
              <strong>{item.name}</strong>
              {id === season && <span aria-label="Current theme">✓</span>}
            </li>
          ))}
        </ul>
        <small>
          Equinoxes and solstices are calculated each year. Your theme changes automatically.
        </small>
      </div>
    </details>
  );
}
