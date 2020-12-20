// aqui exportaras las funciones que necesites
import { cleanForm } from './view/logInAndSignUp/templateSignUp.js';

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

//login con google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
    const token = result.credential.accessToken;
    // La información del usuario que inició sesión.
    const user = result.user;
    console.log('user', user);
    window.location.href = '#/muro';
    // ...
  }).catch((error) => {
    // Maneja los errores aquí.
    const errorCode = error.code;
    const errorMessage = error.message;
    // Correo electrónico de la cuenta del usuario utilizada
    const email = error.email;
    // El tipo firebase.auth.AuthCredential que se usó.
    const credential = error.credential;
    console.log('error', errorMessage);
    // ...
  });
};

// Acceso de usuarios existentes
export const sigUpFirebase = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('datos usuario', user);
      user.user.sendEmailVerification();
      alert('Te hemos enviado un correo para confirmar tu cuenta. *Recuerda revisar tu bandeja de spam o correos no deseado');
      window.location.href = '';
    // Signed in
      // signUpForm.reset();
       // reset() restablece los valores de los elementos en un formulario
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      if (errorCode === 'auth/email-already-in-use') {
        alert('Este usuario ya existe');
        cleanForm();
      } else {
        alert('Error');
        cleanForm();
      }
    });
};

export const loginFirebase = (email, password) => {
  console.log('entro');
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
