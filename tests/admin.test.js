// tests/admin.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { validarProducto } from "../js/admin.js";

test("rechaza producto sin nombre", () => {
  assert.equal(validarProducto({ name: "", price: 10 }), false);
});

test("rechaza producto con precio 0 o negativo", () => {
  assert.equal(validarProducto({ name: "Arepa", price: 0 }), false);
  assert.equal(validarProducto({ name: "Arepa", price: -5 }), false);
});

test("acepta producto válido", () => {
  assert.equal(validarProducto({ name: "Arepa", price: 3500 }), true);
});
