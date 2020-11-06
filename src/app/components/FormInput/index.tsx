import React from 'react';

import styles from './styles.module.scss';

interface Props {
  id: string;
  label?: string;
  type?: string;
  validationSchema?: {
    required?: string;
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: any;
      message: string;
    };
  };
  errors?: {
    message: string;
  };
  isDirty?: boolean;
  register: any;
  onChange?: (e: React.FormEvent) => void;
}

function FormInput({ id, label, type, register, validationSchema, errors, isDirty, onChange }: Props) {
  return (
    <div className={`m-bottom-4 ${styles.container}`}>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        onChange={onChange}
        ref={register(validationSchema)}
        className={`base-text ${styles.input} ${isDirty ? styles.filled : ''}`}
      />
      <label className="base-text" htmlFor={id}>
        {label}
      </label>
      {errors && <small className={`small-text fw-semibold ${styles.error}`}>{errors.message}</small>}
    </div>
  );
}

FormInput.defaultProps = {
  type: 'text',
  validationSchema: {}
};

export default FormInput;
