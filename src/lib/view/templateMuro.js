export const muro = () => {
  const divMuro = document.createElement('div');

  const viewMuro = `<h2> Aqui ira el MURO con los post <h2>`

  divMuro.innerHTML = viewMuro;
  return divMuro;
}