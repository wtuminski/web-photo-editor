import '~/Styles/main.scss';
import '~/Styles/font-faces.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { initColorScheme } from './Styles/theme';

initColorScheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
