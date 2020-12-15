import { templateLogIn } from './view/logInAndSignUp/templateLogIn.js';
import { templateSignUp } from './view/logInAndSignUp/templateSignUp.js';
import { templateWall } from './view/wall/templateWall.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = templateLogIn();

  switch (hash) {
    case '':
      containerRoot.innerHTML = templateLogIn();
      break;
    case '#/registro':
      containerRoot.innerHTML = '';
      containerRoot.appendChild(templateSignUp());
      break;
    case '#/muro':
      containerRoot.innerHTML = '';
      containerRoot.appendChild(templateWall());
      break;
    default:
      containerRoot.innerHTML = '<h2>No existe</h2>';
  }
};

export const changeRoute = (hash) => {
  if (hash === '#/') {
    return showTemplate(hash);
  } if (hash === '#/registro') {
    return showTemplate(hash);
  } if (hash === '#/muro') {
    return showTemplate(hash);
  }
  return showTemplate(hash);
};