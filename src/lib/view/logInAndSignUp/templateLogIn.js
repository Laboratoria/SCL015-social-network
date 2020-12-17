// import { sigUpFirebase } from '../../index.js';

export const templateLogIn = () => {
  const divLogIn = document.createElement('div');
  const viewLogIn = `
      <img src="imagenes/logo.png" alt="logoVeg" id="logo">
      <h2> La mejor red social para vegetarianos <h2>
      <div class="buttons" id="buttons">       
       <button id="loginGoogle">Ingresar con Gmail</button>
       <a href="#/registro">
          <button id="bntSignUp">Registrarse</button>
         </a>
       <form id="loginForm">
         <input name="email" type="email" placeholder="Correo electronico" id="emailLogin">
         <input name="password" type="password" placeholder="Contraseña" id="passwordLogin" maxlength="6">
         <button type="button" id="btnLogIn">INGRESAR</button>
       </form>
      </div>
      <img src="imagenes/fondo.png" alt="logoVeg" id="fondo">
      `;
  divLogIn.innerHTML = viewLogIn;

  const loginForm = divLogIn.querySelector('#btnLogIn'); // selector del bpton INGRESAR
  loginForm.addEventListener('click', () => {
    // e.preventDefault();
    console.log('Entro al ingresar');
    const email = document.querySelector('#emailLogin').value;
    const password = document.querySelector('#passwordLogin').value;
    console.log(password, email);

    // Acceso de usuarios existentes
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('se loguio');
        // window.location.href=  "/#/muro"
        // Signed in
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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

