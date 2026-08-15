// js/auth.js
// Responsabilidad única: manejar el estado de sesión.
//
// Antes: `isLogged`, `ADMIN_USER` y `ADMIN_PASS` eran variables
// globales de window, y login() comparaba usuario/contraseña como
// texto plano directamente en el navegador (cualquiera podía abrir
// las devtools y leer las credenciales en el código fuente).
//
// Ahora: la validación real ocurre en los servidores de Firebase
// Authentication (signInWithEmailAndPassword). El cliente nunca
// contiene ni compara la contraseña correcta — solo envía lo que el
// usuario escribió y Firebase responde si es válido o no.
//
// Requiere completar TU configuración en js/firebase-config.js
// (ver ese archivo para instrucciones).

import { getFirebaseAuth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const auth = getFirebaseAuth();

/** Intenta iniciar sesión contra Firebase Auth. Lanza Error si falla. */
export async function login(email, pass) {
  await signInWithEmailAndPassword(auth, email, pass);
}

export function logout() {
  return signOut(auth);
}

/** true/false según si hay un usuario autenticado ahora mismo. */
export function isLogged() {
  return auth.currentUser !== null;
}

/**
 * Se suscribe a cambios de sesión (login/logout, incluso al recargar
 * la página o navegar a otra). Reemplaza la lectura manual que antes
 * se hacía de sessionStorage.
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => callback(user !== null));
}

/**
 * Token de sesión que hay que adjuntar a las peticiones REST a
 * Realtime Database para que las reglas ("auth != null") reconozcan
 * quién hace la petición. Sin esto, cada fetch() es "anónimo" para
 * la base de datos aunque el SDK de Auth tenga sesión iniciada.
 * Devuelve null si no hay usuario autenticado.
 */
export async function getIdToken() {
  const user = auth.currentUser;
  return user ? user.getIdToken() : null;
}
