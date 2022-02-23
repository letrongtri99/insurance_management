import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiServices from 'data/gateway/api/services';
import rootEpic from '../epics';

import { rootReducer } from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage,
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const persistedReducer = persistReducer(persistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiServices,
  },
});

export const configureStore = (): any => {
  const middlewares: any = [epicMiddleware];

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middlewares), composeEnhancers())
  );

  epicMiddleware.run(rootEpic);

  return store;
};
