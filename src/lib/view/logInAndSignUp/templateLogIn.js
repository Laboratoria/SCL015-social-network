// import { sigUpFirebase } from '../../index.js';

export const templateLogIn = () => {
  const contenLogIn = `
      <h2> La mejor red social para vegetarianos <h2>
      <button id="loginGoogle">Login con google</button>
      <a href="#/registro">
         <button id="bntSignUp">Registrarse</button>
        </a>
      <form id=loginForm>
        <input name="email" type="email" placeholder="Correo electronico" id="emailLogin">
        <input name="password" type="password" placeholder="Contraseña" id="passwordLogin" maxlength="6">
        <input type="button" onClick="getInto()" id="bntSignUp" value="INGRESAR">
      `;
  const getInto = () => {
    const loginForm = divSignUp.querySelector('#loginForm');
    loginForm.addEventListener('click', () => {
      const email = document.querySelector('#emailLogin').value;
      const password = document.querySelector('#passwordLogin').value;
      console.log(password, email);

      sigUpFirebase(email, password);
    });
  }
  //  e.preventDefault();

  return contenLogIn;
};
