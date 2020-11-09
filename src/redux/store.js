import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rootReducer from './root-reducer';

// const middleware = [thunk, logger];
const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;

