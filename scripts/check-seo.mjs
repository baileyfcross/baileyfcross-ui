import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const origin = 'https://www.baileyfcross.info';
const paths = ['/', '/about/', '/teaching/', '/projects/', '/hobbies/', '/courses/'];
const descriptions = new Set(),
  titles = new Set();
const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]),
  );
for (const path of paths) {
  const html = await readFile(join('out', path, 'index.html'), 'utf8');
  const head = html.split('</head>')[0];
  const meta = [...head.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]));
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0]));
  const title = decode(head.match(/<title>([^<]+)<\/title>/)?.[1] || '');
  const get = (key) => meta.find((item) => item.name === key || item.property === key)?.content;
  assert.ok(title.includes('Bailey Cross'), `${path}: meaningful title`);
  titles.add(title);
  assert.equal(
    links.filter((link) => link.rel === 'canonical').length,
    1,
    `${path}: one canonical`,
  );
  assert.equal(links.find((link) => link.rel === 'canonical').href, origin + path);
  assert.equal(get('og:url'), origin + path);
  assert.equal(get('og:title'), title);
  const description = get('description');
  assert.ok(description?.length >= 100 && description.length <= 170);
  descriptions.add(description);
  assert.equal(get('og:description'), description);
  assert.equal(get('twitter:description'), description);
  assert.equal(get('twitter:card'), 'summary_large_image');
  assert.equal(get('og:image:width'), '1200');
  assert.equal(get('og:image:height'), '630');
  assert.ok(get('og:image:alt'));
  assert.ok(get('twitter:image:alt'));
  const image = new URL(get('og:image'));
  assert.equal(image.origin, origin);
  const file = await readFile(join('out', image.pathname));
  assert.equal(file.readUInt32BE(16), 1200);
  assert.equal(file.readUInt32BE(20), 630);
  const json = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((match) => JSON.parse(match[1]));
  assert.equal(json.length, 1, `${path}: exactly one schema graph`);
  const graph = json[0]['@graph'];
  assert.ok(graph.some((node) => node['@type'] === 'Person'));
  assert.ok(graph.some((node) => node['@type'] === 'WebSite'));
  assert.ok(graph.some((node) => node.url === origin + path));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one rendered h1`);
  assert.ok(!get('robots')?.includes('noindex'), `${path}: public pages indexable`);
  assert.ok(
    !head.includes('YOUR_VERIFICATION') && !head.includes('example.com'),
    `${path}: no placeholders`,
  );
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => decode(match[1])));
  for (const node of graph) {
    for (const entry of node.itemListElement || []) {
      const url = entry.item?.url;
      if (url?.startsWith(origin) && new URL(url).hash)
        assert.ok(ids.has(new URL(url).hash.slice(1)), `${path}: structured project anchor exists`);
    }
  }
  console.log(`PASS ${path}: metadata, social image, schema, and rendered heading`);
}
assert.equal(titles.size, paths.length);
assert.equal(descriptions.size, paths.length);
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations.sort(), paths.map((path) => origin + path).sort());
assert.ok(!sitemap.includes('courses.baileyfcross.info') && !sitemap.includes('dashboard'));
const robots = await readFile('out/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(robots.includes('Allow: /'));
const notFound = await readFile('out/404.html', 'utf8');
assert.match(notFound, /<meta[^>]*name="robots"[^>]*content="noindex"/);
const manifest = JSON.parse(await readFile('out/manifest.webmanifest', 'utf8'));
for (const icon of manifest.icons) assert.ok((await stat(join('out', icon.src))).size > 0);
console.log('PASS sitemap, robots, 404 noindex, unique titles/descriptions, and manifest icons');
