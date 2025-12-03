import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // This imports your portfolio component
import './index.css'

// Find the root element in index.html where the app will be rendered
const rootElement = document.getElementById('root');

// Render the main App component into the root element
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);