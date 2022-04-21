import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './services/index';
import App from './components/app/app';
import { wsMiddleware } from "./services/middlewares/websocket";
import { wsActions } from "./services/slices/feed-ws-slice";

const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsMiddleware(wsActions)),
  devTools: process.env.NODE_ENV !== "production",
})

ReactDOM.render(
  
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  
  document.getElementById('root')
);



