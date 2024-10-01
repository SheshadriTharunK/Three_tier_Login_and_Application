import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Just import the App component
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap for styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);

reportWebVitals();
