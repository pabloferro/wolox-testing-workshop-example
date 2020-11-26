import React, { useReducer, useState } from 'react';

import '../scss/application.scss';

import { reducer as userReducer, INITIAL_STATE } from '~contexts/UserContext/reducer';
import { Context } from '~contexts/UserContext';
import SpoilersContext from '~contexts/SpoilersContext';
import Routes from '~components/Routes';

function App() {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);
  const [showSpoilers, setShowSpoilers] = useState(false);

  return (
    <Context.Provider value={{ state: userState, dispatch: userDispatch }}>
      <SpoilersContext.Provider value={{ showSpoilers, setShowSpoilers }}>
        <Routes />
      </SpoilersContext.Provider>
    </Context.Provider>
  );
}

export default App;
