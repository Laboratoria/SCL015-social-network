import { templateLogIn } from './view/logInAndSignUp/templateLogIn.js';
import { templateSignUp } from './view/logInAndSignUp/templateSignUp.js';
import { templateWall } from './view/wall/templateWall.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '':
      containerRoot.appendChild(templateLogIn());
      break;
    case '#/registro':
      containerRoot.appendChild(templateSignUp());
      break;
    case '#/muro':
      templateWall(containerRoot);
      break;
    default:
      containerRoot.innerHTML = '<h2>No existe</h2>';
  }
};

export const changeRoute = (hash) => showTemplate(hash); // captura cambio del rotulador
