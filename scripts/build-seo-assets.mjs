import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const cards = {
  home: {
    eyebrow: 'SOFTWARE / COMPUTING EDUCATION / GAMES',
    lines: ['Bailey Cross.'],
    subtitle: 'Build things. Teach computing. Stay curious.',
    label: 'Personal workspace',
  },
  about: {
    eyebrow: 'THE PERSON BEHIND THE PROJECTS',
    lines: ['A little about', 'Bailey Cross.'],
    subtitle: 'A journey through software, learning, and curiosity.',
    label: 'About Bailey',
  },
  teaching: {
    eyebrow: 'COMPUTING COURSES & CLASSROOM RESOURCES',
    lines: ['Ideas into', 'understanding.'],
    subtitle: 'Practical examples. Hands-on work. Connected ideas.',
    label: 'Teaching & research',
  },
  projects: {
    eyebrow: 'SOFTWARE / SIMULATION / RESEARCH',
    lines: ['Things I’ve', 'been building.'],
    subtitle: 'Explore software projects and the ideas behind them.',
    label: 'Projects & experience',
  },
  hobbies: {
    eyebrow: 'AWAY FROM THE KEYBOARD',
    lines: ['Curiosity,', 'off screen.'],
    subtitle: 'Mountains, books, games, and the interests in between.',
    label: 'Hobbies & interests',
  },
  courses: {
    eyebrow: 'COURSE DIRECTORY & CLASS RESOURCES',
    lines: ['A place for', 'every semester.'],
    subtitle: 'Find course information, semester listings, and resources.',
    label: 'Course portal',
  },
};
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
await mkdir('public/social', { recursive: true });
await mkdir('public/icons', { recursive: true });
for (const [key, card] of Object.entries(cards)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#82936b" stroke-opacity=".15"/></pattern></defs><rect width="1200" height="630" fill="#23392b"/><rect x="34" y="30" width="1132" height="570" rx="9" fill="#fff2d4" stroke="#a5b388" stroke-width="2"/><path d="M44 30H1156Q1166 30 1166 40V78H34V40Q34 30 44 30" fill="#37513b"/><rect x="35" y="79" width="1130" height="520" fill="url(#grid)"/><text x="61" y="60" font-family="monospace" font-size="17" fill="#fff2d4">bc / ${escape(card.label)}</text><path d="M1080 49h13v13h-13zM1110 49h13v13h-13z" fill="none" stroke="#f5e6bc" stroke-width="2"/><text x="86" y="139" font-family="monospace" font-size="14" letter-spacing="2" fill="#566147">${escape(card.eyebrow)}</text>${card.lines.map((line, index) => `<text x="82" y="${card.lines.length === 1 ? 310 : 252 + index * 98}" font-family="Georgia,serif" font-size="${card.lines.length === 1 ? 100 : 88}" letter-spacing="-3" fill="#23392b">${escape(line)}</text>`).join('')}<rect x="86" y="390" width="150" height="3" fill="#946914"/><text x="86" y="440" font-family="Arial,sans-serif" font-size="23" fill="#566147">${escape(card.subtitle)}</text><path d="M948 455Q1008 330 956 184M973 370Q915 368 918 316Q970 330 973 370M978 326Q1040 305 1032 258Q985 273 978 326M976 267Q929 255 934 215Q973 229 976 267" fill="none" stroke="#6c8563" stroke-width="4"/><circle cx="956" cy="184" r="11" fill="#c49547"/><circle cx="1032" cy="258" r="8" fill="#dca4a2"/><path d="M85 501H1115" stroke="#c5b98c"/><text x="86" y="550" font-family="monospace" font-size="19" fill="#344e38">baileyfcross.info</text><rect x="948" y="530" width="27" height="27" fill="#bf7e89"/><rect x="987" y="530" width="27" height="27" fill="#759559"/><rect x="1026" y="530" width="27" height="27" fill="#b65b38"/><rect x="1065" y="530" width="27" height="27" fill="#6197ba"/></svg>`;
  await writeFile(`public/social/${key}.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`public/social/${key}.png`);
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="80" fill="#263c27"/><rect x="44" y="44" width="424" height="424" rx="32" fill="none" stroke="#cfa651" stroke-width="8"/><g fill="#fff2d4"><path d="M106 128h32v96h64v32h32v96h-32v32h-96V128zm32 128v96h48v-96z"/><path d="M298 224h96v32h-80v96h80v32h-96v-32h-32v-96h32z"/></g></svg>`;
await writeFile('public/icons/icon.svg', icon);
for (const [size, name] of [
  [180, 'apple-touch-icon'],
  [192, 'icon-192'],
  [512, 'icon-512'],
])
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(`public/icons/${name}.png`);
// PNG-backed multi-size ICO (Vista+), replacing the starter framework favicon.
const images = await Promise.all(
  [16, 32, 48].map((size) => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const entry = 6 + 16 * index;
  header[entry] = [16, 32, 48][index];
  header[entry + 1] = [16, 32, 48][index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...images]));
console.log('Generated six 1200×630 sharing cards, SVG sources, and site icons.');
