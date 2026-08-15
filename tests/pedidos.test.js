// tests/pedidos.test.js
// Pruebas automatizadas (Node test runner, sin dependencias externas).
// Correr con: npm test   (o: node --test tests/)

import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularPedido, formatearResultado } from "../js/pedidos.js";

test("calcula subtotal, IVA (19%) y total correctamente", () => {
  const pedido = calcularPedido({ platoId: "1", cantidad: 2, precioUnitario: 10 });
  assert.equal(pedido.subtotal, 20);
  assert.equal(pedido.impuesto, 3.8);
  assert.equal(pedido.total, 23.8);
});

test("acepta cantidad y precio como strings (como llegan de un input)", () => {
  const pedido = calcularPedido({ platoId: "1", cantidad: "3", precioUnitario: "5" });
  assert.equal(pedido.subtotal, 15);
});

test("lanza error si no hay plato seleccionado", () => {
  assert.throws(
    () => calcularPedido({ platoId: "", cantidad: 1, precioUnitario: 10 }),
    /inválidos/
  );
});

test("lanza error si la cantidad es 0 o negativa", () => {
  assert.throws(
    () => calcularPedido({ platoId: "1", cantidad: 0, precioUnitario: 10 }),
    /inválidos/
  );
  assert.throws(
    () => calcularPedido({ platoId: "1", cantidad: -2, precioUnitario: 10 }),
    /inválidos/
  );
});

test("formatearResultado arma el texto esperado", () => {
  const texto = formatearResultado({ platoId: "1", subtotal: 20, impuesto: 3.8, total: 23.8 });
  assert.equal(texto, "Pedido: 1 | Subtotal: $20.00 | IVA: $3.80 | Total: $23.80");
});
