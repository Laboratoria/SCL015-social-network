import { db } from '../../../firebaseConfig.js';
// import {em} from '../logInAndSignUp/templateLogIn.js';

export const addCollectionPost = (content, pseudonym, emailuser) => {
  db.collection('post').add({
  // console.log("entro en las collection");
    postContent: content,
    userName: pseudonym,
    email: emailuser,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const templateWall = (containerRoot) => {
  //busca en la data el la inf que tenga como email a luzcielm@gmail.com 
  db.collection('profile').where('email', '==', 'luzcielm@gmail.coml').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        const userName = doc.data().userName; // userName del usuario luzcielm@gmail.com 

        const divWall = document.createElement('div');
        const viewWall = `
        <p>Hola ${userName}</p>
        <form id ="formPost">
        <textarea name="" id="postArea" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
        <button id="btnPost">publicar</button>
        `;
        divWall.innerHTML = viewWall;

        const btnPost = divWall.querySelector('#btnPost');
        btnPost.addEventListener('click', () => {
          // e.preventDefault();
          const contenerPost = document.querySelector('#post').value;
          console.log('hellooooooooooo');
        });

        containerRoot.appendChild(divWall);
      });
    });
};
