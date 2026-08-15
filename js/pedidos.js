// js/pedidos.js
// Responsabilidad única: cálculos del pedido (lógica de negocio pura,
// sin tocar el DOM), para que sean fáciles de probar.
//
// Antes: tomarTodo() era una función monolítica que mezclaba lectura
// del DOM, validación, cálculo de impuestos y actualización del DOM
// en un solo bloque, con nombres de variable crípticos (a, b, p).
// También existía funcionObsoletaCalculoAnterior(), código muerto
// que nunca se invocaba: se eliminó.

const IVA = 0.19;

/**
 * Calcula subtotal, impuesto y total de un pedido.
 * Lanza un Error si los datos no son válidos, en vez de usar alert().
 */
export function calcularPedido({ platoId, cantidad, precioUnitario }) {
  cantidad = Number(cantidad);
  precioUnitario = Number(precioUnitario);

  if (!platoId || !(cantidad > 0)) {
    throw new Error("Datos de pedido inválidos");
  }

  const subtotal = cantidad * precioUnitario;
  const impuesto = subtotal * IVA;
  const total = subtotal + impuesto;

  return { platoId, subtotal, impuesto, total };
}

export function formatearResultado({ platoId, subtotal, impuesto, total }) {
  return (
    `Pedido: ${platoId} | Subtotal: $${subtotal.toFixed(2)} | ` +
    `IVA: $${impuesto.toFixed(2)} | Total: $${total.toFixed(2)}`
  );
}
