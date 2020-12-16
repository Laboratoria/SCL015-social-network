// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
    const token = result.credential.accessToken;
    // La información del usuario que inició sesión.
    const user = result.user;
    console.log('user', user);
    // ...
  }).catch((error) => {
    // Maneja los errores aquí.
    const errorCode = error.code;
    const errorMessage = error.message;
    // Correo electrónico de la cuenta del usuario utilizada
    const email = error.email;
    // El tipo firebase.auth.AuthCredential que se usó.
    const credential = error.credential;
    console.log('error', errorMessage);
    // ...
  });
};

export const sigUpFirebase = (email, password) => {
  // Acceso de usuarios existentes
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      signUpForm.reset(); // reset() restablece los valores de los elementos en un formulario
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
};

export const loginFirebase = (email, password) =>{
console.log("entro");
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};
