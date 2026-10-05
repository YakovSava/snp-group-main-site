import { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import { INFO_PAGES } from './config/routes';
import { CartProvider } from './context/CartContext';
import { I18nProvider } from './i18n/I18nContext';
import { parsePath } from './i18n/paths';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const location = useLocation();
  const { lang, path } = parsePath(location.pathname);
  const routedLocation = useMemo(() => ({ ...location, pathname: path }), [location, path]);

  return (
    <I18nProvider lang={lang} path={path}>
      <CartProvider>
        <ScrollToTop />
        <Layout>
          <Routes location={routedLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:category" element={<CatalogPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {INFO_PAGES.map((page) => (
              <Route key={page} path={`/${page}`} element={<InfoPage pageKey={page} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </I18nProvider>
  );
}

export default App;
