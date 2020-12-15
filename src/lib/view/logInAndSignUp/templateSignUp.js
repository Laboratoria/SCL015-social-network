import { login } from '../../index.js';

export const templateSignUp = () => {
  const divSignUp = document.createElement('div');

  const viewSignUp = `
  <h2> Aqui ira el formulario para el registro <h2>
  <form id=signUpForm>
    <button id="loginGoogle">Login con google</button>
    <input name="fullName" type="text" placeholder="Nombre Completo" id="fullName" >
    <input name="userName" type="text" placeholder="Nombre de Usuario" id="userNameSignUp">
    <input name="email" type="email" placeholder="Correo electronico" id="emailSignUp" required>
    <input name="password" type="password" placeholder="Contraseña" id="passwordSignUp" maxlength="6">
    <button type="submit" id="bntSignUp"></button>
  </form>
  
  `;

  divSignUp.innerHTML = viewSignUp;

  const bntGoogle = divSignUp.querySelector('#loginGoogle');
  bntGoogle.addEventListener('click', () => {
    login();
  });

  const signUpForm = divSignUp.querySelector('#signUpForm');
  signUpForm.addEventListener('click', () => {
    const fullName = document.querySelector('#fullName');
    const userName = document.querySelector('#userNameSignUp');
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;
    console.log(password, email);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
      // Signed in
        signUpForm.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      // ..
      });
  });
  //  e.preventDefault();

  return divSignUp;
};
