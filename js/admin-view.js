// js/admin-view.js
// Único responsable de tocar el DOM en pages/admin.html.

import { onAuthChange } from "./auth.js";
import { validarProducto, crearProducto } from "./admin.js";

const noAuthEl = document.getElementById("noAuth");
const formEl = document.getElementById("productForm");
const nameEl = document.getElementById("newName");
const priceEl = document.getElementById("newPrice");
const msgEl = document.getElementById("prodMsg");
const crearBtn = document.getElementById("crearBtn");

onAuthChange((logged) => {
  noAuthEl.style.display = logged ? "none" : "block";
  formEl.style.display = logged ? "block" : "none";
});

crearBtn.addEventListener("click", async () => {
  const producto = { name: nameEl.value, price: priceEl.value };

  if (!validarProducto(producto)) {
    msgEl.style.color = "darkred";
    msgEl.textContent = "Datos inválidos";
    return;
  }

  try {
    // Firebase valida en el servidor (ver firebase-rules.json) que
    // solo un usuario autenticado pueda escribir en /menu, así que
    // ya no dependemos de una bandera local `isLogged`.
    await crearProducto(producto);
    msgEl.style.color = "green";
    msgEl.textContent = "Producto creado";
    nameEl.value = "";
    priceEl.value = "";
  } catch (err) {
    console.error("Crear producto error:", err);
    msgEl.style.color = "darkred";
    msgEl.textContent = "Error creando producto (¿sigues autenticado?)";
  }
});
