import { db } from '../../../firebaseConfig.js';
import {
  editPostFb,
  deletePostFb,
  likePostFb,
  singOff,
  postComment,
  getComments,
} from '../../index.js';

const containerModal = document.getElementById('modal'); // seccion HTML para el modal

// <-----Imprimir un elemento en HTML---->
const htmlToElements = (html) => {
  const stencil = document.createElement('template');
  stencil.innerHTML = html; // innerHTML devuelve la sintaxis con los descendientes del elemento.
  return stencil.content.firstChild; // Nodo.firstChild = devuelve el primer hijo del nodo
};

// desaparece la lista de la opcion... editar y borrar al hacer click afuera
window.onclick = (event) => {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i += 1) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// <----------- MODAL borrar------------->
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
  deletePostFb(containerModal.getAttribute('code'));//  para que al eliminar el post sepa que id debe borrar
  containerModal.style.display = 'none';
});

// boton de cancelar en Borrar post
const btnCancelPost = document.getElementById('btnCancelPost');
btnCancelPost.addEventListener('click', () => {
  containerModal.style.display = 'none';
});

// Click (x), cierra el modal borrar
const spanModalClose = document.getElementsByClassName('close')[0];
spanModalClose.onclick = () => {
  containerModal.style.display = 'none';
};

// <----------Contenido del Muro--------->
export const templateWall = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const emailData = currentUserData.email; // Email del usuario que accedio
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio

  const divWall = document.createElement('section');
  const viewWall = `
  <header class="header">
    <div class="header-menu">
      <a href='#/post' class="addPost">
        <img src="imagenes/add.svg" alt="add_Post">
      </a>
      <div class="header-menu-profile">
        <img src="imagenes/user.svg" class="menu-user" alt="User">
        <p id="nameLocal"></p>
        <img src="imagenes/flecha abajo.svg" class="menu-arrow" alt="flecha_Abajo">
      <div>
       <ul>
         <li id="logOut"><a href="/">Cerrar Sesión</a></li>
       </ul>
      </div>
      </div>
    </div>
  </header>
  <div id="postList"> 
  </div>
    `;
  divWall.innerHTML = viewWall; // en la seccion que cree imprimeme el view wall

  // local storage ingresar
  if (typeof (Storage) !== 'undefined') {
    localStorage.setItem('fullNameStorage', displayNameData);
    localStorage.setItem('emailStorage', emailData);
    divWall.querySelector('#nameLocal').innerHTML = `Hola ${localStorage.getItem('fullNameStorage')}`;
  } else {
    divWall.querySelector('#nameLocal').innerHTML = `Hola ${localStorage.getItem('fullNameStorage')}`;
  }

  // cerrar sesion
  const logOut = divWall.querySelector('#logOut'); // boton cerrar sesion
  logOut.addEventListener('click', () => {
    singOff(); // funcion de firebase para cerrar sesion

    // local storage cerrar sesion
    localStorage.removeItem('fullNameStorage');
    localStorage.removeItem('emailStorage');
  });

  // <------Imprimir los cometarios------->
  const divPost = divWall.querySelector('#postList'); // Llamando al div donde se imprimirán los post
  db.collection('post').onSnapshot((querySnapshot) => { // Escuchando colección en firebase para ir imprimiendo los post
    divPost.innerHTML = ''; // Vaciando div para que no se repitan los post
    querySnapshot.forEach((doc) => {
      const imgPost = `<img src="${doc.data().image}" class="img-post"></img>`;
      const optionsEllipsis = `<img src="imagenes/3puntos.svg" alt="opcion" class="dropbtn" id="dropbtn-${doc.id}"></img> `;
      const heartWhite = `<svg class="heart-icon" id="heart-${doc.id}" width="59" height="56" viewBox="0 0 59 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5001 46.6666L50.3959 25.6666V16.3333L41.7917 12.8333L29.5001 16.3333L17.2084 12.8333L8.60425 16.3333V25.6666L29.5001 46.6666Z" fill="white"/>
      <path d="M29.5 18.6667L31.3634 16.3333C33.5169 13.6337 36.7275 11.6667 40.5625 11.6667C42.5658 11.6665 44.5316 12.1827 46.25 13.1602C47.9684 14.1376 49.3749 15.5396 50.3194 17.2166C51.2638 18.8935 51.7108 20.7823 51.6125 22.6815C51.5143 24.5807 50.8746 26.4189 49.7616 28C47.7777 30.814 29.5 49 29.5 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
      <path d="M29.5001 18.6667L27.6367 16.3333C25.4832 13.6337 22.2726 11.6667 18.4376 11.6667C16.4343 11.6665 14.4685 12.1827 12.7501 13.1602C11.0317 14.1376 9.62521 15.5396 8.68076 17.2166C7.73631 18.8935 7.28934 20.7823 7.38758 22.6815C7.48581 24.5807 8.12556 26.4189 9.23853 28C11.2224 30.814 29.5001 49 29.5001 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
    </svg> `;
      const heartGreen = ` <svg class="heart-icon" id="heart-${doc.id}" width="59" height="56" viewBox="0 0 59 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5001 46.6666L50.3959 25.6666V16.3333L41.7917 12.8333L29.5001 16.3333L17.2084 12.8333L8.60425 16.3333V25.6666L29.5001 46.6666Z" fill="#60E440"/>
      <path d="M29.5 18.6667L31.3634 16.3333C33.5169 13.6337 36.7275 11.6667 40.5625 11.6667C42.5658 11.6665 44.5316 12.1827 46.25 13.1602C47.9684 14.1376 49.3749 15.5396 50.3194 17.2166C51.2638 18.8935 51.7108 20.7823 51.6125 22.6815C51.5143 24.5807 50.8746 26.4189 49.7616 28C47.7777 30.814 29.5 49 29.5 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
      <path d="M29.5001 18.6667L27.6367 16.3333C25.4832 13.6337 22.2726 11.6667 18.4376 11.6667C16.4343 11.6665 14.4685 12.1827 12.7501 13.1602C11.0317 14.1376 9.62521 15.5396 8.68076 17.2166C7.73631 18.8935 7.28934 20.7823 7.38758 22.6815C7.48581 24.5807 8.12556 26.4189 9.23853 28C11.2224 30.814 29.5001 49 29.5001 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
    </svg> `;
      divPost.innerHTML += `<div id="postDiv-${doc.id}" class="postDiv">
          <div class="post-identifier">
            <div class="post-name">
              <img src="imagenes/user.svg" alt="User" class="user-Post">
              <p class="user-Name">${doc.data().userName}</p>
            </div>   
            <div class="post-opcion" id="postOpcion">
              <div class="dropdown">
              ${doc.data().email === emailData ? optionsEllipsis : ''}
              <div id="myDropdown-${doc.id}" class="dropdown-content">
                <p id="openEdit-${doc.id}" class="editPost">Editar</p>
                <p id="openDelete-${doc.id}" class="delete">Borrar</p>
              </div>
            </div>
          </div>       
          </div>
          <div class="post-imagen">
          ${doc.data().image === undefined ? '' : imgPost}
          </div>
          <p class="content-post"> <br> ${doc.data().postContent}</p>
          <div class="like">
            ${doc.data().like.includes(emailData) ? heartGreen : heartWhite}
            <p class="number-like">${doc.data().like.length}</p>
            <div class="commet">
            <img src="imagenes/comentar.png" alt="comentar" id="imgComment-${doc.id}" class="comentar-Post">
            </div>
            </div>
            <div id="divComments-${doc.id}" class="div-comments">
            
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
          <section id="modalComments-${doc.id}" class="modal">
            <div class ="modal-comments">
              <span id="closeComment-${doc.id}" class="close">&times;</span>
              <div class="modal-discuss">
                <p class= "modal-commentt"><strong>Escribe un comentario publico...</strong></p>
                <textarea id="discussArea-${doc.id}" class="modal-textarea" cols="30" rows="10"></textarea>
                <div class="modal-btn">
                  <button class="btn-post-edit" id="btncomment-${doc.id}">Publicar</button>
                </div>
              </div>
            </div>
          </section>  
          `;
    });

    querySnapshot.forEach((doc) => {
      const openEdit = document.getElementById(`openEdit-${doc.id}`); // // boton que abre el modal
      const editbutton = document.getElementById(`btnPostEdit-${doc.id}`); // boton que publica la edicion
      const modalEdit = document.getElementById(`modalEdit-${doc.id}`); // seccion que contiene el modal
      const spanModalCloseEdit = document.getElementById(`close-${doc.id}`); // (x) que cierra el modal
      const modalCancel = document.getElementById(`btnCancel${doc.id}`); // boton de cancelar la edicion
      const openDelete = document.getElementById(`openDelete-${doc.id}`);// boton borrar
      const likeImg = document.getElementById(`heart-${doc.id}`); // corazon para el like
      const comments = document.getElementById(`imgComment-${doc.id}`); // icono comentar
      const modalComments = document.getElementById(`modalComments-${doc.id}`);// modal comentar
      const btncomment = document.getElementById(`btncomment-${doc.id}`);// boton publicar el comentario del post
      const closeComment = document.getElementById(`closeComment-${doc.id}`); // X que cierra el modal comentar

    
      const commentBox = document.getElementById(`divComments-${doc.id}`)
      // const commentBox = document.getElementById(`sectionComments-${doc.id}`);//seccion para comentarios dentro del post
      // const userComments = document.getElementById(`userComments-${doc.id}`)//usuario que comenta

      console.log(33333, commentBox)
      // llama a la funcion LIKE
      likeImg.addEventListener('click', () => { 
        likePostFb(doc.id, emailData);
      });

      // Abre el modal para COMENTAR
      modalComments.style.display = 'none';
      comments.addEventListener('click', () => { 
        modalComments.style.display = 'block';
      });
      
      //funcionalidad boton publicar COMENTARIO del post
      btncomment.addEventListener('click', () => {
        const comentario = document.getElementById(`discussArea-${doc.id}`);//text area para comentar
        postComment(comentario.value, displayNameData, doc.id);// funcion comentar
        modalComments.style.display = 'none';
        obtainComments(doc.id, commentBox);
        comentario.value = '';
      });
      obtainComments(doc.id, commentBox);

      // Abre el modal para EDITAR
      openEdit.addEventListener('click', () => {
        console.log('hola comentar');
        modalEdit.style.display = 'block';
      });
      
      // EDITA el post en firebase
      editbutton.addEventListener('click', () => { 
        editPostFb(doc.id, document.getElementById(`postArea-${doc.id}`).value);
      });
      
       // cierra el modal EDITAR (Boton cancelar)
      modalCancel.addEventListener('click', () => {
        modalEdit.style.display = 'none';
      });
      
      // cierra el modal EDITAR en la "X"
      spanModalCloseEdit.onclick = () => { 
        modalEdit.style.display = 'none';
      };
      
      // cierra el modal COMENTARIO en la "X"
      closeComment.onclick = () => { 
      modalComments.style.display = 'none';
      };
      
      // abre el modal ELIMINAR
      openDelete.addEventListener('click', () => { 
        containerModal.style.display = 'block';
        containerModal.setAttribute('code', doc.id); // asigno el valor id a code(es la variable con la que almaceno enel container)
      });

      /* Cuando el usuario hace clic en el icono ...,
       alternar entre ocultar y mostrar el contenido desplegable */
      if (doc.data().email === emailData) {
        const opcionPost = document.querySelector(`#dropbtn-${doc.id}`); // boton de las opciones
        opcionPost.addEventListener('click', () => {
          document.getElementById(`myDropdown-${doc.id}`).classList.toggle('show');
        });
      }
    }); // fin del for 2
  }); // fin de la promesa doc

  containerRoot.appendChild(divWall);
};// final
const obtainComments = (idPost, commentBox) => {
  getComments(idPost).then((array) => {
    commentBox.innerHTML = '';
    array.docs.forEach((doc) => {
      commentBox.innerHTML += ` <div  class="contanierComments" id="contanierComments-${doc.id}"> 
      <div  class="contanierUserComments">
      <img src="imagenes/user.svg" alt="User" class="user-comment">
      <p class="list-comments">${doc.data().usuario}</p>
      </div>
      <div  class="contanierComentsComments">
      <p class="list-comments">${doc.data().comentario}</p>
      </div
      </div>`;
      console.log(doc.data());
    });
  });
};

/* <p id="userComments-${doc.id}"></p>
<p id="sectionComments-${doc.id}"></p> */