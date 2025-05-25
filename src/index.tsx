import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DotGothic16&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 