import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useFormValues from '../../hooks/useFormValues';
import useSubmit from '../../hooks/useSubmit';
import { useI18n } from '../../i18n/I18nContext';
import FormStatus from '../common/FormStatus';
import Icon from '../common/Icon';
import SectionTitle from '../common/SectionTitle';
import TextField from '../common/TextField';

const INITIAL_VALUES = { name: '', email: '', message: '' };

function RequestForm({ headingLevel = 'h2' }) {
  const { t, lang } = useI18n();
  const { values, handleChange, reset } = useFormValues(INITIAL_VALUES);
  const { status, submit } = useSubmit('/requests');
  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);

  const handleFiles = (event) => {
    setFileNames(Array.from(event.target.files).map((file) => file.name));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData();
    Object.entries({ ...values, lang }).forEach(([key, value]) => body.append(key, value));
    Array.from(fileInputRef.current.files).forEach((file) => body.append('files', file));
    const isSent = await submit(body);
    if (isSent) {
      reset();
      setFileNames([]);
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="card card--bordered p-5 md:p-6" aria-labelledby="request-title">
      <div id="request-title">
        <SectionTitle as={headingLevel}>{t('request.title')}</SectionTitle>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <TextField
          label={t('request.name')}
          name="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        <TextField
          label={t('request.email')}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <TextField
          label={t('request.message')}
          name="message"
          value={values.message}
          onChange={handleChange}
          multiline
          required
        />
        <label
          htmlFor="request-files"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-ink-300 bg-white px-3 py-3 text-xs text-ink-700 transition-colors hover:border-brand-dark hover:bg-brand-light"
        >
          <Icon name="paperclip" size={16} />
          {fileNames.length ? fileNames.join(', ') : t('request.attach')}
          <input
            ref={fileInputRef}
            id="request-files"
            type="file"
            multiple
            accept=".doc,.docx,.pdf,.xls,.xlsx"
            onChange={handleFiles}
            className="sr-only"
          />
        </label>
        <button type="submit" disabled={status === 'sending'} className="btn btn--primary btn--block">
          {status === 'sending' ? t('common.sending') : t('request.send')}
        </button>
        <FormStatus status={status} successText={t('request.success')} />
      </form>
    </section>
  );
}

RequestForm.propTypes = {
  headingLevel: PropTypes.string,
};

export default RequestForm;
