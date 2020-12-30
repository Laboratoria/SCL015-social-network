import { db } from '../../../firebaseConfig.js';
// import {em} from '../logInAndSignUp/templateLogIn.js';

const containerModal = document.getElementById('modal'); // seccion HTML para el modal
// -----Imprimir un elemento en HTML----
const htmlToElements = (html) => {
  const stencil = document.createElement('template');
  stencil.innerHTML = html; // innerHTML devuelve la sintaxis con los descendientes del elemento.
  return stencil.content.firstChild; // Nodo.firstChild = devuelve el primer hijo del nodo
};
// ----------- MODAL-------------
export const printModal = (message) => {
  containerModal.innerHTML = '';
  const modal = htmlToElements(
    `<div class ="modal-content">
        <div class="modal-top">
          <span class="close">&times;</span>
        </div>
          <div class="modal-body">
          <p class= "modal-name"><strong>${message}</strong></p>
        </div>
        <div class="modal-button">
          <button class="btn-post" id="btnPost">Aceptar</button>
          <button class="btn-post" id="btnCancel">Cancelar</button>
        </div>
    </div>`,
  );
  containerModal.appendChild(modal);

  // Cuando se haga click <span> (x), cierra el modal
  const spanModalClose = document.getElementsByClassName('close')[0];
  spanModalClose.onclick = () => {
    containerModal.style.display = 'none';
  };
};

// <----------Contenido del Muro---------
export const templateWall = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divWall = document.createElement('div');
  const viewWall = `
    <div class="wall-top">
    <p>Hola ${displayNameData}</p>
    <a href='#/post'>
        <input type="button" id="New" value="Nueva Publicación">
    </a>
    <div id="postList"> 
    </div>
    </div>
    `;

  divWall.innerHTML = viewWall;

  // ------Imprimir los cometarios-------
  const divPost = divWall.querySelector('#postList'); // Llamando al div donde se imprimirán los post
  db.collection('post').onSnapshot((querySnapshot) => { // Escuchando colección en firebase para ir imprimiendo los post
    divPost.innerHTML = ''; // Vaciando div para que no se repitan los post
    querySnapshot.forEach((doc) => {
      divPost.innerHTML += `<div id = "postDiv" class="postDiv">
          <div class="post-identifier"
            <p>${doc.data().userName}</p>
          </div>
          <p class="content-post"> <br> ${doc.data().postContent}</p>
          <input type="button" class="delete" value="Borrar">
          <input type="button" id="btnEdit" class="editPost" value="Editar">
          </div>
          <div class="commentDiv">
          </div>`;

      // -----Modal Editar------
      const printModalEdit = () => {
        containerModal.innerHTML = '';
        const modal = htmlToElements(
          `<div class ="modal-content-edit">
                      <div class="modal-top">
                        <span class="close">&times;</span>
                      </div>
                      <div class="modal-post">
                      <textarea id="postArea" cols="30" rows="10">${doc.data().postContent}</textarea>
                      <button class="btn-post-edit" onclick="editPostFirebase('${doc.id}','${doc.data().postContent}')" id="btnPostEdit">Publicar</button>
                      <button class="btn-post-cancel" id="btnCancelEdit">Cancelar</button>
                      </div>
                  </div>`,
        );
        containerModal.appendChild(modal);

        // Cuando se haga click <span> (x), cierra el modal
        const spanModalClose = document.getElementsByClassName('close')[0];
        spanModalClose.onclick = () => {
          containerModal.style.display = 'none';
        };
      };

      // -------Boton que abre el Modal Editar post---------
      const btnEdit = document.querySelectorAll('.editPost'); // llamando a todas las clases deleteDiv
      for (let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].addEventListener('click', () => {
          printModalEdit();
          containerModal.style.display = 'block';
        });
      }

      const editPostFirebase = (id, content) => {
        document.getElementById('postArea').value = content;
        const AddEdit = document.getElementById('btnPostEdit');

        AddEdit.onclick = () => {
          const PostRef = db.collection('post').doc(id);
          const content = document.getElementById('postArea').value;

          return PostRef.update({
            postContent: content,
          })
            .then(() => {
              console.log('Document successfully updated!');
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error('Error updating document: ', error);
            });
        };
      };
    });

    // const btnDelete = document.querySelectorAll('.delete'); // llamando a todas las clases deleteDiv
    // for (let i = 0; i < btnDelete.length; i++) {
    //   btnDelete[i].addEventListener('click', () => {
    //     const messageDelete = '¿Estas seguro que deseas eliminar esta puplicación?';
    //     printModal(messageDelete);
    //     containerModal.style.display = 'block';
    //   });
    // }
  });
  containerRoot.appendChild(divWall);
}; // final

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
