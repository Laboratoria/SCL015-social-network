export const templateWall = () => {
  const divWall = document.createElement('div');

  const viewWall = '<h2> Aqui ira el Muro con los post <h2>';

  divWall.innerHTML = viewWall;
  return divWall;
};
