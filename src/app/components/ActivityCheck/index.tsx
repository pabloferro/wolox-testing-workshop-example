import React, { useState, useEffect } from 'react';
import i18next from 'i18next';

const ACTIVITY_CHECK_INTERVAL = 3000;

function ActivityCheck() {
  const [check, setCheck] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(
      () => setCheck(prevCheck => Math.min(prevCheck + 1, 2)),
      ACTIVITY_CHECK_INTERVAL
    );

    return function cleanUp() {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [setCheck]);

  return check > 0 ? <p>{i18next.t(`Home:check${check}`)}</p> : null;
}

export default ActivityCheck;
