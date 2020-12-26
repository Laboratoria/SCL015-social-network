import { db } from '../../../firebaseConfig.js';
// import {em} from '../logInAndSignUp/templateLogIn.js';

// Funcion que guarda el post en firebase
export const addCollectionPost = (content, pseudonym, emailuser) => {
  db.collection('post').add({
    // agregando los Key que tendra la coleccion post
    postContent: content,
    userName: pseudonym,
    email: emailuser,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      window.location.href = '/#/muro';
      alert('publicado');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      alert(error);
    });
};

// contenido del muro
export const templateWall = (containerRoot) => {
  // busca en la data UserName que tenga como email a luzcielm@gmail.com
  db.collection('profile').where('email', '==', 'luzcielm@gmail.coml').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        const userName = doc.data().userName; // userName del usuario luzcielm@gmail.com
        const userEmail = doc.data().email;

        const divWall = document.createElement('div');
        const viewWall = `
        <div class="wall">
        <p>Hola ${userName}</p>
        <form id="formPost">
        <textarea name="" id="postArea" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <input type="button" id="btnPost" value="Publicar">
        </form>
        <div id="postList"> 
        <p>hola</p>
        </div>
        </div>
        `;
        divWall.innerHTML = viewWall;

        const buttonPost = divWall.querySelector('#btnPost'); // llamando al boton publicar
        buttonPost.addEventListener('click', () => {
          const formPost = document.querySelector('#postArea').value; // contenido del textarea
          addCollectionPost(formPost, userName, userEmail); // Agregando el post al firebase
        });

        // llamando al div donde se imprimirán los post
        const divPost = divWall.querySelector('#postList');
        // escuchando colección en firebase para ir imprimiendo
        db.collection('post').onSnapshot((querySnapshot) => {
          // vaciando div para que no se repitan los post
          divPost.innerHTML = '';
          querySnapshot.forEach((doc) => {
            divPost.innerHTML += `<div id = "postDiv" class="postDiv">
              <textarea class="postArea" readonly="readonly"> ${doc.data().postContent}</textarea>
              <button class="btnCommentary">Comentarios</button>
              <button class="delete">Borrar</button>
              </div>
              <div class="commentDiv">
            </div>`;
          });
        });
        containerRoot.appendChild(divWall);
      });
    });
};

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
