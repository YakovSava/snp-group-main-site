import FormStatus from '../components/common/FormStatus';
import LocalizedLink from '../components/common/LocalizedLink';
import Seo from '../components/common/Seo';
import TextField from '../components/common/TextField';
import useFormValues from '../hooks/useFormValues';
import useSubmit from '../hooks/useSubmit';
import { useI18n } from '../i18n/I18nContext';

const INITIAL_VALUES = {
  customerType: 'individual',
  name: '',
  phone: '',
  email: '',
  company: '',
  tin: '',
};

function RegisterPage() {
  const { t, lang } = useI18n();
  const { values, handleChange } = useFormValues(INITIAL_VALUES);
  const { status, submit } = useSubmit('/auth/register');
  const isLegal = values.customerType === 'legal';

  const handleSubmit = (event) => {
    event.preventDefault();
    submit({ ...values, lang });
  };

  return (
    <>
      <Seo title={t('meta.register.title')} description={t('meta.register.description')} path="/register" noindex />
      <div className="container-page py-12">
        <div className="card mx-auto max-w-sm overflow-hidden">
          <h1 className="px-6 py-5 text-center text-xl font-semibold">{t('auth.register.title')}</h1>
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-ink-100 px-6 py-6">
            <div className="segmented w-full justify-center" role="radiogroup" aria-label={t('auth.register.title')}>
              {['individual', 'legal'].map((type) => (
                <label key={type} className="segmented__option flex-1 text-center">
                  <input
                    type="radio"
                    name="customerType"
                    value={type}
                    checked={values.customerType === type}
                    onChange={handleChange}
                  />
                  {t(`auth.register.${type}`)}
                </label>
              ))}
            </div>
            {isLegal ? (
              <>
                <TextField label={t('auth.register.company')} name="company" value={values.company} onChange={handleChange} autoComplete="organization" required />
                <TextField label={t('auth.register.tin')} name="tin" value={values.tin} onChange={handleChange} inputMode="numeric" required />
              </>
            ) : null}
            <TextField label={t('auth.register.name')} name="name" value={values.name} onChange={handleChange} autoComplete="name" required />
            <TextField label={t('auth.register.phone')} name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" inputMode="tel" required />
            <TextField label={t('auth.register.email')} name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" required />
            <button type="submit" disabled={status === 'sending'} className="btn btn--primary btn--block">
              {status === 'sending' ? t('common.sending') : t('auth.register.submit')}
            </button>
            <FormStatus status={status} successText={t('auth.register.success')} />
          </form>
          <p className="border-t border-ink-100 px-6 py-4 text-center text-xs">
            {t('auth.register.hasAccount')}
            {' '}
            <LocalizedLink to="/login" className="font-semibold text-ink-900 underline decoration-brand decoration-2 underline-offset-4">
              {t('auth.register.login')}
            </LocalizedLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
