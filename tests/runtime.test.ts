import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync('public/desktop/season-runtime.js', 'utf8');
test('pre-paint runtime applies theme offline and reschedules midnight on focus/visibility', () => {
  let now = Date.parse('2026-09-22T03:59:59Z');
  class Clock extends Date {
    constructor(value?: string | number) {
      super(value ?? now);
    }
    static now() {
      return now;
    }
  }
  const listeners: Record<string, () => void> = {};
  const data: Record<string, string> = {};
  let delay = 0;
  let callback: () => void = () => {};
  const changes: string[] = [];
  const context = {
    Date: Clock,
    Intl,
    Math,
    Map,
    Set,
    console,
    Event: class {
      constructor(public type: string) {}
    },
    document: {
      documentElement: { dataset: data },
      hidden: false,
      addEventListener: (name: string, fn: () => void) => {
        listeners[name] = fn;
      },
    },
    window: {
      dispatchEvent: () => changes.push(data.season),
      addEventListener: (name: string, fn: () => void) => {
        listeners[name] = fn;
      },
    },
    setTimeout: (fn: () => void, ms: number) => {
      callback = fn;
      delay = ms;
      return 1;
    },
    clearTimeout: () => {},
  };
  vm.runInNewContext(source, context);
  assert.equal(data.season, 'summer');
  assert.equal(delay, 1050);
  now = Date.parse('2026-09-22T04:00:00.050Z');
  callback();
  assert.equal(data.season, 'fall');
  now = Date.parse('2026-12-22T12:00:00Z');
  listeners.visibilitychange();
  assert.equal(data.season, 'winter');
  now = Date.parse('2027-06-22T12:00:00Z');
  listeners.focus();
  assert.equal(data.season, 'summer');
  now = Date.parse('2028-03-20T12:00:00Z');
  listeners.pageshow();
  assert.equal(data.season, 'spring');
  assert.deepEqual(changes, ['summer', 'fall', 'winter', 'summer', 'spring']);
});
