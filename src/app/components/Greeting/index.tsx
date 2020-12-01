import React from 'react';
import i18next from 'i18next';

import toTitleCase from '~utils/toTitleCase';

function Greeting({ userName }: { userName?: string }) {
  return (
    <h2 className="small-title white-color m-right-5">
      {i18next.t('Home:greeting', { name: toTitleCase(userName || 'caped crusader') })}
    </h2>
  );
}

export default Greeting;
