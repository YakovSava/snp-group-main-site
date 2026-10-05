import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  return { html, helmet: helmetContext.helmet };
}

export function renderNotFound() {
  return render('/__not-found__');
}

export { getPrerenderUrls, getPrivatePaths, getSitemapEntries } from './config/routes';
export { SITE_URL } from './config/site';
