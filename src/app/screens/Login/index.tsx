import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useDispatch } from '~contexts/UserContext';
import { actionCreators, Credentials, User } from '~contexts/UserContext/reducer';
import { login, setCurrentUser } from '~services/AuthServices';
import { useLazyRequest } from '~app/hooks/useRequest';
import FormInput from '~components/FormInput';
import PATHS from '~components/Routes/paths';

import { VALIDATION_SCHEMA, FIELD_NAMES } from './constants';
import styles from './styles.module.scss';

function Login() {
  const { register, handleSubmit, errors, formState } = useForm();
  const { dirtyFields } = formState;
  const history = useHistory();
  const dispatch = useDispatch();
  const [, , , loginRequest] = useLazyRequest({
    request: (credentials: Credentials) => login(credentials),
    withPostSuccess: response => {
      const userResponse = response as User;
      dispatch(actionCreators.setUser(userResponse));
      setCurrentUser(userResponse);
      history.push('/');
    }
  });

  return (
    <main className={styles.container}>
      <section className={styles.leftContainer} />
      <section className={styles.rightContainer}>
        <div className={`column center full-width ${styles.rightContent}`}>
          <form onSubmit={handleSubmit(loginRequest)}>
            <h1 className="title white-color m-bottom-4">{i18next.t('Login:login')}</h1>
            <p className="base-text white-color m-bottom-4">{i18next.t('Login:loginExplanation')}</p>
            <FormInput
              id={FIELD_NAMES.EMAIL}
              label={i18next.t('Login:email') as string}
              register={register}
              validationSchema={VALIDATION_SCHEMA.EMAIL}
              errors={errors.email}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.EMAIL)}
            />
            <FormInput
              id={FIELD_NAMES.PASSWORD}
              label={i18next.t('Login:password') as string}
              type="password"
              register={register}
              validationSchema={VALIDATION_SCHEMA.PASSWORD}
              errors={errors.password}
              isDirty={dirtyFields?.hasOwnProperty(FIELD_NAMES.PASSWORD)}
            />
            <div className="column">
              <button type="submit" className="button primary base-text fw-bold m-bottom-4">
                {i18next.t('Login:enter')}
              </button>
              <a href={PATHS.registration} className={`small-text fw-bold link ${styles.link}`}>
                {i18next.t('Login:createAccount')}
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
