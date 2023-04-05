
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBhA8yb2jhaNmk9n_bAdmZEvsJMpihgHyg",
  authDomain: "draw-react.firebaseapp.com",
  projectId: "draw-react",
  storageBucket: "draw-react.appspot.com",
  messagingSenderId: "817829296584",
  appId: "1:817829296584:web:95abeeab3a7dd2882c68fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
