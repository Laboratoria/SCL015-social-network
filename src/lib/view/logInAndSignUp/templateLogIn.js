// import { sigUpFirebase } from '../../index.js';

export const templateLogIn = () => {
  const contenLogIn = `
      <h2> La mejor red social para vegetarianos <h2>
      <button id="loginGoogle">Login con google</button>
      <a href="#/registro">
         <button id="bntSignUp">Registrarse</button>
        </a>
      <form id="loginForm">
        <input name="email" type="email" placeholder="Correo electronico" id="emailLogin">
        <input name="password" type="password" placeholder="Contraseña" id="passwordLogin" maxlength="6">
        <button type="button" id="btnLoguin">INGRESAR</button>
        </form>
      `;
  return contenLogIn;
};

const loginForm = document.querySelector('#btnLoguin');
loginForm.addEventListener('click', () => {
  // e.preventDefault();
  console.log('Entro al ingresar');
  const email = document.querySelector('#emailLogin').value;
  const password = document.querySelector('#passwordLogin').value;
  console.log(password, email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('se loguio');
      // Signed in
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
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
console.log(loginForm)

//  e.preventDefault();
