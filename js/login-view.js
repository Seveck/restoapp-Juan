// js/login-view.js
// Único responsable de tocar el DOM en pages/login.html.
// La lógica de autenticación real vive en auth.js / Firebase.

import { login, logout, onAuthChange } from "./auth.js";

const userEl = document.getElementById("user");
const passEl = document.getElementById("pass");
const msgEl = document.getElementById("authMsg");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

function pintarEstado(logged) {
  loginBtn.style.display = logged ? "none" : "inline-block";
  logoutBtn.style.display = logged ? "inline-block" : "none";
  if (logged) msgEl.textContent = "Autenticado";
}

loginBtn.addEventListener("click", async () => {
  msgEl.textContent = "Verificando...";
  try {
    // Nota: Firebase Authentication usa correo electrónico, no un
    // "usuario" arbitrario. El campo de usuario debe llevar el email
    // con el que creaste la cuenta admin en Firebase Console.
    await login(userEl.value, passEl.value);
  } catch (err) {
    console.error("Login error:", err);
    msgEl.textContent = "Credenciales inválidas";
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
});

// Se actualiza automáticamente al iniciar/cerrar sesión o al recargar.
onAuthChange(pintarEstado);
