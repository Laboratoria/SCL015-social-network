import { signUpFirebase, singOff } from '../src/lib/indexTesting.js';

describe('Registro con correo y contraseña', () => {
  it('debería ser una función', () => {
    expect(typeof signUpFirebase).toBe('function');
  });
});

describe('cerrar sesion', () => {
  it('debería ser una función', () => {
    expect(typeof singOff).toBe('function');
  });
});
