import React from 'react';
import { Provider } from 'react-redux'
import store from './store';

import Whazz from './components/Whazz';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Whazz />
      </Provider>
    );
  }
}

export default App;
