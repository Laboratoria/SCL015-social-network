import firebase from 'firebase/app';
// import { initializeFb } from '../firebaseConfig.js';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB2r9qp8bDIPyEc85GKA9D1GwIaNxOzCZg',
  authDomain: 'social-veg.firebaseapp.com',
  projectId: 'social-veg',
  storageBucket: 'social-veg.appspot.com',
  messagingSenderId: '241699896847',
  appId: '1:241699896847:web:d9ecbe3e645536afcc2d7a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signUpFirebase = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const singOff = () => {
  firebase.auth().signOut().then(() => {
  }).catch(() => {
  });
};
