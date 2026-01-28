import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2baGHKgaC97LjEbcZ_6ezpHcBMVv0DMU",
  authDomain: "quanto-manca-c192c.firebaseapp.com",
  projectId: "quanto-manca-c192c",
  storageBucket: "quanto-manca-c192c.firebasestorage.app",
  messagingSenderId: "443190959334",
  appId: "1:443190959334:web:d1eba0c5ccc96a025e2f27",
  measurementId: "G-6KL5YB2WD7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
