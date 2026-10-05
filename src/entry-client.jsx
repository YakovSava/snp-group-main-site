import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/manrope';
import '@fontsource-variable/noto-sans-armenian';
import './styles/main.scss';
import App from './App';

const rootElement = document.getElementById('root');

const application = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

if (rootElement.hasAttribute('data-ssr')) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
