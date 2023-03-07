import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: red[600],
    },
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyBaHN49MernWzmNOzoCjacb4Jd95YAKqKw",
  authDomain: "nano-byte-media.firebaseapp.com",
  projectId: "nano-byte-media",
  storageBucket: "nano-byte-media.appspot.com",
  messagingSenderId: "129740957204",
  appId: "1:129740957204:web:7fa1a1bad3307a8155a901",
  measurementId: "G-1KWF5P2FYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
