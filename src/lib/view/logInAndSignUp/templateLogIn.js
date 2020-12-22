// import { sigUpFirebase } from '../../index.js';
import { loginGoogle } from '../../index.js';

export const templateLogIn = () => {
  const divLogIn = document.createElement('div');
  const viewLogIn = `
      <div class="container">
      <a href="#/muro"> 
       <img src="imagenes/logoOK.png" alt="logoVeg" id="logo">    
      </a>
      <h2> La mejor red social para vegetarianos</h2>
      <div class="buttons" id="buttons">       
       <button id="loginGoogle2">Ingresar con Gmail</button>
       <form id="loginForm">
         <input name="email" type="email" placeholder="Correo electronico" id="emailLogin" required>
         <input name="password" type="password" placeholder="Contraseña" id="passwordLogin" minlength="6" maxlength="8" required>
         <button type="button" id="btnLogIn">INGRESAR</button>
       </form>
      </div>
      <div id="foot"> 
        <h3>¿No tienes cuenta?</h3> 
        <a href="#/registro"><h3>Registrate aquí</h3></a>
      </div>
      <img src="imagenes/fondoo.png" alt="logoVeg" id="fondo">
      </div>
      `;
  divLogIn.innerHTML = viewLogIn;

  const bntGoogle = divLogIn.querySelector('#loginGoogle2');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const loginForm = divLogIn.querySelector('#btnLogIn'); // selector del boton INGRESAR
  loginForm.addEventListener('click', () => {
    // e.preventDefault();
    const email = document.querySelector('#emailLogin').value;
    const password = document.querySelector('#passwordLogin').value;
    console.log(password, email);

    // funcion para limpliar los input
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
        if (user.user.emailVerified === true) { //si hizo la vefiricacion del correo ingresa al muro
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
          case 'auth/invalid-email':
            alert('El correo ingresado no cummple con el formato del email');
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
