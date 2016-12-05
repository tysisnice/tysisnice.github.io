
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import router from './router';
// require('es6-promise').polyfill();

ReactDOM.render(
  <Provider store={store}>
  	{router}
  </Provider>,
  document.getElementById('root')
);
