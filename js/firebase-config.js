// js/firebase-config.js
//
// Configuración de tu proyecto Firebase (restoapp-7bf71).
//
// Nota: el apiKey de un proyecto Firebase para web NO es secreto —
// está pensado para ser público (la seguridad real la dan las Reglas
// de la base de datos, ver ../firebase-rules.json). No es lo mismo
// que la contraseña de un usuario.
//
// Aún te falta, en Firebase Console → Authentication:
//   1. Habilitar el proveedor "Correo electrónico/contraseña".
//   2. Crear manualmente el usuario admin (pestaña "Users" → "Add user").
// Y en Firebase Console → Realtime Database → Rules:
//   3. Pegar el contenido de firebase-rules.json y publicar.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi6LAuqj_89NiFjNRLof00OZCHH2E_Czs",
  authDomain: "restoapp-7bf71.firebaseapp.com",
  databaseURL: "https://restoapp-7bf71-default-rtdb.firebaseio.com",
  projectId: "restoapp-7bf71",
  storageBucket: "restoapp-7bf71.firebasestorage.app",
  messagingSenderId: "356951611365",
  appId: "1:356951611365:web:880bced6d825454612010c",
  measurementId: "G-KPL9RZ3YPC",
};

export function getFirebaseAuth() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}
