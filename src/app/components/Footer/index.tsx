import React from 'react';
import i18next from 'i18next';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={`column center middle ${styles.footer}`}>
      <header className="column center m-bottom-8">
        <q cite={`${i18next.t('Home:footerQuoteAuthor')}`} className="base-text fw-bold white-color">
          {i18next.t('Home:footerQuote')}
        </q>
        <span className="base-text fw-bold white-color">{i18next.t('Home:footerQuoteAuthor')}</span>
      </header>
      <small className="small-text white-color fw-thin self-end">
        {i18next.t('Home:madeText')}
        <span className="m-left-1" role="img" aria-label="love">
          ❤️
        </span>
        {i18next.t('Home:madeBy')}
      </small>
    </footer>
  );
}

export default Footer;
