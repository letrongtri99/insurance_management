import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import 'scss/index.scss';
import App from 'App';
import { configureStore } from 'presentation/redux/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
