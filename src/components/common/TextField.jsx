import { useId } from 'react';
import PropTypes from 'prop-types';

function TextField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete = undefined,
  inputMode = undefined,
  multiline = false,
  children = null,
}) {
  const id = useId();
  const Control = multiline ? 'textarea' : 'input';
  return (
    <label htmlFor={id} className="field">
      <span className="field__label">
        {label}
        {required ? <span className="field__required"> *</span> : null}
      </span>
      <span className="field__control">
        <Control
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={multiline ? undefined : type}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          rows={multiline ? 4 : undefined}
          className="field__input"
        />
        {children}
      </span>
    </label>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  inputMode: PropTypes.string,
  multiline: PropTypes.bool,
  children: PropTypes.node,
};

export default TextField;
