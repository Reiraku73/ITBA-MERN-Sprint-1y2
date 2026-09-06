// ==========================================================================
// Hermanos Jota — Página del carrito (Carrito.html)
// Renderiza la lista de productos agregados (ver carrito-store.js) contra
// el catálogo de data/productos.js, con selector de cantidad y opción de
// quitar. El botón "Agregar al carrito" en sí lo maneja main.js.
// ==========================================================================

import { obtenerProductos } from "../../data/productos.js";
import {
  obtenerItemsCarrito,
  actualizarCantidadCarrito,
  quitarDelCarrito,
  suscribirCarrito,
} from "./carrito-store.js";

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

function crearFilaCarrito(item, producto) {
  return `
    <li class="carrito__item">
      <img
        src="${producto.imagen}"
        alt="${producto.nombre}, ${producto.categoria.toLowerCase()}"
        width="80"
        height="80"
      >
      <div class="carrito__item-info">
        <h2>${producto.nombre}</h2>
        <p class="carrito__item-precio">${formatearPrecio(producto.precio)}</p>
      </div>

      <div class="cantidad-stepper carrito__item-stepper" role="group" aria-label="Cantidad de ${producto.nombre}">
        <button type="button" class="cantidad-stepper__btn" data-accion="restar" data-id="${producto.id}" aria-label="Restar una unidad de ${producto.nombre}">−</button>
        <input
          type="number"
          class="cantidad-stepper__input carrito__item-cantidad"
          data-id="${producto.id}"
          value="${item.cantidad}"
          min="1"
          max="10"
          inputmode="numeric"
          aria-label="Cantidad de ${producto.nombre}"
        >
        <button type="button" class="cantidad-stepper__btn" data-accion="sumar" data-id="${producto.id}" aria-label="Sumar una unidad de ${producto.nombre}">+</button>
      </div>

      <p class="carrito__item-subtotal">${formatearPrecio(producto.precio * item.cantidad)}</p>

      <button
        type="button"
        class="btn btn--secondary carrito__item-quitar"
        data-id="${producto.id}"
        aria-label="Quitar ${producto.nombre} del carrito"
      >
        Quitar
      </button>
    </li>
  `;
}

async function render() {
  const contenedor = document.getElementById("carrito-contenido");
  if (!contenedor) return;

  const items = obtenerItemsCarrito();

  if (items.length === 0) {
    contenedor.innerHTML = `
      <section class="carrito__vacio">
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no agregaste ningún producto. Explorá el catálogo para empezar.</p>
        <a href="Productos.html" class="btn btn--primary">Ver productos</a>
      </section>
    `;
    return;
  }

  let catalogo;
  try {
    catalogo = await obtenerProductos();
  } catch {
    contenedor.innerHTML = `<p class="estado-error">No pudimos cargar tu carrito. Probá recargar la página.</p>`;
    return;
  }

  const filas = items
    .map((item) => {
      const producto = catalogo.find((p) => p.id === item.id);
      return producto ? { item, producto } : null;
    })
    .filter(Boolean);

  if (filas.length === 0) {
    // Los ids guardados ya no existen en el catálogo (por ejemplo, se
    // editó data/productos.js). Tratamos el carrito como vacío en vez
    // de mostrar filas rotas.
    contenedor.innerHTML = `
      <section class="carrito__vacio">
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no agregaste ningún producto. Explorá el catálogo para empezar.</p>
        <a href="Productos.html" class="btn btn--primary">Ver productos</a>
      </section>
    `;
    return;
  }

  const total = filas.reduce((suma, { item, producto }) => suma + producto.precio * item.cantidad, 0);

  contenedor.innerHTML = `
    <h1>Tu carrito</h1>
    <ul class="carrito__lista">
      ${filas.map(({ item, producto }) => crearFilaCarrito(item, producto)).join("")}
    </ul>
    <div class="carrito__resumen">
      <p class="carrito__total">Total: <strong>${formatearPrecio(total)}</strong></p>
      <p class="carrito__checkout-nota">
        El pago en línea todavía no está disponible. Para confirmar tu pedido,
        escribinos por WhatsApp desde el pie de página.
      </p>
      <a href="Productos.html" class="btn btn--secondary">Seguir comprando</a>
    </div>
  `;
}

// Delegación de eventos sobre el contenedor: se agrega una sola vez al
// cargar el módulo, no en cada render (que reemplaza el innerHTML), así
// evitamos ir sumando listeners duplicados en cada cambio de cantidad.
function initEventos() {
  const contenedor = document.getElementById("carrito-contenido");
  if (!contenedor) return;

  contenedor.addEventListener("click", (evento) => {
    const botonCantidad = evento.target.closest(".cantidad-stepper__btn");
    if (botonCantidad) {
      const id = botonCantidad.dataset.id;
      const input = contenedor.querySelector(`.carrito__item-cantidad[data-id="${id}"]`);
      if (!input) return;
      const actual = parseInt(input.value, 10) || 1;
      const nuevaCantidad =
        botonCantidad.dataset.accion === "sumar"
          ? Math.min(actual + 1, 10)
          : Math.max(actual - 1, 1);
      actualizarCantidadCarrito(id, nuevaCantidad);
      return;
    }

    const botonQuitar = evento.target.closest(".carrito__item-quitar");
    if (botonQuitar) {
      quitarDelCarrito(botonQuitar.dataset.id);
    }
  });

  contenedor.addEventListener("change", (evento) => {
    const input = evento.target.closest(".carrito__item-cantidad");
    if (!input) return;
    const valor = Math.min(Math.max(parseInt(input.value, 10) || 1, 1), 10);
    actualizarCantidadCarrito(input.dataset.id, valor);
  });
}

initEventos();
suscribirCarrito(render);
render();
