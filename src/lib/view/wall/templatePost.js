import { addCollectionPost } from '../../index.js';

export const templatePost = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divNewPost = document.createElement('section');
  const viewPost = `
    <header class="header">
      <div class="header-menu">
        <div class="header-menu--profile">
          <img src="imagenes/user.svg" alt="User">
          <p>Hola ${displayNameData}</p>
          <img src="imagenes/flecha abajo.svg" alt="flecha_Abajo">
        </div>
        <ul>
          <li><a href="/">Perfil</a></li>
          <li><a href="/">Cerrar Sesión</a></li>
        </ul>
      </div>
    </header>
    <section class="post">
      <p class="new-post">Nueva Publicación</p>
      <form id="formPost" method="post">
        <textarea id="postArea" class="post-area" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <input type="file" id="myfile" name="myfile" accept="image/png, .jpeg, .jpg, image/gif" />
        <div class="post-form-btn">
          <button class="btn-post" type="submit" id="btnPost">Publicar</button>
          <button class="btn-post" id="btnCancel">Cancelar</button>
        </div>
      </form>
      
    </section>
        `;

  divNewPost.innerHTML = viewPost;

  const buttonPost = divNewPost.querySelector('#formPost'); // Llamando al boton publicar
  buttonPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const formPost = document.querySelector('#postArea').value; // Contenido del textarea
    // const image = document.querySelector('#myfile').value;
    addCollectionPost(formPost, displayNameData, emailData); //  Agrega el post a firebase
    window.history.back();
  });

  const buttonCancel = divNewPost.querySelector('#btnCancel'); // Llamando al boton publicar
  buttonCancel.addEventListener('click', () => {
    window.history.back();
  });

  containerRoot.appendChild(divNewPost);
};
