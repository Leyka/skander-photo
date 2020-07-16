import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Routes } from './routes';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
