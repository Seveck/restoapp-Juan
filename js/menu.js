// js/menu.js
// Responsabilidad única: obtener el menú desde Realtime Database
// y transformarlo a una forma fácil de usar por la UI.
//
// Antes: `menuData` era una variable global (`var menuData = {}`)
// modificada desde cualquier parte del script. Ahora vive encapsulada
// dentro de este módulo y se expone solo a través de funciones.

import { MENU_URL } from "./config.js";

let menuData = {}; // privado del módulo (no es global de window)

/**
 * Descarga el menú y lo normaliza a { id: { name, price } }.
 * Soporta tanto array como objeto, igual que el código original.
 */
export async function fetchMenu() {
  // cache: "no-store" evita que el navegador reutilice una respuesta
  // vieja (sin el plato recién creado) al volver a esta página.
  const res = await fetch(MENU_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();

  menuData = {};

  if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      const id = item.id ?? idx;
      menuData[id] = normalizeItem(item, id);
    });
  } else if (data && typeof data === "object") {
    Object.keys(data).forEach((key) => {
      const item = data[key] || {};
      menuData[key] = normalizeItem(item, key);
    });
  }

  return menuData;
}

function normalizeItem(item, fallbackId) {
  return {
    name: item.name || `Plato ${fallbackId}`,
    price: item.price || item.precio || 0,
  };
}

/** Devuelve el precio de un plato ya cargado (o undefined). */
export function getPrecio(id) {
  return menuData[id]?.price;
}

/** Llena un <select> con las opciones del menú cargado. */
export function pintarSelect(selectEl, placeholder = "--Selecciona plato--") {
  selectEl.innerHTML = `<option value="">${placeholder}</option>`;
  Object.entries(menuData).forEach(([id, item]) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.text = `${item.name} ($${item.price})`;
    selectEl.appendChild(opt);
  });
}
