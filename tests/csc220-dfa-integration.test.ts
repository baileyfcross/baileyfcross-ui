import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { navigation } from '../src/data/site';

test('both DeutschLab and CSC-220 DFA desktop shortcuts are present', () => {
  assert.deepEqual(navigation.find((n) => n.name === 'DeutschLab'), {
    name: 'DeutschLab', href: 'https://deutsch.baileyfcross.info/', icon: 'deutschlab',
  });
  assert.deepEqual(navigation.find((n) => n.name === 'CSC-220 DFA'), {
    name: 'CSC-220 DFA', href: '/dfa-simulator/', icon: 'fsm',
  });
});

test('DFA route embeds the unchanged standalone simulator', () => {
  const page = readFileSync('src/app/dfa-simulator/page.tsx', 'utf8');
  const html = readFileSync('public/simulations/even-ones-dfa.html', 'utf8');
  assert.match(page, /src=\{simulatorUrl\}/);
  assert.match(page, /<iframe/);
  assert.match(html, /even number of 1s/i);
  assert.match(html, /id="step"/);
  assert.match(html, /id="play"/);
  assert.match(html, /id="reset"/);
  assert.match(html, /Even \(start, accepting\)/);
});
