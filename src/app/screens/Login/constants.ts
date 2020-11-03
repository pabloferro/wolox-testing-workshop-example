import { ERROR_MESSAGES } from '~constants/errorMessages';
import { emailRegex, passwordRegex } from '~utils/inputValidations';

export const FIELD_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password'
};

export const VALIDATION_SCHEMA = {
  EMAIL: {
    required: ERROR_MESSAGES.required,
    maxLength: {
      value: 60,
      message: `${ERROR_MESSAGES.maxLength} 60`
    },
    minLength: {
      value: 5,
      message: `${ERROR_MESSAGES.minLength} 5`
    },
    pattern: {
      value: emailRegex,
      message: ERROR_MESSAGES.email
    }
  },
  PASSWORD: {
    required: ERROR_MESSAGES.required,
    maxLength: {
      value: 60,
      message: `${ERROR_MESSAGES.maxLength} 60`
    },
    minLength: {
      value: 10,
      message: `${ERROR_MESSAGES.minLength} 10`
    },
    pattern: {
      value: passwordRegex,
      message: ERROR_MESSAGES.password
    }
  }
};
