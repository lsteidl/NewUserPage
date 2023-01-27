import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
//import reportWebVitals from './App/reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAI9bBF-yDZ9o6p7ykO9C5OfVq3BWZTEH8",
  authDomain: "newuserpage-a9fa8.firebaseapp.com",
  projectId: "newuserpage-a9fa8",
  storageBucket: "newuserpage-a9fa8.appspot.com",
  messagingSenderId: "1026687285361",
  appId: "1:1026687285361:web:e8646934b06c51238083d0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Sign out
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App auth={auth}/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
