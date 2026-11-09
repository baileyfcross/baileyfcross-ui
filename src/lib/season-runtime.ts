import { nextEasternMidnight, seasonAt } from './seasons';

// A single, blocking pre-paint script shared by the portfolio and course portal.
// Runs outside React so static HTML never freezes a season at build time.
let timer: ReturnType<typeof setTimeout>;
function syncSeason() {
  const now = new Date();
  const season = seasonAt(now);
  const root = document.documentElement;
  if (root.dataset.season !== season) {
    root.dataset.season = season;
    window.dispatchEvent(new Event('seasonchange'));
  }
  clearTimeout(timer);
  timer = setTimeout(syncSeason, nextEasternMidnight(now) - now.getTime() + 50);
}
syncSeason();
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) syncSeason();
});
window.addEventListener('focus', syncSeason);
window.addEventListener('pageshow', syncSeason);
