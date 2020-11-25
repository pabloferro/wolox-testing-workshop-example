import React, { useEffect, useState, useCallback } from 'react';
import i18next from 'i18next';

import Loading from '~components/Spinner/components/loading';
import { useLazyRequest } from '~app/hooks/useRequest';
import api from '~config/api';

import Card, { IData } from './components/Card';
import styles from './styles.module.scss';

const REGISTERS_PER_PAGE = 4;

function Home() {
  const [data, setData] = useState([]);
  const [endIndex, setEndIndex] = useState(0);

  const [, loading, , getData] = useLazyRequest({
    request: () => api.get('/characters'),
    withPostSuccess: response => {
      setData(response);
      setEndIndex(response.length < REGISTERS_PER_PAGE ? data.length : REGISTERS_PER_PAGE);
    }
  });

  const handleClick = useCallback(() => {
    const regPerPage = endIndex + REGISTERS_PER_PAGE;
    setEndIndex(data.length < regPerPage ? data.length : regPerPage);
  }, [data, endIndex]);

  useEffect(() => {
    getData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <section className={`row center middle ${styles.loaderContainer}`}>
      <Loading />
    </section>
  ) : (
    <main className="column center">
      <div className={`row center wrap ${styles.characterContainer}`}>
        {data.slice(0, endIndex).map((el: IData) => (
          <Card key={el.id} data={el} />
        ))}
      </div>
      {endIndex < data.length && (
        <button type="button" className="button secondary small-title m-bottom-8" onClick={handleClick}>
          {i18next.t('Home:seeMore')}
        </button>
      )}
    </main>
  );
}

export default Home;
