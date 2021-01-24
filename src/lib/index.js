import { db } from '../firebaseConfig.js';

const heartWhite = `<svg class="heart-icon" width="59" height="56" viewBox="0 0 59 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5001 46.6666L50.3959 25.6666V16.3333L41.7917 12.8333L29.5001 16.3333L17.2084 12.8333L8.60425 16.3333V25.6666L29.5001 46.6666Z" fill="white"/>
      <path d="M29.5 18.6667L31.3634 16.3333C33.5169 13.6337 36.7275 11.6667 40.5625 11.6667C42.5658 11.6665 44.5316 12.1827 46.25 13.1602C47.9684 14.1376 49.3749 15.5396 50.3194 17.2166C51.2638 18.8935 51.7108 20.7823 51.6125 22.6815C51.5143 24.5807 50.8746 26.4189 49.7616 28C47.7777 30.814 29.5 49 29.5 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
      <path d="M29.5001 18.6667L27.6367 16.3333C25.4832 13.6337 22.2726 11.6667 18.4376 11.6667C16.4343 11.6665 14.4685 12.1827 12.7501 13.1602C11.0317 14.1376 9.62521 15.5396 8.68076 17.2166C7.73631 18.8935 7.28934 20.7823 7.38758 22.6815C7.48581 24.5807 8.12556 26.4189 9.23853 28C11.2224 30.814 29.5001 49 29.5001 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
    </svg> `;
const heartGreen = `<svg class="heart-icon" width="59" height="56" viewBox="0 0 59 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5001 46.6666L50.3959 25.6666V16.3333L41.7917 12.8333L29.5001 16.3333L17.2084 12.8333L8.60425 16.3333V25.6666L29.5001 46.6666Z" fill="#60E440"/>
      <path d="M29.5 18.6667L31.3634 16.3333C33.5169 13.6337 36.7275 11.6667 40.5625 11.6667C42.5658 11.6665 44.5316 12.1827 46.25 13.1602C47.9684 14.1376 49.3749 15.5396 50.3194 17.2166C51.2638 18.8935 51.7108 20.7823 51.6125 22.6815C51.5143 24.5807 50.8746 26.4189 49.7616 28C47.7777 30.814 29.5 49 29.5 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
      <path d="M29.5001 18.6667L27.6367 16.3333C25.4832 13.6337 22.2726 11.6667 18.4376 11.6667C16.4343 11.6665 14.4685 12.1827 12.7501 13.1602C11.0317 14.1376 9.62521 15.5396 8.68076 17.2166C7.73631 18.8935 7.28934 20.7823 7.38758 22.6815C7.48581 24.5807 8.12556 26.4189 9.23853 28C11.2224 30.814 29.5001 49 29.5001 49" stroke="#60E440" stroke-width="4" stroke-linecap="round"/>
    </svg> `;

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

const EditUpdate = (id, addEdit) => {
  db.collection('post').doc(id).get()
    .then(() => {
      const textPost = document.getElementById(`contentPost-${id}`);
      textPost.innerHTML = `<br> ${addEdit}`;
    });
};

// Editar el post en firebase
export const editPostFb = (id, addEdit) => {
  const PostRef = db.collection('post').doc(id);
  return PostRef.update({
    postContent: addEdit,
  })
    .then(() => {
      EditUpdate(id, addEdit);
    })
    .catch(() => {
    });
};

// Eliminar post en firebase
export const deletePostFb = (id) => {
  db.collection('post').doc(id).delete().then(() => {
    const divPost = document.getElementById(`postDiv-${id}`);
    divPost.remove(); // elimina el post en el HTML
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

// Funcion para cambiar el numero y el color del Like
const numberLikeUpdate = (idPost, newValue, oldValue) => {
  const numberLike = document.getElementById(`numberLike-${idPost}`);
  numberLike.innerHTML = String(newValue);
  const getHeart = document.getElementById(`heartColor-${idPost}`);
  if (newValue > oldValue) {
    getHeart.innerHTML = heartGreen;
  } else {
    getHeart.innerHTML = heartWhite;
  }
};

// Agregar el like al post
export const likePostFb = (id, email) => {
  db.collection('post').doc(id).get()
    .then((query) => {
      const post = query.data();
      const oldValue = post.like.length;
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
      numberLikeUpdate(id, post.like.length, oldValue);
    })
    .catch(() => {
    });
};
