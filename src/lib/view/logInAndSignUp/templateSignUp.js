import { loginGoogle } from '../../index.js';

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
  </form>
  <button id="btnSignUp">Registrarme</button>
  `;
  divSignUp.innerHTML = viewSignUp;

  const bntGoogle = divSignUp.querySelector('#loginGoogle');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const signUpForm = divSignUp.querySelector('#btnSignUp');
  signUpForm.addEventListener('click', () => {
    const fullName = document.querySelector('#fullName');
    const userName = document.querySelector('#userNameSignUp');
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;
    console.log(password, email);

    // limpliar los input
    const cleanForm = () => {
      document.querySelector('#emailSignUp').value = '';
      document.querySelector('#passwordSignUp').value = '';
    };

    // Acceso de usuarios existentes
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('datos usuario', user);
        user.user.sendEmailVerification();
        alert('Te hemos enviado un correo para confirmar tu cuenta. *Recuerda revisar tu bandeja de spam o correos no deseado');
        window.location.href = '';
        // Signed in
      // signUpForm.reset(); // reset() restablece los valores de los elementos en un formulario
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
  });
  //  e.preventDefault();

  return divSignUp;
};
