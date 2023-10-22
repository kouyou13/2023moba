import React from 'react';
import { HashRouter, Route, Routes} from 'react-router-dom';

import Top from './Top';
import Login from './Login';

const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' Component={Top} />
        <Route path='Login' Component={Login} />
      </Routes>
    </HashRouter>
  )
}

export default Routing;
