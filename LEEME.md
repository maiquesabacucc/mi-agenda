# Mi Agenda en el móvil

Mi Agenda como app instalable: la página se publica gratis en **GitHub Pages** y tus datos se guardan en **Firebase** (plan gratuito), con tu correo y contraseña.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app entera |
| `firebase-config.js` | Los datos de conexión con tu proyecto de Firebase (hay que rellenarlo) |
| `firestore.rules` | Las reglas que hacen que solo tu cuenta pueda entrar en los datos |
| `mi-agenda.html` | La versión antigua de Claude, solo de referencia. No se sube a GitHub |
| `manifest.webmanifest`, `sw.js`, `icons/` | Para instalarla en el móvil y abrirla sin conexión |
| `alimentos.json` | Productos de supermercado para la calculadora de menús |
| `mis-datos.json` | **Tus datos** sacados de la versión de Claude. No se sube a GitHub (está en `.gitignore`) |

---

## 1. Crear Firebase (10 minutos, una sola vez)

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Nombre: `mi-agenda`. Google Analytics: desactívalo.
2. **Inicio de sesión**: menú de la izquierda › *Compilación* › **Authentication** › *Comenzar* › **Correo electrónico/contraseña** › activa el primer interruptor › *Guardar*.
3. **Base de datos**: *Compilación* › **Firestore Database** › *Crear base de datos* › ubicación `eur3 (europe-west)` › **modo de producción** › *Crear*.
4. **Reglas**: en Firestore, pestaña **Reglas**. Borra lo que haya, pega el contenido de `firestore.rules` y pulsa **Publicar**.
5. **Conectar la app**: rueda dentada (arriba a la izquierda) › *Configuración del proyecto* › abajo, en *Tus apps*, pulsa el icono **`</>`** (web). Apodo: `Mi Agenda`. **No** marques Firebase Hosting. Pulsa *Registrar app*.
6. Te enseña un bloque con `const firebaseConfig = { apiKey: "...", ... }`. Copia esos valores en `firebase-config.js` (o pégaselos a Claude y lo rellena por ti).

> Esos valores no son una contraseña: cualquier app web de Firebase los lleva a la vista. Lo que protege tus datos son las reglas del paso 4 y tu contraseña.

### Cómo queda protegida

- **Agenda privada:** la **primera cuenta** que entra se queda como dueña. Las reglas del servidor no dejan a ninguna otra cuenta leer ni guardar nada, y en la pantalla de entrada desaparece el botón «Crear mi cuenta».
- Si alguien crea una cuenta igualmente, no puede hacer nada con ella. Puedes borrarla en *Authentication › Users*.
- La contraseña de tu cuenta debe tener **8 caracteres o más**.
- Para cambiar la contraseña o borrar la cuenta, la app te pide la contraseña actual.

## 2. Publicar en GitHub Pages (5 minutos, una sola vez)

1. Abre **GitHub Desktop** › *File* › **Add local repository** › elige esta carpeta. Te dirá que no es un repositorio: pulsa **create a repository** › nombre `mi-agenda` › *Create repository*.
2. En la lista de cambios comprueba que **no** aparece `mis-datos.json`. Abajo a la izquierda escribe `Primera versión` y pulsa **Commit to main**.
3. Pulsa **Publish repository**. **Desmarca** *Keep this code private* (GitHub Pages gratis necesita que el código sea público; tus datos no están en él) › *Publish*.
4. En el navegador ve a `github.com/TU_USUARIO/mi-agenda` › **Settings** › **Pages**. En *Branch* elige `main` y `/ (root)` › **Save**.
5. Espera 1 o 2 minutos y recarga: arriba saldrá la dirección, del tipo `https://TU_USUARIO.github.io/mi-agenda/`.

## 3. Primer uso

**En el ordenador**
1. Abre la dirección de GitHub Pages.
2. Escribe tu correo y una contraseña nueva (8 caracteres o más) y pulsa **Crear mi cuenta**. Desde ese momento la agenda es solo tuya.
3. Baja del todo, pulsa **Mi cuenta y copias de seguridad** y luego **Importar una copia** › elige `mis-datos.json`. Saldrá «Importado: … elementos».
4. En esa misma pantalla, pulsa **Enviarme el correo de verificación** y abre el enlace que te llegue.

**En el iPhone**
1. Abre la dirección en **Safari** (tiene que ser Safari).
2. Botón **Compartir** › **Añadir a pantalla de inicio** › *Añadir*.
3. Ábrela desde el icono del sol y entra con el mismo correo y contraseña.

A partir de aquí usa solo esta versión: lo que apuntes en la de Claude ya no pasa a esta.

---

## Cuando cambie algo de la app

1. Se edita `index.html` (o el archivo que toque) en esta carpeta.
2. En `sw.js` sube el número de `VERSION` (`v1` → `v2`…), para que el móvil coja todo lo nuevo.
3. GitHub Desktop › escribe qué has cambiado › **Commit to main** › **Push origin**. En un par de minutos está en el móvil (ciérrala y vuelve a abrirla).

## Mi cuenta

Abajo del todo, en cualquier pestaña: **Mi cuenta y copias de seguridad**. Ahí tienes:

- el correo con el que has entrado, y si está verificado;
- **Descargar una copia** (en el iPhone abre el menú de compartir: elige *Guardar en Archivos*) e **Importar una copia**;
- **Cambiar la contraseña**;
- **Cerrar sesión**;
- **Borrar mi cuenta y todos mis datos**. No se puede deshacer, y si la borras, la próxima cuenta que se cree será la nueva dueña.

Si olvidas la contraseña, pulsa **He olvidado la contraseña** en la pantalla de entrada.

## Lo siguiente

- Avisos en el móvil al acabar una tarea (iPhone con iOS 16.4 o posterior y la app añadida a la pantalla de inicio).
- Calorías y pasos del reloj a través de Apple Salud y Atajos.
- Despertador de amanecer con la bombilla inteligente.
