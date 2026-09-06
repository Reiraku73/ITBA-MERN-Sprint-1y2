# 🪑 Hermanos Jota — E-commerce de Mueblería Artesanal

**Proyecto Final — Sprint 2 — Full Stack Developer**
**ITBA Educación Ejecutiva**

Sitio web de e-commerce para **Hermanos Jota**, una mueblería artesanal argentina.

El proyecto parte de la interfaz desarrollada durante el **Sprint 1** y agrega la capa de interactividad correspondiente al **Sprint 2**, utilizando exclusivamente tecnologías del lado del cliente:

* HTML5
* CSS3
* JavaScript ES6+

La aplicación permite navegar por el catálogo, consultar productos, buscar y filtrar artículos, registrarse e iniciar sesión, agregar productos al carrito, modificar cantidades y conservar el carrito mediante `localStorage`.

> **Importante:** esta versión es un proyecto de frontend y no utiliza backend ni base de datos. La información de productos y usuarios se gestiona localmente en el navegador.

---

## 👥 Equipo

| Integrante                     | GitHub                                                 |
| ------------------------------ | ------------------------------------------------------ |
| **Orodaz Mateo**               | [@Reiraku73](https://github.com/Reiraku73)             |
| **Sacca Jurado Maximo Julian** | [@maximosacca](https://github.com/maximosacca)         |
| **Martin de Achaval**          | [@martindeachaval](https://github.com/martindeachaval) |
| **Tomás Zambrano**             | [@tommyrk](https://github.com/tommyrk)                 |
| **Franco Lugo**                | [@RoBeeBot](https://github.com/RoBeeBot)               |

---

# 📋 Descripción del proyecto

El objetivo del Sprint 2 es transformar la interfaz estática desarrollada durante el Sprint 1 en una experiencia web interactiva utilizando JavaScript.

Para esto se incorporaron:

* Renderizado dinámico de productos.
* Búsqueda y filtrado del catálogo.
* Fichas individuales de productos.
* Carrito de compras funcional.
* Persistencia del carrito.
* Registro e inicio de sesión.
* Gestión de sesión.
* Validación de formularios.
* Menú responsive.
* Interacciones dinámicas mediante eventos.
* Mejoras de accesibilidad.
* Elementos básicos de SEO.

Toda la lógica funciona del lado del cliente y utiliza los datos definidos en JavaScript.

---

# 🎯 Objetivos de aprendizaje

Durante el desarrollo del Sprint 2 se trabajaron los siguientes conceptos:

1. Variables y tipos de datos en JavaScript.
2. Operadores y estructuras de control.
3. Funciones.
4. Arrays y objetos.
5. Manipulación del DOM.
6. Selección y modificación de elementos HTML.
7. Manejo de eventos mediante `addEventListener`.
8. Renderizado dinámico de contenido.
9. Uso de módulos ES (`import` / `export`).
10. Manejo de formularios y validaciones.
11. Uso de `localStorage`.
12. Simulación de una experiencia de compra.
13. Organización del código en diferentes módulos.
14. Trabajo colaborativo utilizando Git y GitHub.

---

# ⚙️ Funcionalidades

## 🏠 Inicio

Archivo:

```text
frontend/src/pages/Home.html
```

Incluye:

* Header con navegación.
* Logo de Hermanos Jota.
* Hero principal.
* Productos destacados cargados dinámicamente.
* Sección informativa sobre la marca.
* Beneficios del servicio.
* Newsletter.
* Footer.
* Navegación responsive.

---

## 🛋️ Catálogo de productos

Archivo:

```text
frontend/src/pages/Productos.html
```

Permite:

* Visualizar todos los productos disponibles.
* Renderizar las tarjetas dinámicamente mediante JavaScript.
* Buscar productos.
* Filtrar resultados.
* Consultar precios.
* Acceder al detalle de cada producto.
* Agregar productos al carrito.

Los datos del catálogo se encuentran en:

```text
frontend/src/data/productos.js
```

---

## 🔍 Detalle de producto

Archivo:

```text
frontend/src/pages/Producto.html
```

Cada producto cuenta con una página de detalle que permite consultar:

* Imagen.
* Nombre.
* Precio.
* Descripción.
* Información del producto.
* Características.
* Cantidad a comprar.
* Acción para agregar al carrito.
* Acceso de contacto mediante WhatsApp.

La información se obtiene a partir del catálogo definido en JavaScript.

---

# 🛒 Carrito de compras

Archivo principal:

```text
frontend/src/pages/Carrito.html
```

La lógica central del carrito se encuentra en:

```text
frontend/src/assets/js/carrito-store.js
```

El carrito es completamente funcional y permite:

* Agregar productos.
* Agregar múltiples unidades.
* Aumentar cantidades.
* Disminuir cantidades.
* Eliminar productos.
* Vaciar el carrito.
* Calcular subtotales.
* Calcular el total.
* Mostrar la cantidad de productos en el header.
* Mantener el carrito al navegar entre páginas.
* Mantener el carrito después de recargar el navegador.

### Persistencia

El carrito utiliza la API `localStorage` del navegador.

Esto permite que el contenido del carrito se conserve aunque el usuario:

* cambie de página;
* recargue el sitio;
* cierre y vuelva a abrir la pestaña.

El estado almacenado contiene las referencias de los productos y sus cantidades, mientras que la información completa de cada producto continúa centralizada en:

```text
frontend/src/data/productos.js
```

---

# 👤 Registro e inicio de sesión

### Registro

Archivo:

```text
frontend/src/pages/Register.html
```

Permite:

* Crear una cuenta.
* Validar los campos del formulario.
* Comprobar el formato del email.
* Validar contraseñas.
* Evitar registros con emails existentes.

### Login

Archivo:

```text
frontend/src/pages/Login.html
```

Permite:

* Iniciar sesión.
* Validar las credenciales almacenadas localmente.
* Mantener la sesión activa.
* Acceder a la página de cuenta.

### Cuenta

Archivo:

```text
frontend/src/pages/Cuenta.html
```

Permite visualizar la información del usuario y cerrar la sesión.

> **Nota:** la autenticación es únicamente una simulación para el proyecto académico. Los usuarios se almacenan en `localStorage` y no existe un sistema de autenticación seguro ni un servidor.

---

# ✉️ Contacto

Archivo:

```text
frontend/src/pages/Contacto.html
```

Incluye:

* Formulario de contacto.
* Campo de nombre.
* Campo de email.
* Campo de mensaje.
* Validación mediante JavaScript.
* Mensajes de estado.
* Información de contacto.
* Acceso a WhatsApp.
* Acceso a Instagram.

---

# 📱 Diseño responsive

El sitio está diseñado para adaptarse a diferentes tamaños de pantalla:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

Se utiliza CSS3 y media queries para adaptar:

* navegación;
* grillas de productos;
* tarjetas;
* formularios;
* carrito;
* imágenes;
* espaciados;
* tipografía.

También se incluye un menú específico para dispositivos móviles:

```text
frontend/src/components/layout/MobileMenu.html
```

---

# ♿ Accesibilidad

Se incorporaron diferentes prácticas básicas de accesibilidad, entre ellas:

* HTML semántico.
* Atributos `alt` en imágenes.
* Etiquetas asociadas a campos de formulario.
* Atributos ARIA cuando son necesarios.
* Estados dinámicos mediante `aria-live`.
* Navegación mediante teclado.
* Indicadores visuales de foco.
* Contraste y jerarquía visual.
* Botones y enlaces con funciones claramente diferenciadas.

---

# 🔎 SEO

El proyecto incluye elementos básicos de optimización para buscadores:

* `meta description`.
* URLs canónicas.
* Open Graph.
* Datos estructurados mediante JSON-LD.
* `robots.txt`.
* `sitemap.xml`.
* Títulos descriptivos.
* Estructura semántica HTML.

Archivos relacionados:

```text
frontend/public/robots.txt
frontend/public/sitemap.xml
```

---

# 🛠️ Stack tecnológico

| Tecnología           | Uso                                                  |
| -------------------- | ---------------------------------------------------- |
| **HTML5**            | Estructura semántica de las páginas                  |
| **CSS3**             | Diseño, responsive y estilos                         |
| **JavaScript ES6+**  | Lógica e interactividad                              |
| **ES Modules**       | Organización del código mediante `import` / `export` |
| **DOM API**          | Renderizado y modificación dinámica                  |
| **LocalStorage API** | Persistencia del carrito, usuarios y sesión          |
| **Git**              | Control de versiones                                 |
| **GitHub**           | Repositorio y trabajo colaborativo                   |

### Tecnologías que NO utiliza esta versión

Esta entrega no requiere:

* React
* TypeScript
* TSX
* Vite
* Next.js
* Node.js
* Express
* MongoDB
* Mongoose
* Redux
* Zustand
* npm packages

La aplicación funciona utilizando JavaScript nativo en el navegador.

---

# 📁 Estructura del proyecto

```text
hermanos-jota-arquitectura-nueva/
│
├── README.md
├── ESTRUCTURA.txt
│
└── frontend/
    │
    ├── index.html
    ├── package.json
    ├── .env.example
    │
    ├── public/
    │   ├── icons/
    │   ├── images/
    │   │   ├── branding/
    │   │   ├── productos/
    │   │   └── relacionadas/
    │   ├── robots.txt
    │   └── sitemap.xml
    │
    └── src/
        │
        ├── assets/
        │   └── js/
        │       ├── carrito-store.js
        │       ├── carrito.js
        │       ├── contacto.js
        │       ├── cuenta.js
        │       ├── home-destacados.js
        │       ├── login.js
        │       ├── main.js
        │       ├── producto-detalle.js
        │       ├── productos-listado.js
        │       ├── register.js
        │       └── validaciones.js
        │
        ├── components/
        │   └── layout/
        │       └── MobileMenu.html
        │
        ├── data/
        │   └── productos.js
        │
        ├── pages/
        │   ├── Home.html
        │   ├── Productos.html
        │   ├── Producto.html
        │   ├── Carrito.html
        │   ├── Cuenta.html
        │   ├── Login.html
        │   ├── Register.html
        │   ├── Contacto.html
        │   ├── Privacidad.html
        │   ├── Terminos.html
        │   └── CambiosDevoluciones.html
        │
        ├── styles/
        │   └── styles.css
        │
        ├── services/
        ├── context/
        ├── hooks/
        ├── types/
        └── utils/
```

Las carpetas `services`, `context`, `hooks`, `types` y algunas carpetas de componentes contienen actualmente archivos `.gitkeep`. Se mantienen como parte de la estructura proyectada para futuras etapas del desarrollo.

---

# 🚀 Cómo ejecutar el proyecto

## Requisitos

No es necesario instalar dependencias.

Solamente se necesita:

* Un navegador moderno.
* Un editor de código, recomendado **Visual Studio Code**.
* Un servidor HTTP local.

### ¿Por qué necesitamos un servidor?

El proyecto utiliza **JavaScript ES Modules** mediante:

```javascript
import ...
```

y:

```javascript
export ...
```

Por lo tanto, se recomienda ejecutar el proyecto mediante `http://localhost` en lugar de abrir directamente los archivos con `file://`.

---

## Opción 1 — Visual Studio Code + Live Server

Es la opción recomendada para desarrollo.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Reiraku73/ITBA-MERN-Sprint-1y2.git
```

### 2. Entrar al proyecto

```bash
cd ITBA-MERN-Sprint-1y2
```

### 3. Abrir el proyecto con Visual Studio Code

```bash
code .
```

### 4. Instalar Live Server

En Visual Studio Code, instalar la extensión:

**Live Server — Ritwick Dey**

### 5. Ejecutar

Abrir:

```text
frontend/src/pages/Home.html
```

Hacer clic derecho sobre el archivo y seleccionar:

```text
Open with Live Server
```

El navegador abrirá automáticamente el proyecto.

---

# 🐍 Opción 2 — Servidor HTTP con Python

Si tenés Python instalado, podés utilizar el servidor HTTP incluido con Python.

Desde la carpeta `frontend`:

```bash
cd frontend
```

Ejecutar:

```bash
python -m http.server 5500
```

En Windows también puede utilizarse:

```bash
py -m http.server 5500
```

Luego abrir en el navegador:

```text
http://localhost:5500/src/pages/Home.html
```

Para detener el servidor:

```text
Ctrl + C
```

---

# 🟢 Opción 3 — Servidor estático mediante Node.js

Node.js **no es necesario** para el proyecto, pero si ya está instalado se puede utilizar un servidor estático.

Por ejemplo:

```bash
npx serve frontend
```

El comando mostrará la dirección local desde la cual acceder al sitio.

---

# 🌐 Páginas disponibles

| Página                    | Ruta                                 |
| ------------------------- | ------------------------------------ |
| 🏠 Inicio                 | `src/pages/Home.html`                |
| 🛋️ Productos             | `src/pages/Productos.html`           |
| 🔍 Producto               | `src/pages/Producto.html`            |
| 🛒 Carrito                | `src/pages/Carrito.html`             |
| 👤 Cuenta                 | `src/pages/Cuenta.html`              |
| 🔐 Login                  | `src/pages/Login.html`               |
| 📝 Registro               | `src/pages/Register.html`            |
| ✉️ Contacto               | `src/pages/Contacto.html`            |
| 🔒 Privacidad             | `src/pages/Privacidad.html`          |
| 📄 Términos               | `src/pages/Terminos.html`            |
| 🔄 Cambios y devoluciones | `src/pages/CambiosDevoluciones.html` |

---

# 🧪 Datos de prueba

Como el proyecto no posee backend, los usuarios y la sesión se almacenan localmente en el navegador.

Para comenzar desde cero, se puede eliminar el almacenamiento local desde las herramientas de desarrollador:

```text
DevTools → Application → Local Storage
```

y eliminar los datos correspondientes al sitio.

Esto permite reiniciar:

* usuarios registrados;
* sesión actual;
* carrito de compras.

---

# 🛒 Flujo de compra

El flujo principal de la aplicación es:

```text
┌─────────────┐
│    Inicio   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Productos  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Detalle   │
│ de producto │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Agregar al  │
│   carrito   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Carrito   │
└──────┬──────┘
       │
       ├──► Modificar cantidad
       │
       ├──► Eliminar producto
       │
       └──► Vaciar carrito
```

---

# 📦 Productos

Los productos están definidos en:

```text
frontend/src/data/productos.js
```

Las imágenes se encuentran en:

```text
frontend/public/images/productos/
```

Entre los productos disponibles se encuentran:

* Silla de Trabajo Belgrano
* Butaca Mendoza
* Mesa Comedor Pampa
* Sillas Córdoba
* Biblioteca Recoleta
* Mesa de Noche Aconcagua
* Sillón Copacabana
* Aparador Uspallata
* Escritorio Costa
* Sofá Patagonia
* Mesa de Centro Araucaria

---

# 💾 Persistencia local

La aplicación utiliza `localStorage` para mantener información entre sesiones del navegador.

Se utilizan datos locales para:

### Carrito

Estado de los productos agregados y sus cantidades.

### Usuarios

Cuentas creadas durante el uso de la aplicación.

### Sesión

Información necesaria para mantener al usuario conectado.

> Esta implementación tiene fines educativos. En una aplicación real, las credenciales y la información de compra deberían gestionarse mediante un backend y almacenarse de manera segura.

---

# 📦 Dependencias

El proyecto no requiere instalación de paquetes.

El JavaScript se ejecuta directamente en el navegador utilizando módulos ES nativos.

Por lo tanto, **no es necesario ejecutar**:

```bash
npm install
```

ni:

```bash
npm run dev
```

---

# 📚 Próximas etapas

La estructura del proyecto está preparada para poder evolucionar hacia una aplicación Full Stack.

Entre las posibles funcionalidades futuras se encuentran:

* Backend con Node.js y Express.
* API REST.
* Base de datos MongoDB.
* Autenticación mediante JWT.
* Hashing de contraseñas.
* Persistencia de usuarios en servidor.
* Persistencia de productos.
* Persistencia del carrito.
* Gestión de órdenes.
* Procesamiento de compras.
* Panel administrativo.
* Migración progresiva hacia React y TypeScript.

Estas funcionalidades **no forman parte de la implementación actual del Sprint 2**.

---

# 📤 Entregables

* [x] Repositorio en GitHub.
* [x] Historial de commits.
* [x] Interfaz desarrollada a partir del Sprint 1.
* [x] Catálogo dinámico.
* [x] Búsqueda y filtrado.
* [x] Detalle de productos.
* [x] Carrito funcional.
* [x] Persistencia mediante `localStorage`.
* [x] Formularios y validaciones.
* [x] Registro e inicio de sesión.
* [x] Diseño responsive.
* [x] Accesibilidad básica.
* [x] SEO básico.
* [x] Documentación mediante README.

---

# 🪑 Hermanos Jota

**Hermanos Jota** es una mueblería artesanal ficticia creada como proyecto académico.

El objetivo del proyecto es desarrollar progresivamente una aplicación de e-commerce, incorporando nuevas tecnologías y funcionalidades a medida que avanza la formación como desarrolladores Full Stack.

---

*Proyecto desarrollado en el marco del curso Full Stack Developer — ITBA Educación Ejecutiva.*
