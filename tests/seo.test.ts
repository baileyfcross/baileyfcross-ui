import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  pageMetadata,
  pageStructuredData,
  safeJsonLd,
  seoPages,
  absoluteUrl,
} from '../src/lib/seo';

test('every public route has its own canonical and complete social metadata', () => {
  const keys = Object.keys(seoPages) as (keyof typeof seoPages)[];
  const descriptions = new Set<string>();
  for (const key of keys) {
    const page = seoPages[key];
    const m = pageMetadata(key);
    assert.equal(m.alternates?.canonical, absoluteUrl(page.path));
    assert.equal((m.openGraph as { url: string }).url, absoluteUrl(page.path));
    assert.equal(m.description, page.description);
    assert.ok(page.description.length >= 100 && page.description.length <= 170);
    assert.equal((m.twitter as { card: string }).card, 'summary_large_image');
    assert.ok(page.title.length <= 65);
    descriptions.add(page.description);
  }
  assert.equal(descriptions.size, keys.length);
});
test('profile schema identifies the same person and does not invent ratings or job history', () => {
  const data = pageStructuredData('about');
  const graph = data['@graph'];
  const profile = graph.find((item) => item['@type'] === 'ProfilePage')!;
  assert.deepEqual(profile.mainEntity, { '@id': absoluteUrl('/#person') });
  const person = graph.find((item) => item['@type'] === 'Person')!;
  assert.equal(person.name, 'Bailey Cross');
  assert.ok(!('aggregateRating' in person));
  assert.ok(!('worksFor' in person));
  assert.ok(!('image' in person));
});
test('JSON-LD safely serializes a value containing closing-script markup', () => {
  const value = { name: '</script><script>alert(1)</script>' };
  const result = safeJsonLd(value);
  assert.equal(result.includes('<'), false);
  assert.deepEqual(JSON.parse(result), value);
});
test('project and course lists use the actual public page content', () => {
  for (const key of ['projects', 'teaching'] as const) {
    const graph = pageStructuredData(key)['@graph'];
    const list = graph.find((item) => item['@type'] === 'ItemList')!;
    assert.ok(Array.isArray(list.itemListElement));
    assert.ok(list.itemListElement.length > 0);
  }
});
