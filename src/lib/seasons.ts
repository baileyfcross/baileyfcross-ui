import { Seasons } from 'astronomy-engine';

export const TIME_ZONE = 'America/New_York';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export const SEASON_THEMES = {
  spring: { name: 'Rose & Sage', label: 'Spring', icon: 'blossom' },
  summer: { name: 'Moss & Honey', label: 'Summer', icon: 'sun' },
  fall: { name: 'Terracotta & Peach', label: 'Fall', icon: 'leaf' },
  winter: { name: 'Midnight & Ice', label: 'Winter', icon: 'snow' },
} as const;
const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const cache = new Map<number, { season: Season; day: string }[]>();

/** Lexically sortable Eastern calendar day, independent of the visitor's zone. */
export function easternDay(date: Date): string {
  const parts = dateFormat.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Calculate annually, offline. No API, date table, or scheduled redeploy. */
export function seasonBoundaries(year: number) {
  if (!cache.has(year)) {
    const events = Seasons(year);
    cache.set(year, [
      { season: 'spring', day: easternDay(events.mar_equinox.date) },
      { season: 'summer', day: easternDay(events.jun_solstice.date) },
      { season: 'fall', day: easternDay(events.sep_equinox.date) },
      { season: 'winter', day: easternDay(events.dec_solstice.date) },
    ]);
  }
  return cache.get(year)!;
}

/** Switch at the start of the event's Eastern DATE, not the event's instant. */
export function seasonAt(date: Date = new Date()): Season {
  const day = easternDay(date);
  const boundaries = seasonBoundaries(Number(day.slice(0, 4)));
  let season: Season = 'winter'; // January continues the preceding December.
  for (const boundary of boundaries) if (day >= boundary.day) season = boundary.season;
  return season;
}

/** UTC instant of the next Eastern midnight; honors 23/25-hour DST days. */
export function nextEasternMidnight(date: Date = new Date()): number {
  const today = easternDay(date);
  let low = date.getTime();
  let high = low + 26 * 60 * 60 * 1000;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (easternDay(new Date(middle)) === today) low = middle;
    else high = middle;
  }
  return high;
}
