import firebase from 'firebase/app';
import 'firebase/auth';
import initializeApp from '../firebaseConfig.js'

export const signUpFirebase = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const singOff = () => {
  initializeApp.auth().signOut();
};
