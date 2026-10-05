import { useState } from 'react';
import FormStatus from '../components/common/FormStatus';
import LocalizedLink from '../components/common/LocalizedLink';
import Seo from '../components/common/Seo';
import TextField from '../components/common/TextField';
import useFormValues from '../hooks/useFormValues';
import useSubmit from '../hooks/useSubmit';
import { useI18n } from '../i18n/I18nContext';

const INITIAL_VALUES = { email: '', password: '', remember: false };

function LoginPage() {
  const { t } = useI18n();
  const { values, handleChange } = useFormValues(INITIAL_VALUES);
  const { status, submit } = useSubmit('/auth/login');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(values);
  };

  return (
    <>
      <Seo title={t('meta.login.title')} description={t('meta.login.description')} path="/login" noindex />
      <div className="container-page py-12">
        <div className="card mx-auto max-w-sm overflow-hidden">
          <h1 className="px-6 py-5 text-center text-xl font-semibold">{t('auth.login.title')}</h1>
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-ink-100 px-6 py-6">
            <p className="border-b-2 border-brand pb-2 text-center text-sm">{t('auth.login.tab')}</p>
            <TextField
              label={t('auth.login.email')}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <TextField
              label={t('auth.login.password')}
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            >
              <button
                type="button"
                onClick={() => setIsPasswordVisible((current) => !current)}
                className="absolute inset-y-1 right-1 rounded bg-ink-100 px-3 text-xs font-medium hover:bg-brand"
              >
                {isPasswordVisible ? t('auth.login.hide') : t('auth.login.show')}
              </button>
            </TextField>
            <div className="flex items-center justify-between gap-3 text-xs">
              <label htmlFor="login-remember" className="flex cursor-pointer items-center gap-2">
                <input
                  id="login-remember"
                  type="checkbox"
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                  className="h-4 w-4 accent-brand-dark"
                />
                {t('auth.login.remember')}
              </label>
              <LocalizedLink to="/contacts" className="text-ink-500 hover:text-ink-900 hover:underline">
                {t('auth.login.forgot')}
              </LocalizedLink>
            </div>
            <button type="submit" disabled={status === 'sending'} className="btn btn--primary btn--block">
              {status === 'sending' ? t('common.sending') : t('auth.login.submit')}
            </button>
            <FormStatus status={status} successText={t('auth.login.success')} />
          </form>
          <p className="border-t border-ink-100 px-6 py-4 text-center text-xs">
            {t('auth.login.noAccount')}
            {' '}
            <LocalizedLink to="/register" className="font-semibold text-ink-900 underline decoration-brand decoration-2 underline-offset-4">
              {t('auth.login.register')}
            </LocalizedLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
