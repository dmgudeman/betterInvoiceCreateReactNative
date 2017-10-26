import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';


const store = createStore(
  reducers,                 // import reducers
  {},                       // initial state of store
  compose(                  // apply middleware
    applyMiddleware(thunk)
  )
);

export default store;