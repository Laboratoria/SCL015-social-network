export const templateWall = () => {
  const divWall = document.createElement('div');

  const viewWall = 
  `<h2> Ya eres un miembro Veg proximamente aqui podras visualizar el MURO con las publicaciones <h2>
  <input name="email" type="email" placeholder="Correo electronico" id="emailLogin2" required>
  <input id="emailAddress" type="email" size="64" maxLength="64" required
          placeholder="nombreusuario@beststartupever.com" pattern=".+@beststartupever.com"
          title="Por favor, solo proporciona una dirección de correoᵉ corporativa que te haya proporcionado">`

  divWall.innerHTML = viewWall;
  return divWall;
};
