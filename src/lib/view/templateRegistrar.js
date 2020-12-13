import {login} from '../index.js'

export const registrar = () => {
  const divRegistrar = document.createElement('div');

  const viewRegistrar = `
  <h2> Aqui ira el formulario para INICIAR SESION <h2>
  <button id="loginGoogle">Login con google</button>
  `

  divRegistrar.innerHTML = viewRegistrar;

  const bntGoogle= divRegistrar.querySelector("#loginGoogle");
  bntGoogle.addEventListener("click", () => {
    login()
  })

  return divRegistrar;
}