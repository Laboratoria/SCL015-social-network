import { db } from '../../../firebaseConfig.js';
import { editPostFb, deletePostFb } from '../../index.js';

const containerModal = document.getElementById('modal'); // seccion HTML para el modal
// let likeCounter = 0;
// -----Imprimir un elemento en HTML----
const htmlToElements = (html) => {
  const stencil = document.createElement('template');
  stencil.innerHTML = html; // innerHTML devuelve la sintaxis con los descendientes del elemento.
  return stencil.content.firstChild; // Nodo.firstChild = devuelve el primer hijo del nodo
};

// desaparece la lista de la opcion editar y borrar al hacer click afuera
window.onclick = (event) => {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// ----------- MODAL borrar-------------
containerModal.innerHTML = '';
const modal = htmlToElements(
  `<div class ="modal-content-delete">
        <div class="modal-top">
          <span class="close">&times;</span>
        </div>
          <div class="modal-body-delete">
          <p class= "modal-name"><strong>¿Estas seguro que deseas eliminar esta publicación?</strong></p>
        </div>
        <div class="modal-button">
          <button class="btn-post" id="btnCancelPost">Cancelar</button>
          <button class="btn-post" id="btnDeletePost">Aceptar</button>
        </div>
    </div>`,
);
  // eliminar post
containerModal.appendChild(modal);
const btnDeletePost = document.getElementById('btnDeletePost');
btnDeletePost.addEventListener('click', () => {
  deletePostFb(containerModal.getAttribute('code'));// para que al eliminar el post sepa que id debe borrar
  containerModal.style.display = 'none';
});
// boton de cancelar en eliminar post
const btnCancelPost = document.getElementById('btnCancelPost');
btnCancelPost.addEventListener('click', () => {
  containerModal.style.display = 'none';
});

// Cuando se haga click <span> (x), cierra el modal
const spanModalCloseDelete = document.getElementsByClassName('close')[0];
spanModalCloseDelete.onclick = () => {
  containerModal.style.display = 'none';
};

// <----------Contenido del Muro--------->
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
      <ul>
        <li><a href="/">Perfil</a></li>
        <li><a href="/">Cerrar Sesión</a></li>
      </ul>
      </div>
    </div>
  </header>
  <div id="postList"> 
  </div>
    `;

  divWall.innerHTML = viewWall;

  // <------Imprimir los cometarios------->
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
              <div class="dropdown">
                <img src="imagenes/3puntos.svg" alt="opcion" class="dropbtn" id="dropbtn-${doc.id}">
              <div id="myDropdown-${doc.id}" class="dropdown-content">
                <p id="openEdit-${doc.id}" class="editPost">Editar</p>
                <p id="openDelete-${doc.id}" class="delete">Borrar</p>
              </div>
            </div>
          </div>       
          </div>
          <p class="content-post"> <br> ${doc.data().postContent}</p>
          <div class="like">
            <img src="imagenes/heart.svg" id="heart-${doc.id}" class="heart-icon" alt="">
            <span class="iconify" data-inline="false" data-icon="line-md:heart-twotone" style="color: #60e440;"></span>
            <p id="numberLike-${doc.id}">ooo</p>
            </div>
          </div>
          <section id="modalEdit-${doc.id}" class="modal">
          <div class ="modal-content">
              <div class="modal-top">
                <span id="close-${doc.id}" class="close">&times;</span>
              </div>
              <div class="modal-post">
              <textarea id="postArea-${doc.id}" class="modal-textarea" cols="30" rows="10">${doc.data().postContent}</textarea>
              <div class="modal-btn">
                <button class="btn-post-cancelar" id="btnCancel${doc.id}">Cancelar</button>
                <button class="btn-post-edit" id="btnPostEdit-${doc.id}">Publicar</button>
              </div>
              </div>
            </div>
          </section>  
          `;
    });

    querySnapshot.forEach((doc) => {
      const opcionPost = document.querySelector(`#dropbtn-${doc.id}`); // boton de las opciones

      const openEdit = document.getElementById(`openEdit-${doc.id}`); // // boton que abre el modal
      const editbutton = document.getElementById(`btnPostEdit-${doc.id}`); // boton que publica la edicion
      const modalEdit = document.getElementById(`modalEdit-${doc.id}`); // seccion que contiene el modal

      const spanModalClose = document.getElementById(`close-${doc.id}`); // X que cierra el modal
      const modalCancel = document.getElementById(`btnCancel${doc.id}`); // boton de cancelar la edicion
      const openDelete = document.getElementById(`openDelete-${doc.id}`);// boton borrar

      const likeImg = document.getElementById(`heart-${doc.id}`); // corazon para el like
      let likeCounter = 0;

      likeImg.addEventListener('click', () => {
        document.getElementById(`numberLike-${doc.id}`).innerHTML = ++likeCounter;
      });

      openEdit.addEventListener('click', () => { // Abre el modal para editar
        modalEdit.style.display = 'block';
      });

      editbutton.addEventListener('click', () => { // Edita el post en firebase
        editPostFb(doc.id, document.getElementById(`postArea-${doc.id}`).value);
      });

      modalCancel.addEventListener('click', () => { //  cierra el modal
        modalEdit.style.display = 'none';
      });

      spanModalClose.onclick = () => { //  cierra el modal
        modalEdit.style.display = 'none';
      };

      openDelete.addEventListener('click', () => {
        containerModal.style.display = 'block';
        containerModal.setAttribute('code', doc.id);// asigno el valor id a code(es la variable con la que almaceno enel container)
      });

      /* When the user clicks on the button,
      toggle between hiding and showing the dropdown content */
      opcionPost.addEventListener('click', () => {
        document.getElementById(`myDropdown-${doc.id}`).classList.toggle('show');
      });
    }); // fin del for 2
  }); // fin de la promesa doc
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
