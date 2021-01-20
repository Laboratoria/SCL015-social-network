// import { sigUpFirebase } from '../../index.js';
import { loginGoogle, observer, loginFb } from '../../index.js';

export const templateLogIn = () => {
  const divLogIn = document.createElement('div');
  const viewLogIn = `
      <div class="container">
      <a href="#/muro"> 
       <img src="https://i.imgur.com/kYsQAKx.png" alt="logoVeg" id="logo">    
      </a>
      <h2 class="welcome-veg"> ¡La mejor red social para vegetarianos!</h2>
      <div class="buttons" id="buttons">       
       <button id="loginGoogle2">Ingresar con Gmail</button>
       <fieldset class="separator">
       <legend>o</legend>
       </fieldset>
       <form id="loginForm">
         <input class="inputMain" name="email" type="email" placeholder="Correo electronico" id="emailLogin" required>
         <input class="inputMain" name="password" type="password" placeholder="Contraseña" id="passwordLogin" minlength="6" maxlength="8" required>
         <button type="button" id="btnLogIn">INGRESAR</button>
       </form>
      </div>
      <div id="foot"> 
        <h3 class="opcion-main">¿No tienes cuenta?</h3> 
        <a href="#/registro"><h3>Registrate aquí</h3></a>
      </div>
      <img src="imagenes/fondoo.png" alt="logoVeg" id="fondo">
      </div>
      `;
  divLogIn.innerHTML = viewLogIn;

  // Log In con Google
  const bntGoogle = divLogIn.querySelector('#loginGoogle2');
  bntGoogle.addEventListener('click', () => {
    loginGoogle(); // funcion para loguearse con google
  });

  const loginForm = divLogIn.querySelector('#btnLogIn'); // selector del boton INGRESAR
  loginForm.addEventListener('click', () => {
    const email = document.querySelector('#emailLogin').value;
    const password = document.querySelector('#passwordLogin').value;

    loginFb(email, password); // funcionpara loguear usuarios registrados
    observer(); // funcion observador
  });
  return divLogIn;
};
