// js/pedido-view.js
// Único responsable de tocar el DOM en pages/pedido.html.
// Toda la lógica de negocio vive en menu.js y pedidos.js.

import { fetchMenu, getPrecio, pintarSelect } from "./menu.js";
import { calcularPedido, formatearResultado } from "./pedidos.js";

const selectEl = document.getElementById("plato");
const cantidadEl = document.getElementById("cantidad");
const precioEl = document.getElementById("precio");
const resEl = document.getElementById("res");
const btnEl = document.getElementById("btn");

async function init() {
  try {
    await fetchMenu();
    pintarSelect(selectEl);
  } catch (err) {
    console.error("Error cargando menu:", err);
    selectEl.innerHTML = '<option value="">--Error cargando menú--</option>';
  }
}

selectEl.addEventListener("change", () => {
  const precio = getPrecio(selectEl.value);
  if (precio !== undefined) precioEl.value = precio;
});

btnEl.addEventListener("click", () => {
  try {
    const pedido = calcularPedido({
      platoId: selectEl.value,
      cantidad: cantidadEl.value,
      precioUnitario: precioEl.value,
    });
    resEl.textContent = formatearResultado(pedido);

    selectEl.value = "";
    cantidadEl.value = "";
    precioEl.value = "";
  } catch (err) {
    resEl.textContent = "";
    alert(err.message);
  }
});

init();

// Si el navegador restaura esta página desde su caché (bfcache) al
// volver con el botón "Atrás" —por ejemplo, después de crear un
// plato en admin.html— el script no se vuelve a ejecutar solo, así
// que el menú quedaría desactualizado. Este listener detecta ese
// caso y recarga el menú.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) init();
});
