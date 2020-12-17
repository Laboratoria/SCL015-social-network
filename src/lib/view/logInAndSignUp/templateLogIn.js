// import { sigUpFirebase } from '../../index.js';
import { loginGoogle } from '../../index.js';

export const templateLogIn = () => {
  const divLogIn = document.createElement('div');
  const viewLogIn = `
      <h2> La mejor red social para vegetarianos <h2>
      <button id="loginGoogle2">Login con google</button>
      <a href="#/registro">
         <button id="bntSignUp">Registrarse</button>
        </a>
      <form id="loginForm">
        <input name="email" type="email" placeholder="Correo electronico" id="emailLogin">
        <input name="password" type="password" placeholder="Contraseña" id="passwordLogin" maxlength="6">
        <button type="button" id="btnLogIn">INGRESAR</button>
        </form>
      `;
  divLogIn.innerHTML = viewLogIn;

  const bntGoogle = divLogIn.querySelector('#loginGoogle2');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const loginForm = divLogIn.querySelector('#btnLogIn'); // selector del bpton INGRESAR
  loginForm.addEventListener('click', () => {
    // e.preventDefault();
    console.log('Entro al ingresar');
    const email = document.querySelector('#emailLogin').value;
    const password = document.querySelector('#passwordLogin').value;
    console.log(password, email);

    // limpliar los input
    const cleanForm = () => {
      document.querySelector('#emailLogin').value = '';
      document.querySelector('#passwordLogin').value = '';
    };
    // Acceso de usuarios existentes
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        console.log('Usuario', user);
        console.log('LISTO se loguio');
        if (user.user.emailVerified === true) { // si hizo la vefiricacion del correo ingresa al muro
          window.location.href = '/#/muro';
        } else {
          alert('Por favor confirma tu usuario en el link de verificacion enviado a tu correo');
          cleanForm();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        switch (errorCode) {
          case 'auth/user-not-found':
            alert('Aun no estas registrado');
            cleanForm();
            break;
          case 'auth/wrong-password':
            alert('Tu Contraseña es incorrecta');
            cleanForm();
            break;
          default:
            alert('Error');
        }
      });

    // observador de estado de autenticación
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('existe usuario activo');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        console.log('no exite usuario activo');
        // User is signed out
        // ...
      }
    });
  });
  return divLogIn;
};
