import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/global-fonts.css';
import './styles/global.css';
import './styles/site.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = document.getElementById('root');
if (root) {
  // Set default theme on first paint so the body has a token set before React
  // hydrates the toggle. The App.tsx effect then reconciles with localStorage.
  if (!document.body.classList.contains('theme-light') && !document.body.classList.contains('theme-dark')) {
    document.body.classList.add(localStorage.getItem('theme') || 'theme-dark');
  }
  const tint = localStorage.getItem('tint');
  if (tint) document.body.classList.add(tint);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
