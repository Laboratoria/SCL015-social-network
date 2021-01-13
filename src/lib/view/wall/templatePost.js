import { addCollectionPost } from '../../index.js';

export const templatePost = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divNewPost = document.createElement('section');
  const viewPost = `
    <header class="header">
      <div class="header-menu">
      <div class="header-menu-profile">
        <img src="imagenes/user.svg" class="menu-user" alt="User">
          <p>Hola ${displayNameData}</p>
          <img src="imagenes/flecha abajo.svg" class="menu-arrow" alt="flecha_Abajo">
          <ul>
            <li><a href="/">Cerrar Sesión</a></li>
          </ul>
        </div> 
      </div>
    </header>
    <section class="post">
      <p class="new-post">Nueva Publicación</p>
      <form id="formPost" method="post">
        <textarea id="postArea" class="post-area" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <input type="file" id="myfile" name="myfile" accept="image/png, .jpeg, .jpg, image/gif" />
        <div class="preview">
         <ol id="list">
           <p>No has cargado imagenes.</p>
          </ol>
        </div>
        <div class="post-form-btn">
          <button class="btn-post" id="btnCancel">Cancelar</button>
          <button class="btn-post" type="submit" id="btnPost">Publicar</button>
        </div>
      </form>
    </section>
        `;

  divNewPost.innerHTML = viewPost;

  const buttonPost = divNewPost.querySelector('#formPost'); // Llamando al boton publicar
  const list = divNewPost.querySelector('#list');
  const image = divNewPost.querySelector('input[type=file]');

  buttonPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const formPost = document.querySelector('#postArea').value; // Contenido del textarea
    addCollectionPost(formPost, displayNameData, emailData); //  Agrega el post a firebase
    window.history.back();
  });

  // image.addEventListener('change', () => {
  image.onchange = () => {
    const file = image.files[0];
    const reader = new FileReader();
    let b64;
    // list.innerHTML = "";
    // Recibira el valor Base64 cada vez que un usuario seleccione un archivo de su dispositivo
    reader.onloadend = (event) => { // El evento loadend es emitido cuando el progreso de la carga de un recurso se ha detenido
      // Dado que contiene el URI de datos debemos eliminar el prefijo y mantener solo la cadena Base64
      b64 = reader.result.replace(/^data:.+;base64,/, '');
      list.innerHTML += `<li>
      <p>File name: ${file.name}</p>
      <img src="${event.target.result}" width="50px">
      </li>`;
      console.log(b64);
    };
    // console.log(2, reader.readAsDataURL(file));
    reader.readAsDataURL(file);
  };

  const buttonCancel = divNewPost.querySelector('#btnCancel'); // Llamando al boton cancelar
  buttonCancel.addEventListener('click', () => {
    window.history.back(); // se va una pagina atras (muro)
  });

  containerRoot.appendChild(divNewPost);
};
