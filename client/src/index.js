// Modules
import React from 'react';
import dotenv from "dotenv";
import ReactDOM from 'react-dom';

// Components
import App from './App';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
