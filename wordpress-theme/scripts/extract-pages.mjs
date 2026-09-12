import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.resolve('src/pages');
const outDir = path.resolve('wordpress-theme/gladhat/template-parts/static');

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));

function extractTemplate(source) {
  const markers = ['const html = `', 'return `'];
  let start = -1;
  let offset = 0;
  for (const marker of markers) {
    const idx = source.indexOf(marker);
    if (idx !== -1) {
      start = idx;
      offset = marker.length;
      break;
    }
  }
  if (start === -1) throw new Error('No return template');
  let i = start + offset;
  let out = '';
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\\' && source[i + 1] === '`') {
      out += '`';
      i += 2;
      continue;
    }
    if (ch === '`') break;
    out += ch;
    i += 1;
  }
  return out;
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const source = fs.readFileSync(path.join(srcDir, file), 'utf8');
  if (source.includes('${')) {
    console.log('SKIP (interpolated):', file);
    continue;
  }
  const html = extractTemplate(source);
  const name = file.replace(/\.js$/, '').toLowerCase();
  fs.writeFileSync(path.join(outDir, `${name}.html`), html.trim() + '\n');
  console.log('WROTE', name);
}
