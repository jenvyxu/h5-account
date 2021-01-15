import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from "react-redux";
import './index.scss';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

