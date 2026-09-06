// ==========================================================================
// Hermanos Jota — JavaScript principal
// Sprint 2 · Módulo 11
//
// Módulo cargado como ES module (<script type="module">), lo que permite
// usar import/export nativo sin bundler ni librerías externas.
// ==========================================================================

import { productos } from "../../data/productos.js";
import { agregarAlCarrito, contarUnidadesCarrito, suscribirCarrito } from "./carrito-store.js";

const liveRegion = document.getElementById("live-region");

function anunciar(mensaje) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  // Forzamos un reflow para que lectores de pantalla anuncien mensajes
  // repetidos (ej. agregar el mismo producto dos veces seguidas).
  requestAnimationFrame(() => {
    liveRegion.textContent = mensaje;
  });
}

// --------------------------------------------------------------------------
// Menú mobile
// --------------------------------------------------------------------------
function initMenuMobile() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("primary-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(abierto));
    toggle.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  });

  // Cerrar el menú al navegar (mejor experiencia en mobile)
  menu.addEventListener("click", (evento) => {
    if (evento.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// --------------------------------------------------------------------------
// Año del footer
// --------------------------------------------------------------------------
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

// --------------------------------------------------------------------------
// Carrito
//
// Persistencia real vía localStorage (ver carrito-store.js — lógica
// adaptada del carrito de hermanos-jota-fullstack). El contador del
// header se actualiza solo al cargar la página y cada vez que cambia el
// carrito desde cualquier módulo (por ejemplo, al quitar un producto
// desde carrito.js en Carrito.html).
//
// Usa delegación de eventos sobre document para el botón "Agregar al
// carrito": así funciona tanto con las tarjetas ya presentes en el HTML
// como con las que se generan dinámicamente después (Productos.html,
// Producto.html), sin importar el orden en que cada módulo termine de
// correr.
// --------------------------------------------------------------------------
function actualizarBadgeCarrito() {
  const contador = document.querySelector(".cart-count");
  const linkCarrito = document.querySelector(".header__cart");
  if (!contador) return;

  const total = contarUnidadesCarrito();
  contador.textContent = String(total);
  linkCarrito?.setAttribute(
    "aria-label",
    `Carrito de compras, ${total} producto${total === 1 ? "" : "s"}`
  );
}

function initCarrito() {
  actualizarBadgeCarrito();
  suscribirCarrito(actualizarBadgeCarrito);

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".producto-card__cta");
    if (!boton) return;

    const id = boton.dataset.id;
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    // En la ficha de producto hay un selector de cantidad; en las
    // tarjetas de grilla (Home, listado) no, así que por defecto es 1.
    const inputCantidad = boton
      .closest(".producto-detalle__info")
      ?.querySelector("#cantidad-input");
    const cantidad = inputCantidad ? parseInt(inputCantidad.value, 10) || 1 : 1;

    agregarAlCarrito(id, cantidad);

    anunciar(
      cantidad === 1
        ? `${producto.nombre} agregado al carrito.`
        : `${cantidad} unidades de ${producto.nombre} agregadas al carrito.`
    );
  });
}

// --------------------------------------------------------------------------
// Newsletter
// --------------------------------------------------------------------------
function initNewsletter() {
  const form = document.querySelector(".newsletter__form");
  if (!form) return;

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const input = form.querySelector("#newsletter-email");
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const email = input.value;
    form.innerHTML = "";

    const mensaje = document.createElement("p");
    mensaje.className = "newsletter__confirmacion";
    mensaje.append("¡Gracias! Vas a recibir nuestras novedades en ");
    const destacado = document.createElement("strong");
    destacado.textContent = email;
    mensaje.append(destacado, ".");
    form.append(mensaje);

    anunciar("Suscripción al newsletter confirmada.");
  });
}

// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMenuMobile();
  initFooterYear();
  initCarrito();
  initNewsletter();
});
