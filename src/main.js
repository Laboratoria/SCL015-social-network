// Este es el punto de entrada de tu aplicacion
import { templateLogIn } from './lib/view/logInAndSignUp/templateLogIn.js';
import { changeRoute } from './lib/router.js';
import { firebaseConfig } from './firebaseConfig.js';

// document.getElementById('root').innerHTML = templateLogIn();

const init = () => {
  document.getElementById('root').appendChild(templateLogIn());// en el html meteme el template login y 
  //window.location.href=  "/#"
  window.addEventListener('hashchange', () => {//que la ventana escuche los cambios de has y deacuerdo a eso buscame la funcion changerouter
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init); // cuando se cargue la pantalla llama a init eso lo hace load
