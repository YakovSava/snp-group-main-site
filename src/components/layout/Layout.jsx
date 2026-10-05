import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nContext';
import Footer from './Footer';
import Header from './Header';
import TopBar from './TopBar';

function Layout({ children }) {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">{t('common.skipToContent')}</a>
      <TopBar />
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
