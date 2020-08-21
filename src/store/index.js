import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from './../redux/reducer';

const configStore = () => {
  const store = createStore(reducer, applyMiddleware(logger));
  return store;
};

export default configStore;
