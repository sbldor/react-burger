import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './services';
import App from './components/app/app';

ReactDOM.render(
  
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  
  document.getElementById('root')
);



