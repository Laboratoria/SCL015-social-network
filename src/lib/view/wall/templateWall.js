import { db } from '../../../firebaseConfig.js';
import { editPostFb} from '../../index.js';
import { deletePostFb} from '../../index.js';


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
// const spanModalClose = document.getElementsByClassName('close')[0];
// spanModalClose.onclick = () => {
//   containerModal.style.display = 'none';
// };
};
// <----------Contenido del Muro---------
export const templateWall = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divWall = document.createElement('section');
  const viewWall = `
  <header class="header">
    <div class="header-menu">
      <a href='#/post' class="addPost">
        <img src="imagenes/add.svg" alt="add_Post">
      </a>
      <div class="header-menu-profile">
        <img src="imagenes/user.svg" class="menu-user" alt="User">
        <p>Hola ${displayNameData}</p>
        <img src="imagenes/flecha abajo.svg" class="menu-arrow" alt="flecha_Abajo">
      </div>
      <ul>
        <li><a href="/">Perfil</a></li>
        <li><a href="/">Cerrar Sesión</a></li>
      </ul>
    </div>
  </header>
  <div id="postList"> 
  </div>
    `;

  divWall.innerHTML = viewWall;

  // ------Imprimir los cometarios-------
  const divPost = divWall.querySelector('#postList'); // Llamando al div donde se imprimirán los post
  db.collection('post').onSnapshot((querySnapshot) => { // Escuchando colección en firebase para ir imprimiendo los post
    divPost.innerHTML = ''; // Vaciando div para que no se repitan los post
    querySnapshot.forEach((doc) => {
      divPost.innerHTML += `<div id="postDiv-${doc.id}" class="postDiv">
          <div class="post-identifier">
            <div class="post-name">
              <img src="imagenes/user.svg" alt="User" class="user-Post">
              <p class="user-Name">${doc.data().userName}</p>
            </div>   
            <div class="post-opcion">
              <img src="imagenes/3puntos.svg" alt="opcion" class="opcion">
            </div>       
          </div>
          <p class="content-post"> <br> ${doc.data().postContent}</p>
          <input type="button" id="delete-${doc.id}" class="delete" value="Borrar">
          <input type="button" id="openEdit-${doc.id}" class="editPost" value="Editar">
          </div>
          <div class="commentDiv">
          </div>
          <section id="modalEdit-${doc.id}" class="modal">
          <div class ="modal-content">
              <div class="modal-top">
                <span id="close-${doc.id}" class="close">&times;</span>
              </div>
              <div class="modal-post">
              <textarea id="postArea-${doc.id}" class="post-area" cols="30" rows="10">${doc.data().postContent}</textarea>
              <button class="btn-post-edit" id="btnPostEdit-${doc.id}">Publicar</button>
              <button class="btn-post-cancel" id="btnCancelEdit">Cancelar</button>
              </div>
            </div>
          </section>  
          `;
    });

    querySnapshot.forEach((doc) => {
      const openEdit = document.getElementById(`openEdit-${doc.id}`);
      const editbutton = document.getElementById(`btnPostEdit-${doc.id}`);
      const modalEdit = document.getElementById(`modalEdit-${doc.id}`); // seccion HTML para el modal
      const spanModalClose = document.getElementById(`close-${doc.id}`);
      const deleteP = document.getElementById(`delete-${doc.id}`);

      openEdit.addEventListener('click', () => { // Abre el modal para editar
        modalEdit.style.display = 'block';
      });

      editbutton.addEventListener('click', () => { // Edita el post en farebase
        editPostFb(doc.id, document.getElementById(`postArea-${doc.id}`).value);
      });

      spanModalClose.onclick = () => { //  cierra el modal
        modalEdit.style.display = 'none';
      };

      deleteP.addEventListener('click', () => { 
        deletePostFb(doc.id);
      });
    });

    // -----Modal Editar------

    // -------Boton que abre el Modal Editar post---------
    // const btnEdit = document.querySelectorAll('.editPost'); // llamando a todas las clases deleteDiv
    // for (let i = 0; i < btnEdit.length; i++) {
    //   btnEdit[i].addEventListener('click', () => {
    //     modalEdit.style.display = 'block';
    //     console.log('entro al boton editar');
    //   });
    // }
  });
  containerRoot.appendChild(divWall);
};// final

// const btnDelete = document.querySelectorAll('.delete'); // llamando a todas las clases deleteDiv
// for (let i = 0; i < btnDelete.length; i++) {
//   btnDelete[i].addEventListener('click', () => {
//     const messageDelete = '¿Estas seguro que deseas eliminar esta puplicación?';
//     printModal(messageDelete);
//     containerModal.style.display = 'block';
//   });
// }

// const editPostFirebase = (id, content) => {
//   document.getElementById('postArea').value = content;
//   const AddEdit = document.getElementById('btnPostEdit');

//   AddEdit.onclick = () => {
//     const PostRef = db.collection('post').doc(id);
//     const content = document.getElementById('postArea').value;

//     return PostRef.update({
//       postContent: content,
//     })
//       .then(() => {
//         console.log('Document successfully updated!');
//       })
//       .catch((error) => {
//         // The document probably doesn't exist.
//         console.error('Error updating document: ', error);
//       });
//   };
// };

// const editButton = document.querySelectorAll('.delete');
// editButton.addEventListener('click', () => {
//   document.getElementById(`divPost-${doc.id}`).innerHTML = '<textarea id=\'editTextArea\'></textarea>';
//   document.getElementById('editTextArea').value = doc.data().postContent;
// });

// };

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
