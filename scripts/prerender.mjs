import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const serverEntry = pathToFileURL(path.join(rootDir, 'dist-server', 'entry-server.js')).href;

const escapeXml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function buildDocument(template, { html, helmet }) {
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n    ');
  return template
    .replace('<html lang="en">', `<html ${helmet.htmlAttributes.toString()}>`)
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-ssr>${html}</div>`);
}

function buildSitemap(entries) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = entries.map((entry) => {
    const alternates = entry.alternates
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.url)}"/>`)
      .join('\n');
    return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

function buildRobots(siteUrl, privatePaths) {
  return [
    'User-agent: *',
    'Allow: /',
    ...privatePaths.map((privatePath) => `Disallow: ${privatePath}`),
    'Disallow: /*?q=',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');
}

async function writePage(relativePath, content) {
  const target = path.join(distDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
}

async function main() {
  const {
    render, renderNotFound, getPrerenderUrls, getPrivatePaths, getSitemapEntries, SITE_URL,
  } = await import(serverEntry);
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

  const urls = getPrerenderUrls();
  await Promise.all(urls.map((url) => {
    const filePath = url === '/' ? 'index.html' : path.join(url, 'index.html');
    return writePage(filePath, buildDocument(template, render(url)));
  }));

  await writePage('404.html', buildDocument(template, renderNotFound()));
  await writePage('sitemap.xml', buildSitemap(getSitemapEntries()));
  await writePage('robots.txt', buildRobots(SITE_URL, getPrivatePaths()));

  process.stdout.write(`Prerendered ${urls.length + 1} pages for ${SITE_URL}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
