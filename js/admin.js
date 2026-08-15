// js/admin.js
// Responsabilidad única: crear productos nuevos en el menú.
//
// Antes: crearProducto() mezclaba la validación de sesión, la
// validación de datos y la llamada a fetch, todo junto y sin
// separar del DOM.
//
// Bug corregido: la API REST de Realtime Database no sabe quién eres
// solo porque tengas sesión iniciada en el SDK de Firebase Auth en el
// navegador — cada petición HTTP tiene que demostrarlo por separado,
// adjuntando el token de sesión (?auth=<idToken>) en la URL. Sin eso,
// las reglas ".write": "auth != null" siempre la rechazan con 401,
// aunque el login haya funcionado perfectamente.

import { MENU_URL } from "./config.js";
import { getIdToken } from "./auth.js";

/** Valida los datos de un producto nuevo antes de enviarlos. */
export function validarProducto({ name, price }) {
  return Boolean(name) && Number(price) > 0;
}

/** Envía el nuevo producto a Realtime Database, autenticado. */
export async function crearProducto({ name, price }) {
  const token = await getIdToken();
  if (!token) throw new Error("No autenticado");

  const url = `${MENU_URL}?auth=${token}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price: Number(price) }),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}
