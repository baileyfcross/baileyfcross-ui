import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seasonAt, easternDay, seasonBoundaries, nextEasternMidnight } from '../src/lib/seasons';

test('2026 boundaries are Eastern calendar dates, including fall on a different UTC date', () => {
  assert.deepEqual(seasonBoundaries(2026), [
    { season: 'spring', day: '2026-03-20' },
    { season: 'summer', day: '2026-06-21' },
    { season: 'fall', day: '2026-09-22' },
    { season: 'winter', day: '2026-12-21' },
  ]);
});
test('switches exactly at Eastern midnight, hours before the equinox or solstice', () => {
  const transitions = [
    ['2026-03-20T04:00:00Z', 'winter', 'spring'],
    ['2026-06-21T04:00:00Z', 'spring', 'summer'],
    ['2026-09-22T04:00:00Z', 'summer', 'fall'],
    ['2026-12-21T05:00:00Z', 'fall', 'winter'],
  ] as const;
  for (const [instant, before, after] of transitions) {
    const t = Date.parse(instant);
    assert.equal(seasonAt(new Date(t - 1)), before);
    assert.equal(seasonAt(new Date(t)), after);
  }
});
test('January and leap days continue winter; dates change in later years', () => {
  assert.equal(seasonAt(new Date('2027-01-01T04:59:59Z')), 'winter');
  assert.equal(seasonAt(new Date('2028-02-29T12:00:00Z')), 'winter');
  assert.equal(seasonBoundaries(2028)[0].day, '2028-03-19');
  assert.equal(seasonBoundaries(2028)[1].day, '2028-06-20');
  assert.equal(seasonBoundaries(2027)[2].day, '2027-09-23');
  assert.equal(seasonBoundaries(2027)[3].day, '2027-12-21');
});
test('Eastern date does not follow UTC or the visitor time zone', () => {
  assert.equal(easternDay(new Date('2026-09-23T00:05:00Z')), '2026-09-22');
  assert.equal(seasonAt(new Date('2026-06-21T02:00:00Z')), 'spring');
});
test('next-midnight timer handles both DST transitions and year rollover', () => {
  for (const [start, end] of [
    ['2026-03-08T05:00:00Z', '2026-03-09T04:00:00Z'],
    ['2026-11-01T04:00:00Z', '2026-11-02T05:00:00Z'],
    ['2026-12-31T18:00:00Z', '2027-01-01T05:00:00Z'],
  ])
    assert.equal(nextEasternMidnight(new Date(start)), Date.parse(end));
});
