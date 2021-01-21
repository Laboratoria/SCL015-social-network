import { singOff } from '../src/lib/indexTesting.js';
// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

describe('cerrar sesion', () => {
  it('Debería cerrar sesión', () => singOff().then((user) => {
    expect(user).toBe(undefined);
  }));
});
