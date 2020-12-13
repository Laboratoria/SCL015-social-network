import { iniciarSesion } from './view/templateInciarSesion.js';
import { registrar } from './view/templateRegistrar.js';
import { muro } from './view/templateMuro.js';

export const changeRoute = (hash) => {
  if(hash === '#/'){
      return showTemplate (hash)
  } else if (hash === '#/registro'){
      return showTemplate (hash)
  } else if (hash ==='#/muro'){
      return showTemplate(hash)
  } else {
    return showTemplate(hash)
  } 
} 

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = iniciarSesion();

  switch (hash) {
    case '#/':
      containerRoot.appendChild(registrar());
      break;
    case '#/registro':
      containerRoot.appendChild(muro());
      break;
    default:
      containerRoot.innerHTML = `<h2>No existe</h2>`
  }
}