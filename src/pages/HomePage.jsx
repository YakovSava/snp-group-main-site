import Seo from '../components/common/Seo';
import Audience from '../components/home/Audience';
import CategoryBanners from '../components/home/CategoryBanners';
import Hero from '../components/home/Hero';
import News from '../components/home/News';
import Perks from '../components/home/Perks';
import PromoSlider from '../components/home/PromoSlider';
import RequestForm from '../components/home/RequestForm';
import SpecialOffers from '../components/home/SpecialOffers';
import Stats from '../components/home/Stats';
import { useI18n } from '../i18n/I18nContext';
import { organizationLd, websiteLd } from '../utils/jsonLd';

function HomePage() {
  const { t, lang } = useI18n();
  return (
    <>
      <Seo
        title={t('meta.home.title')}
        description={t('meta.home.description')}
        path="/"
        jsonLd={[organizationLd(lang), websiteLd(lang)]}
      />
      <Hero />
      <div className="container-page space-y-8 py-8 md:space-y-10 md:py-10">
        <Perks />
        <PromoSlider />
        <Stats />
        <Audience />
        <CategoryBanners />
        <SpecialOffers />
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <RequestForm />
          <News />
        </div>
      </div>
    </>
  );
}

export default HomePage;
