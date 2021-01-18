export const signUpFirebase = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const singOff = () => {
  firebase.auth().signOut();
};
