import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useDispatch } from '~contexts/UserContext';
import { actionCreators, Credentials, User } from '~contexts/UserContext/reducer';
import { login, setCurrentUser } from '~services/AuthServices';
import { useLazyRequest } from '~app/hooks/useRequest';
import FormInput from '~components/FormInput';
import Loading from '~components/Spinner/components/loading';
import PATHS from '~components/Routes/paths';
import { ERROR_MESSAGES } from '~constants/errorMessages';

import styles from '../Login/styles.module.scss';

import { VALIDATION_SCHEMA, FIELD_NAMES } from './constants';

function Registration() {
  const { register, handleSubmit, errors, formState, getValues, setError, clearErrors } = useForm();
  const { dirtyFields } = formState;
  const history = useHistory();
  const dispatch = useDispatch();
  const [, loading, , loginRequest] = useLazyRequest({
    request: (credentials: Credentials) => login(credentials),
    withPostSuccess: response => {
      // TODO integrate this when backend
      const userResponse = response as User;
      dispatch(actionCreators.setUser(userResponse));
      setCurrentUser(userResponse);
      history.push('/');
    }
  });

  function handleChangePasswordRepeat(e: React.FormEvent) {
    const { password } = getValues();
    const { value } = e.target as HTMLInputElement;
    if (value === password) {
      return clearErrors('passwordRepeat');
    }
    setError(FIELD_NAMES.PASSWORD_REPEAT, { type: 'notMatch', message: ERROR_MESSAGES.passwordRepeat });
    return 0;
  }

  return (
    <main className={styles.container}>
      <section className={styles.leftContainer} />
      <section className={styles.rightContainer}>
        <div className={`column center full-width ${styles.rightContent} ${styles.signUp}`}>
          <form onSubmit={handleSubmit(loginRequest)}>
            <h1 className="title white-color m-bottom-4">{i18next.t('Registration:registration')}</h1>
            <p className="base-text white-color m-bottom-4">{i18next.t('Login:loginExplanation')}</p>
            <FormInput
              id={FIELD_NAMES.NAME}
              label={i18next.t('Registration:name') as string}
              register={register}
              validationSchema={VALIDATION_SCHEMA.NAME}
              errors={errors[FIELD_NAMES.NAME]}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.NAME)}
            />
            <FormInput
              id={FIELD_NAMES.USER_NAME}
              label={i18next.t('Registration:username') as string}
              register={register}
              validationSchema={VALIDATION_SCHEMA.USER_NAME}
              errors={errors[FIELD_NAMES.USER_NAME]}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.USER_NAME)}
            />
            <FormInput
              id={FIELD_NAMES.EMAIL}
              label={i18next.t('Login:email') as string}
              register={register}
              validationSchema={VALIDATION_SCHEMA.EMAIL}
              errors={errors[FIELD_NAMES.EMAIL]}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.EMAIL)}
            />
            <FormInput
              id={FIELD_NAMES.PASSWORD}
              label={i18next.t('Login:password') as string}
              type="password"
              register={register}
              validationSchema={VALIDATION_SCHEMA.PASSWORD}
              errors={errors[FIELD_NAMES.PASSWORD]}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.PASSWORD)}
            />
            <FormInput
              id={FIELD_NAMES.PASSWORD_REPEAT}
              label={i18next.t('Registration:confirmPassword') as string}
              type="password"
              register={register}
              validationSchema={VALIDATION_SCHEMA.PASSWORD_REPEAT}
              errors={errors[FIELD_NAMES.PASSWORD_REPEAT]}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.PASSWORD_REPEAT)}
              onChange={handleChangePasswordRepeat}
            />
            <div className="column">
              <button type="submit" className="row middle center button primary base-text fw-bold m-bottom-4">
                {loading && <Loading name="circle" className="m-right-1" />}
                {i18next.t('Registration:submit')}
              </button>
              <a href={PATHS.login} className={`small-text fw-bold link ${styles.link}`}>
                {i18next.t('Registration:goToLogin')}
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Registration;
