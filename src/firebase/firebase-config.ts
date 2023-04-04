// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
const auth = getAuth()
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://nano-byte-media.web.app/home',
  // This must be true.
  handleCodeInApp: true,
  dynamicLinkDomain: 'NanoByte.page.link'
};

export {
    app,
    actionCodeSettings,
}