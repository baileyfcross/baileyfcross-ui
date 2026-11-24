import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, navigation } from '../src/data/site';
import { projects } from '../src/data/projects';

test('DeutschLab appears in desktop and Start navigation', () => {
  assert.equal(site.deutschlab, 'https://deutsch.baileyfcross.info/');
  assert.deepEqual(navigation.find((item) => item.name === 'DeutschLab'), {
    name: 'DeutschLab', href: site.deutschlab, icon: 'deutschlab',
  });
});

test('DeutschLab has a teaching link and a project card', () => {
  assert.equal(projects.find((project) => project.title === 'DeutschLab')?.website, site.deutschlab);
  assert.match(readFileSync('src/app/teaching/page.tsx', 'utf8'), /Open DeutschLab/);
  assert.match(readFileSync('src/components/desktop/DesktopShell.tsx', 'utf8'), /<span>DeutschLab<\/span>/);
});

test('The DeutschLab icon matches the dark-green D favicon', () => {
  const icons = readFileSync('src/components/desktop/PixelIcon.tsx', 'utf8');
  assert.match(icons, /deutschlab: \(/);
  assert.match(icons, /fill="#102b2a"/);
  assert.match(icons, /fill="#c4e6ce"/);
});
