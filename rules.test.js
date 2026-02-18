const { calcularNuevoMarcador } = require('./rules');

describe('calcularNuevoMarcador', () => {

  test('si tengo 10 puntos y anoto una canasta de 2, el resultado debe ser 12', () => {
    const resultado = calcularNuevoMarcador(10, 2);
    expect(resultado).toBe(12);
  });

  test('si tengo 10 puntos y anoto un triple de 3, el resultado debe ser 13', () => {
    const resultado = calcularNuevoMarcador(10, 3);
    expect(resultado).toBe(13);
  });

});