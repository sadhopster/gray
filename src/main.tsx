import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // ← этот файл должен быть первым
import App from './App';
import './styles.css'; // ← если есть

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

