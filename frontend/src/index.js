import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/index.css';
import App from './App.js';
import Global from './styles/global.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='856227088376-2s973hf6jdm36cbmr1cnbo0697s38if3.apps.googleusercontent.com'>
      <BrowserRouter>
      <Global />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
