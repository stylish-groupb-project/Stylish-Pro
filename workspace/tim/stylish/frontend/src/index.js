import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import App from './App';
// import { Footer } from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// profile = "./img/member.png"
//       cart = "./img/cart.png"
//       split = "./img/split.svg"
//       search = "./img/search.png"
//       logo = "./img/logo.png"

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
