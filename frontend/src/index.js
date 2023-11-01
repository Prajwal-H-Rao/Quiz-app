import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain='dev-yt7zvzsey1qil7se.us.auth0.com'
  clientId='8jpkr3s76ORWHRB999PXph3Tm5h9CCVJ'
  authorizationParams={{
    redirect_uri:window.location.origin
  }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);
reportWebVitals();
