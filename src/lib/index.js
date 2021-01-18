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
    const errorMessage = error.message;
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

// observador de estado de autenticación
export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('existe usuario activo');
    } else {
      console.log('no exite usuario activo');
    }
  });
};

// Funcion que guarda el post en firebase
export const addCollectionPost = (content, pseudonym, emailuser, img) => {
  db.collection('post').add({
    // agregando los Key que tendra la coleccion post
    postContent: content,
    userName: pseudonym,
    email: emailuser,
    like: [],
    image: img,
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
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};

// Eliminar post en firebase
export const deletePostFb = (id) => {
  db.collection('post').doc(id).delete().then(() => {
  })
    .catch((error) => {
    });
};

// cerrar sesion
export const singOff = () => {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
  });
};

// Agregar el like al post
export const likePostFb = (id, email) => {
  db.collection('post').doc(id).get()
    .then((query) => {
      const post = query.data();
      if (post.like == null || post.like == '') {
        post.like = [];
      }
      if (post.like.includes(email)) {
        for (let i = 0; i < post.like.length; i++) {
          if (post.like[i] === email) { // verifica si ya el usuario está en el array
            post.like.splice(i, 1); // sentencia para eliminar un elemento de un array
            db.collection('post').doc(id).update({ // para actualizar el array
              like: post.like,
            });
          }
        }
      } else {
        post.like.push(email); // incluyeme este usuario en este array
        db.collection('post').doc(id).update({
          like: post.like,
        });
      }
    })
    .catch((error) => {
      console.error('Error like: ', error);
    });
};
