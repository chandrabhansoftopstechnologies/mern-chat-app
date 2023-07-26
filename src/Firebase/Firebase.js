import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzLCXpwUZMBl-IqYmCt3mBDSI8Cv917CQ",
  authDomain: "mern-chat-app-398e5.firebaseapp.com",
  projectId: "mern-chat-app-398e5",
  storageBucket: "mern-chat-app-398e5.appspot.com",
  messagingSenderId: "657396505401",
  appId: "1:657396505401:web:3e5a717c1a117bffc7e6e8",
  measurementId: "G-JLCT9J0XWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
