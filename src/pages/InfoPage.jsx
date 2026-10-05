import PropTypes from 'prop-types';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Icon from '../components/common/Icon';
import LocalizedLink from '../components/common/LocalizedLink';
import Seo from '../components/common/Seo';
import RequestForm from '../components/home/RequestForm';
import { COMPANY, phoneHref } from '../config/site';
import { useI18n } from '../i18n/I18nContext';
import { breadcrumbLd, faqLd } from '../utils/jsonLd';

function ContactDetails() {
  const { t } = useI18n();
  const rows = [
    { icon: 'pin', label: t('pages.contacts.address'), value: t('pages.contacts.addressValue') },
    {
      icon: 'phone',
      label: t('pages.contacts.phone'),
      value: <a href={phoneHref(COMPANY.phone)}>{COMPANY.phone}</a>,
    },
    {
      icon: 'mail',
      label: t('pages.contacts.email'),
      value: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>,
    },
    { icon: 'clock', label: t('pages.contacts.hours'), value: t('pages.contacts.hoursValue') },
  ];
  return (
    <dl className="card space-y-5 p-6">
      {rows.map((row) => (
        <div key={row.icon} className="flex items-start gap-4">
          <span className="icon-button shrink-0 !rounded-full">
            <Icon name={row.icon} size={16} />
          </span>
          <div>
            <dt className="text-xs text-ink-500">{row.label}</dt>
            <dd className="font-semibold [&_a:hover]:underline">{row.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function InfoPage({ pageKey }) {
  const { t, lang } = useI18n();
  const prefix = `pages.${pageKey}`;
  const title = t(`${prefix}.h1`);
  const sections = t(`${prefix}.sections`);
  const faqItems = pageKey === 'faq' ? t(`${prefix}.items`) : [];
  const crumbs = [
    { name: t('common.home'), path: '/' },
    { name: title, path: `/${pageKey}` },
  ];
  const jsonLd = [breadcrumbLd(crumbs, lang)];
  if (faqItems.length) {
    jsonLd.push(faqLd(faqItems));
  }

  return (
    <>
      <Seo
        title={t(`${prefix}.title`)}
        description={t(`${prefix}.description`)}
        path={`/${pageKey}`}
        jsonLd={jsonLd}
      />
      <div className="container-page py-8 md:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-ink-700">{t(`${prefix}.intro`)}</p>

        {pageKey === 'contacts' ? (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
            <ContactDetails />
            <RequestForm headingLevel="h2" />
          </div>
        ) : null}

        {Array.isArray(sections) && sections.length ? (
          <div className="prose-page mt-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.h}</h2>
                {section.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        ) : null}

        {faqItems.length ? (
          <dl className="mt-8 max-w-3xl">
            {faqItems.map((item) => (
              <div key={item.id} id={item.id} className="faq-item">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {pageKey === 'payment' || pageKey === 'delivery' ? (
          <LocalizedLink to="/catalog" className="btn btn--primary mt-8">
            {t('cart.toCatalog')}
          </LocalizedLink>
        ) : null}
      </div>
    </>
  );
}

InfoPage.propTypes = {
  pageKey: PropTypes.string.isRequired,
};

export default InfoPage;
