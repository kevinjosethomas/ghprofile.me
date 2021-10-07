import React from 'react';
import dotenv from "dotenv";
import ReactDOM from 'react-dom';
import App from './app';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
