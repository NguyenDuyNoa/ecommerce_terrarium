import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./redux/store.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    {/* <GoogleOAuthProvider clientId={clientGoogleId}> */}
      <App />
    {/* </GoogleOAuthProvider> */}
  </Provider>
</BrowserRouter>
);
