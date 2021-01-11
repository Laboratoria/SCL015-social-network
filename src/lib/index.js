// aqui exportaras las funciones que necesites
import { cleanForm } from './view/logInAndSignUp/templateSignUp.js';
import { db } from '../firebaseConfig.js';

// login con google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
    // const token = result.credential.accessToken;
    // La información del usuario que inició sesión.
    const user = result.user;
    console.log('user', user);
    window.location.href = '#/muro';
    // ...
  }).catch((error) => {
    // Maneja los errores aquí.
    // const errorCode = error.code;
    const errorMessage = error.message;
    // Correo electrónico de la cuenta del usuario utilizada
    const email = error.email;
    // El tipo firebase.auth.AuthCredential que se usó.
    const credential = error.credential;
    alert(errorMessage);
    // ...
  });
};

// Registro de usuarios
export const signUpFirebase = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.user.sendEmailVerification();
      alert('Te hemos enviado un correo para confirmar tu cuenta. *Recuerda revisar tu bandeja de spam o correos no deseado');
      window.location.href = '';
    // Signed in
      // signUpForm.reset();
      // reset() restablece los valores de los elementos en un formulario
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      if (errorCode === 'auth/email-already-in-use') {
        alert('Este usuario ya existe');
        cleanForm();
      } else {
        alert('Error');
        cleanForm();
      }
    });
};

export const loginFirebase = (email, password) => {
  console.log('entro');
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// observador de estado de autenticación
export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user', user);
      console.log('existe usuario activo');
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      console.log('no exite usuario activo');
      // User is signed out
      // ...
    }
  });
};

// Funcion que guarda el post en firebase
export const addCollectionPost = (content, pseudonym, emailuser) => {
  db.collection('post').add({
    // agregando los Key que tendra la coleccion post
    postContent: content,
    userName: pseudonym,
    email: emailuser,
    like: [],
    // image: img,
  })
    .then((docRef) => {
      alert('publicado');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      alert(error);
    });
};

// Editar el post en firebase
export const editPostFb = (id, addEdit) => {
  const PostRef = db.collection('post').doc(id);
  return PostRef.update({
    postContent: addEdit,
  })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

// Eliminar post en firebase
export const deletePostFb = (id) => {
  db.collection('post').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// Agregar el like al post
// export const likePostFb = () => {
//   db.collection('post').doc(id).delete().then((query) => {
//     const post = query.data();
//     if (post.like == null || post.like == '') {
//       post.like = [];
//       console.log('ento al like vacio');
//       if (post.like.includes(user.uid)) {
//         for (let i = 0; i < post.like.length; i++) {
//           if (post.like[i] === user.uid) { // verifica si ya el usuario está en el array
//             post.like.splice(i, 1); // sentencia para eliminar un elemento de un array

//             database.collection('post').doc(id).update({ // para actualizar el array
//               like: post.like,
//             });
//           }
//         }
//       }
//     }
//   });
// };
