import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './services/index';
import App from './components/app/app';

const store = configureStore({ reducer: rootReducer })

ReactDOM.render(
  
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  
  document.getElementById('root')
);



