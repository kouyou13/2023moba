import React, {useState} from 'react';

import Top from './Top';
import Login from './Login';

const App = () => {
  const [page, setPage] = useState('Login')

  return (
    page === 'Login' ?
      <Login setPage={setPage}/>
    :
      <Top/>
  )
}

export default App;
