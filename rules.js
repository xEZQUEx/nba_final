// Función pura que calcula el nuevo marcador
// Recibe el puntaje actual y los puntos anotados (2 o 3)
// Devuelve el nuevo total
const calcularNuevoMarcador = (puntajeActual, puntosASumar) => {
  return puntajeActual + puntosASumar;
};

module.exports = { calcularNuevoMarcador };