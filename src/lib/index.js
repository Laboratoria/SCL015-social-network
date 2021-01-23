import { db } from '../firebaseConfig.js';

const cleanFormSignUp = () => {
  document.querySelector('#emailSignUp').value = '';
  document.querySelector('#passwordSignUp').value = '';
};

// funcion para limpliar los input LogIn
const cleanFormLogin = () => {
  document.querySelector('#emailLogin').value = '';
  document.querySelector('#passwordLogin').value = '';
};

// login con google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(() => {
    // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
    window.location.href = '#/muro';
  }).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
};

// Registro de usuarios
export const signUpFirebase = (email, password, userName) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userSignUp = firebase.auth().currentUser;
      userSignUp.updateProfile({ // actualiza el perfil del usuario en Firebase
        displayName: userName,
      });
      userSignUp.sendEmailVerification();
      alert('Te hemos enviado un correo para confirmar tu cuenta. *Recuerda revisar tu bandeja de spam o correos no deseado');
      window.location.href = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('Este usuario ya existe');
        cleanFormSignUp();
      } else {
        alert('Error');
        cleanFormSignUp();
      }
    });
};

// Funcion que guarda el perfil del usuario que se registro en firebase
export const addCollectionProfile = (name, pseudonym, emailuser) => {
  db.collection('profile').add({
    fullName: name,
    userName: pseudonym,
    email: emailuser,
  }).then(() => {
  }).catch(() => {
  });
};

// logIn de usuarios existentes
export const loginFb = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      if (user.user.emailVerified === true) { // si hizo la vefiricacion del correo
        window.location.href = '/#/muro';
      } else {
        alert('Por favor confirma tu usuario en el link de verificacion enviado a tu correo');
        cleanFormLogin();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          alert('Aun no estas registrado');
          cleanFormLogin();
          break;
        case 'auth/wrong-password':
          alert('Tu Contraseña es incorrecta');
          cleanFormLogin();
          break;
        case 'auth/invalid-email':
          alert('El correo ingresado no cumple con el formato del email');
          cleanFormLogin();
          break;
        default:
          alert('Error');
      }
    });
};

// observador de estado de autenticación
export const observer = () => {
  firebase.auth().onAuthStateChanged(() => {
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
    .then(() => {
      alert('publicado');
    })
    .catch((error) => {
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
    .catch(() => {
    });
};

// Eliminar post en firebase
export const deletePostFb = (id) => {
  db.collection('post').doc(id).delete().then(() => {
  })
    .catch(() => {
    });
};

// comentar post
export const postComment = (comentario, userId, idPost) => {
  const commentRef = db.collection('post').doc(idPost).collection('comentarios');
  return commentRef.add({
    comentario,
    usuario: userId,
  })
    .then(() => {
    })
    .catch(() => {
    });
};

// obtiene los comentarios de firebase
export const getComments = (idPost) => db.collection(`post/${idPost}/comentarios`).get();

// cerrar sesion
export const singOff = () => {
  firebase.auth().signOut().then(() => {
  }).catch(() => {
  });
};

// Agregar el like al post
export const likePostFb = (id, email) => {
  db.collection('post').doc(id).get()
    .then((query) => {
      const post = query.data();
      if (post.like.includes(email)) {
        for (let i = 0; i < post.like.length; i += 1) { // recorre el array del like
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
    .catch(() => {
    });
};
