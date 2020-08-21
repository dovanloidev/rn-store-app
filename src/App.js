import React from 'react';
import {Provider} from 'react-redux';

// import my library
import NavigationRoot from './router/MainContainer';
import configStore from './store';

console.disableYellowBox = true;

const store = configStore();

function App() {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
}

export default App;
