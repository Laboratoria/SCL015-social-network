import { db } from '../../../firebaseConfig.js';

export const templateWall = () => {
  const divWall = document.createElement('div');

  const viewWall = ` <input type="text" name="post" id="post">
  <button id="btnPost">publicar</button>
  <button id="btnPost">cancelar</button>
  `;

  divWall.innerHTML = viewWall;

  const btnPost = divWall.querySelector('#btnPost');
  btnPost.addEventListener('click', () => {
    // e.preventDefault();
    const contenerPost = document.querySelector('#post').value;
    console.log('hellooooooooooo');

    db.collection('users').add({
      // console.log("entro en las collection");
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
  return divWall;
};
