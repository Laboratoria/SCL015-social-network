import { loginGoogle, sigUpFirebase } from '../../index.js';
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
  <img src="imagenes/logoOk.png" alt="logoVeg" id="logo">
  <h2> Aqui ira el formulario para el registro <h2>
  <button id="loginGoogle">Login con google</button>
  <form id="signUpForm" method="post">
  <input name="fullName" type="text" placeholder="Nombre Completo" id="fullName" pattern="[a-zA-Z ]{3,30}" title="Solo se permiten letras y un minimo de 3 caracteres" required>
  <input name="userName" type="text" placeholder="Nombre de Usuario" id="userNameSignUp" minlength="2" maxlength="30" title="Minimo de 3 caracteres" required>
  <input name="email" type="email" placeholder="Correo electronico" id="emailSignUp" required>
  <input name="password" type="password" placeholder="Contraseña" id="passwordSignUp" minlength="6" maxlength="8" required>
  <p id="errorPassword">Tu contraseña debe contener minimo 6 caracteres. Al menos 1 caracter numerico y 1 caracter alfabetico.</p> 
  <button type="submit" id="btnSignUp">Registrarme</button>
  </form>
  <div id="foot"> 
  <h3>¿Ya tienes cuenta?</h3>
  <a href=""><h3>Ingresa aquí</h3></a>
  </div>
  `;
  divSignUp.innerHTML = viewSignUp;

  const errorPasswords = divSignUp.querySelector('#errorPassword');

  const bntGoogle = divSignUp.querySelector('#loginGoogle');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const signUpForm = divSignUp.querySelector('#signUpForm');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.querySelector('#fullName').value;
    const userName = document.querySelector('#userNameSignUp').value;
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;
    console.log(password, email);
    console.log('hellooooooooooo');

    if (password.match(/[a-z]/g) && password.match(/[0-9]/g) && password.length >= 6) { // match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
      sigUpFirebase(email, password);
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
