import { templateLogIn } from './lib/view/logInAndSignUp/templateLogIn.js';
import { changeRoute } from './lib/router.js';

const init = () => {
  document.getElementById('root').appendChild(templateLogIn());// en el html meteme el template login
  window.addEventListener('hashchange', () => { // que la ventana escuche los cambios de has y de acuerdo a eso busca la funcion changerouter
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init); // cuando se cargue la pantalla llama a init eso lo hace load
