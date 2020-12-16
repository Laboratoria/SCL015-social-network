// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';
import { templateLogIn } from './lib/view/logInAndSignUp/templateLogIn.js';
import { changeRoute } from './lib/router.js';
import { firebaseConfig } from './firebaseConfig.js';

// document.getElementById('root').innerHTML = templateLogIn();

const init = () => {
  document.getElementById('root').appendChild(templateLogIn());
  //window.location.href=  "/#"
  window.addEventListener('hashchange', () => {
    myFunction();
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init); // cuando se cargue la pantalla llama a init
