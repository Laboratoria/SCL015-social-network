import { addCollectionPost } from '../../index.js';

export const templatePost = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divNewPost = document.createElement('div');
  const viewPost = `
        <p>Hola ${displayNameData}</p>
        <div class="post">
        <form id="formPost" method="post">
        <textarea id="postArea" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <button class="btn-post" type="submit" id="btnPost">Publicar</button>
        </form>
        <button class="btn-post" id="btnCancel">Cancelar</button>
        </div>
        `;

  divNewPost.innerHTML = viewPost;

  const buttonPost = divNewPost.querySelector('#formPost'); // Llamando al boton publicar
  buttonPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const formPost = document.querySelector('#postArea').value; // Contenido del textarea
    addCollectionPost(formPost, displayNameData, emailData); //  Agrega el post a firebase
    window.history.back();
  });

  const buttonCancel = divNewPost.querySelector('#btnCancel'); // Llamando al boton publicar
  buttonCancel.addEventListener('click', () => {
    window.history.back();
  });

  containerRoot.appendChild(divNewPost);
};
