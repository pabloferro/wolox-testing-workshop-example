import React from 'react';
import { Switch } from 'react-router-dom';

import RouteItem from '~components/Routes/components/RouteItem';
import Navbar from '~components/Navbar';
import PATHS from '~components/Routes/paths';

import Home from './screens/Home';

function Dashboard() {
  return (
    <>
      <Navbar />
      <Switch>
        <RouteItem exact path={PATHS.home} component={Home} />
      </Switch>
    </>
  );
}

export default Dashboard;
