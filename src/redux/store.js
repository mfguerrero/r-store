import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'


import { fetchCollectionsStart } from './shop/shop.saga'

import rootReducer from './root-reducer';


const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(fetchCollectionsStart)

export const persistor = persistStore(store);

export default store;

