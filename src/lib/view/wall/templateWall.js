import { db } from '../../../firebaseConfig.js';
import { addCollectionPost } from '../../index.js';
// import {em} from '../logInAndSignUp/templateLogIn.js';

// contenido del muro
export const templateWall = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divWall = document.createElement('div');
  const viewWall = `
        <div class="wall">
        <p>Hola ${displayNameData}</p>
        <form id="formPost">
        <textarea name="" id="postArea" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <input type="button" id="btnPost" value="Publicar">
        </form>
        <div id="postList"> 
        </div>
        </div>
        `;

  divWall.innerHTML = viewWall;

  const buttonPost = divWall.querySelector('#btnPost'); // Llamando al boton publicar
  buttonPost.addEventListener('click', () => {
    const formPost = document.querySelector('#postArea').value; // Contenido del textarea
    addCollectionPost(formPost, displayNameData, emailData); //  Agrega el post a firebase
    document.querySelector('#postArea').value = '';
  });

  const divPost = divWall.querySelector('#postList'); // Llamando al div donde se imprimirán los post
  db.collection('post').onSnapshot((querySnapshot) => { // Escuchando colección en firebase para ir imprimiendo los post
    // Vaciando div para que no se repitan los post
    divPost.innerHTML = '';
    querySnapshot.forEach((doc) => {
      divPost.innerHTML += `<div id = "postDiv" class="postDiv">
              <p>${doc.data().userName}</p>
              <textarea class="postArea" readonly="readonly"> ${doc.data().postContent}</textarea>
              <button class="btnCommentary">Comentarios</button>
              <button class="delete">Borrar</button>
              </div>
              <div class="commentDiv">
            </div>`;
    });
  });
  containerRoot.appendChild(divWall);
  // });
};

// db.collection('profile').where('email', '==', 'luzcielm@gmail.coml').get()
// .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, ' => ', doc.data());
//     // const userName = doc.data().userName; // userName del usuario luzcielm@gmail.com
//     // const userEmail = doc.data().email;

// document.querySelectorAll('.postDiv button').forEach((element) => {
//   element.addEventListener('click', () => {
//     const postDiv = document.getElementById('postDiv');
//     const newComment = document.createElement('div');
//     newComment.setAttribute('class', 'newComment');
//     const textComment = document.createElement('textarea');
//     textComment.setAttribute('id', 'textComment');
//     const btnUpComment = document.createElement('button');
//     btnUpComment.setAttribute('id', 'btnUpComment');
//     btnUpComment.setAttribute('class', 'btn');
//     const btnCommentText = document.createTextNode('Comentar');
//     btnUpComment.appendChild(btnCommentText);
//     postDiv.appendChild(newComment);
//     newComment.appendChild(textComment);
//     newComment.appendChild(btnUpComment);

//     postDiv.appendChild(newComment);
//   });
// });
