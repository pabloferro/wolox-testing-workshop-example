import { ERROR_MESSAGES } from '~constants/errorMessages';
import { emailRegex, passwordRegex } from '~utils/inputValidations';

export const FIELD_NAMES = {
  NAME: 'name',
  EMAIL: 'email',
  USER_NAME: 'username',
  PASSWORD: 'password',
  PASSWORD_REPEAT: 'passwordRepeat'
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
  },
  PASSWORD_REPEAT: {
    required: ERROR_MESSAGES.required
  },
  USER_NAME: {
    required: ERROR_MESSAGES.required,
    maxLength: {
      value: 45,
      message: `${ERROR_MESSAGES.maxLength} 45`
    },
    minLength: {
      value: 3,
      message: `${ERROR_MESSAGES.minLength} 3`
    }
  },
  NAME: {
    required: ERROR_MESSAGES.required,
    maxLength: {
      value: 75,
      message: `${ERROR_MESSAGES.maxLength} 75`
    },
    minLength: {
      value: 3,
      message: `${ERROR_MESSAGES.minLength} 3`
    }
  }
};
