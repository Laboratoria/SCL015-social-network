// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import { iniciarSesion } from './lib/view/templateInciarSesion.js';
// import { registrar } from './lib/view/templateRegistrar.js';
import {changeRoute} from './lib/router.js';
import {firebaseConfig} from './firebaseConfig.js'

// myFunction();
document.getElementById('root').innerHTML = iniciarSesion();
// document.getElementById("root").appendChild(registrar());

const init = () => {
  document.getElementById('root').innerHTML = iniciarSesion();
  window.addEventListener('hashchange', () => {
    myFunction();
    console.log(window.location.hash);
    changeRoute(window.location.hash);
  })
}

window.addEventListener('load', init) //cuando se cargue la pantalla llama a init