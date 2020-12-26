import { loginGoogle, signUpFirebase } from '../../index.js';
import { db } from '../../../firebaseConfig.js';

export const addCollection = (name, pseudonym, emailuser) => {
  db.collection('profile').add({
  // console.log("entro en las collection");
    fullName: name,
    userName: pseudonym,
    email: emailuser,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const templateSignUp = () => {
  const divSignUp = document.createElement('div');
  const viewSignUp = `
  <div class="container">
   <img src="imagenes/logoOk.png" alt="logoVeg" id="logo">
   <h2> Crea tu cuenta y haz nuevos amigos veg... </h2>
   <button id="loginGoogle2">  Registrate con google</button>
   <fieldset class="separator">
   <legend>o</legend>
   </fieldset>
   <form id="loginForm" method="post">
    <input name="fullName" type="text" class="inputSignUp" placeholder="Nombre Completo" id="fullName" pattern="[a-zA-Z ]{3,30}" title="Solo se permiten letras y un minimo de 3 caracteres" required>
    <input name="userName" type="text" class="inputSignUp" placeholder="Nombre de Usuario" id="userNameSignUp" minlength="2" maxlength="30" title="Minimo de 3 caracteres" required>
    <input name="email" type="email" class="inputSignUp" placeholder="Correo electronico" id="emailSignUp" required>
    <input name="password" type="password" class="inputSignUp" placeholder="Contraseña" id="passwordSignUp" minlength="6" maxlength="8" required>
    <p id="errorPassword">Tu contraseña debe contener minimo 6 caracteres. Al menos 1 caracter numerico y 1 caracter alfabetico.</p> 
    <button type="submit" id="btnSignUp">Registrarme</button>
   </form>
   <div id="foot2"> 
     <h3>¿Ya tienes cuenta?</h3>
     <a href=""><h3>Ingresa aquí</h3></a>
   </div>
   <img src="imagenes/fondoo.png" alt="logoVeg" id="fondo2">
   <img src="imagenes/fondoo.png" alt="logoVeg" id="fondo3">
  </div>
  `;
  divSignUp.innerHTML = viewSignUp;

  const errorPasswords = divSignUp.querySelector('#errorPassword');

  const bntGoogle = divSignUp.querySelector('#loginGoogle2');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const loginForm = divSignUp.querySelector('#loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.querySelector('#fullName').value;
    const userName = document.querySelector('#userNameSignUp').value;
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;
    console.log(password, email);
    console.log('hellooooooooooo');

    if (password.match(/[a-z]/g) && password.match(/[0-9]/g) && password.length >= 6) { // match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
      signUpFirebase(email, password);
      addCollection(fullName, userName, email);
    } else {
      errorPasswords.style.display = 'block';
      document.querySelector('#passwordSignUp').value = '';
    }
  });
  //  e.preventDefault();

  return divSignUp;
};

// limpliar los input
export const cleanForm = () => {
  document.querySelector('#emailSignUp').value = '';
  document.querySelector('#passwordSignUp').value = '';
};
