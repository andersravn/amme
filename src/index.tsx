import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  /* Paste your config object from Firebase console here
   */
  apiKey: "AIzaSyDq8vCKUHs321cWIG0d3cUzXszW1dgz1k8",
  authDomain: "animals-44596.firebaseapp.com",
  databaseURL: "https://animals-44596.firebaseio.com",
  projectId: "animals-44596",
  storageBucket: "animals-44596.appspot.com",
  messagingSenderId: "862113204757",
  appId: "1:862113204757:web:0d63577bb36af786729c1c",
  measurementId: "G-LSR68G97DH",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
