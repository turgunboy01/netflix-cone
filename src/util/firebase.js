// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAVnssu3vTG0zZNcZniWNmZeGuuEoPXdXI",
  authDomain: "netflix-clone-ca98d.firebaseapp.com",
  projectId: "netflix-clone-ca98d",
  storageBucket: "netflix-clone-ca98d.appspot.com",
  messagingSenderId: "276090526067",
  appId: "1:276090526067:web:96c5c5470c2c5e8b110d06",
  measurementId: "G-60N16G060R",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    await addDoc(collection(db, "users"), {
      uid: user.uid, // user obyektining uid xususiyatiga o'zgartirildi
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const lagout = () => {
  signOut(auth);
};

export { auth, db, login, signup, lagout };
