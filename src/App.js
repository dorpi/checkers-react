import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



import GameDisplay from './components/GameDisplay'

function App() {
  return (
    <Provider store={store}>
      <GameDisplay/>
    </Provider>
  );
}

export default App;
