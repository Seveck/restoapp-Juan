# CHANGELOG - Refactorización RestoApp

Refactorización del proyecto legacy (`index.html` monolítico) siguiendo
los ejercicios del taller.

## Ejercicio 1 — Convertir a MPA
- Se separó la vista única en varias páginas: `index.html` (inicio),
  `pages/pedido.html`, `pages/login.html`, `pages/admin.html`.
- Se creó `css/styles.css` como hoja de estilos única, enlazada desde
  todas las páginas (antes el CSS estaba embebido y duplicado).
- Se eliminó la regla CSS muerta `.clase_redundante_que_no_se_usa`.

## Ejercicio 2 — Modularizar JavaScript
- Se extrajo la lógica a módulos ES por responsabilidad:
  - `js/config.js` — configuración compartida (URL de Firebase).
  - `js/menu.js` — carga y acceso al menú.
  - `js/pedidos.js` — cálculo de subtotal/IVA/total.
  - `js/auth.js` — validación de credenciales y estado de sesión.
  - `js/admin.js` — creación de productos.
  - `js/*-view.js` — "pegamento" de cada página con el DOM (Ejercicio 5).
- Se eliminaron las variables globales de `window`
  (`items`, `total_global`, `menuData`, `isLogged`, `ADMIN_USER`,
  `ADMIN_PASS`): ahora son variables privadas de cada módulo.

## Ejercicio 3 — Autenticación y seguridad
- Se reemplazó la comparación de credenciales en el cliente
  (`ADMIN_USER`/`ADMIN_PASS` hardcodeadas) por **Firebase
  Authentication** (`signInWithEmailAndPassword`). La contraseña
  correcta ya no existe en ningún archivo del proyecto; la validación
  ocurre en los servidores de Firebase.
- Se agregó `js/firebase-config.js`: requiere que completes tu
  `apiKey` real (ver el archivo, tiene instrucciones) y que crees el
  usuario admin desde Firebase Console → Authentication.
- Se agregó `firebase-rules.json` con reglas para Realtime Database:
  lectura pública de `/menu`, escritura solo si `auth != null`.
  **Pendiente de tu parte:** pegar este contenido en Firebase Console
  → Realtime Database → Rules → Publish (no tengo acceso a tu consola
  para aplicarlo yo).
- `sessionStorage` ya no se usa para la sesión: Firebase Auth mantiene
  la sesión del usuario automáticamente entre páginas y recargas.
- **Fix:** las peticiones REST a Realtime Database (crear producto)
  no llevaban el token de sesión, así que las reglas `auth != null`
  las rechazaban aunque el login funcionara. Se corrigió adjuntando
  `?auth=<idToken>` a la URL en `js/admin.js` (token obtenido con
  `getIdToken()` en `js/auth.js`).
- **Fix:** el menú podía no reflejar un plato recién creado si el
  navegador reutilizaba una respuesta en caché o restauraba la
  página de "pedido" desde bfcache (botón Atrás). Se agregó
  `cache: "no-store"` a la petición en `js/menu.js` y un listener de
  `pageshow` en `js/pedido-view.js` que recarga el menú si la página
  se restaura desde caché.
- Nota sobre el login siempre "autenticado": es el comportamiento
  por defecto de Firebase Auth (`browserLocalPersistence`) — la
  sesión persiste entre cierres de pestaña/navegador hasta hacer clic
  en "Cerrar sesión". No es un bug.

## Ejercicio 4 — Limpieza y pruebas
- Se eliminó el código muerto `funcionObsoletaCalculoAnterior()`.
- Se reemplazaron los `alert("Error en datos")` genéricos por
  mensajes de error más específicos (`Error(...)` con mensaje,
  mostrado en el `<div>` o `alert` correspondiente).
- Los nombres de variables crípticos (`a`, `b`, `p`) se renombraron
  a `platoId`, `cantidad`, `precioUnitario`.
- Se agregaron **pruebas automatizadas** en `tests/` usando el test
  runner nativo de Node (sin dependencias externas):
  `tests/pedidos.test.js` (8 casos: subtotal/IVA/total, strings desde
  inputs, validaciones) y `tests/admin.test.js` (validación de
  producto). Correr con `npm test`.
  (No se agregó test para `auth.js`: ya no tiene lógica local de
  comparación de credenciales que probar — eso es justamente lo que
  se corrigió; ahora la validación depende de Firebase, fuera del
  alcance de un test unitario sin mocks.)

## Ejercicio 5 — Buenas prácticas
- Se separó la lógica de negocio (cálculos, validaciones, fetch) de
  la manipulación del DOM: los módulos `menu.js`, `pedidos.js`,
  `auth.js` y `admin.js` no tocan el DOM; solo los `*-view.js` lo hacen.
- Se agregó manejo de errores con `try/catch` alrededor de las
  llamadas a `fetch`, con mensajes de feedback visibles al usuario.

## Credenciales de acceso (para revisión del profesor)
- Usuario (email): juanmgouveia08@gmail.com
- Contraseña: 7777777crac
- Esta cuenta se creó manualmente en Firebase Console → Authentication
  y es la única habilitada para acceder a la sección de administración
  (`pages/admin.html`).