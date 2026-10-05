import useFormValues from '../../hooks/useFormValues';
import useSubmit from '../../hooks/useSubmit';
import { useI18n } from '../../i18n/I18nContext';
import FormStatus from '../common/FormStatus';

const INITIAL_VALUES = { email: '' };

function SubscribeForm() {
  const { t, lang } = useI18n();
  const { values, handleChange, reset } = useFormValues(INITIAL_VALUES);
  const { status, submit } = useSubmit('/subscriptions');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSent = await submit({ email: values.email, lang });
    if (isSent) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex max-w-xs flex-col gap-2">
      <label htmlFor="footer-subscribe-email" className="sr-only">
        {t('footer.subscribe.placeholder')}
      </label>
      <input
        id="footer-subscribe-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        placeholder={t('footer.subscribe.placeholder')}
        className="field__input !border-transparent"
      />
      <button type="submit" disabled={status === 'sending'} className="btn btn--primary self-start">
        {status === 'sending' ? t('common.sending') : t('footer.subscribe.button')}
      </button>
      <FormStatus status={status} successText={t('footer.subscribe.success')} />
    </form>
  );
}

export default SubscribeForm;
