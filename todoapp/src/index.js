import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer
        position="top-right"
        autoClose={2000} 
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false} 
        draggable      
        theme="dark"
      />
  </React.StrictMode>,
  document.getElementById('root')
);
