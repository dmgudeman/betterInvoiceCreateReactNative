import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers/index';


const store = createStore(
  reducers,                 // import reducers
  {},                       // initial state of store
  compose(                  // apply middleware
    applyMiddleware(thunk, logger)
  )
);

export default store;