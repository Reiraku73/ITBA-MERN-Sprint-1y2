// ==========================================================================
// Hermanos Jota — Estado del carrito de compras
//
// Lógica funcional adaptada de CartContext.tsx (hermanos-jota-fullstack):
// agregar / quitar / actualizar cantidad / vaciar, con persistencia y
// contador total de unidades. La adaptamos a este stack (sin React ni
// TypeScript) con dos diferencias deliberadas:
//
//   1) Acá no hay Context ni estado en memoria de un framework: la
//      "fuente de la verdad" es directamente localStorage, y cualquier
//      módulo que necesite enterarse de un cambio se suscribe con
//      `suscribirCarrito(fn)` (un patrón simple de observer, sin
//      dependencias externas).
//   2) En vez de guardar una copia del producto completo en cada ítem
//      (como hace el Context de React), guardamos solo {id, cantidad}
//      y resolvemos nombre/precio/imagen contra data/productos.js al
//      momento de mostrarlos. Es el mismo patrón que ya usan
//      productos-listado.js y producto-detalle.js en este proyecto, y
//      evita que el carrito quede con datos de producto desactualizados.
//
// No hay sincronización con servidor (todavía no hay backend real): el
// carrito es "de invitado" siempre, igual que en la versión con backend
// antes de iniciar sesión.
// ==========================================================================

const STORAGE_KEY = "hermanos-jota-carrito";
const CANTIDAD_MINIMA = 1;
const CANTIDAD_MAXIMA = 10;

const listeners = new Set();

function leerCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // localStorage corrupto, en modo incógnito con storage bloqueado, o
    // JSON inválido: arrancamos con el carrito vacío en vez de romper
    // la página.
    return [];
  }
}

function guardarCarrito(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Si falla (storage lleno, modo incógnito estricto, etc.) el
    // carrito sigue funcionando para esta carga de página; solo no
    // persiste entre recargas.
  }
  listeners.forEach((fn) => fn(items));
}

// Cualquier módulo (main.js para el contador del header, carrito.js para
// la página del carrito) puede suscribirse para re-renderizar apenas
// cambia el carrito, sin importar desde qué pestaña o módulo vino el
// cambio. Devuelve una función para desuscribirse.
export function suscribirCarrito(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function obtenerItemsCarrito() {
  return leerCarrito();
}

export function contarUnidadesCarrito() {
  return leerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

export function agregarAlCarrito(id, cantidad = 1) {
  const items = leerCarrito();
  const existente = items.find((item) => item.id === id);

  if (existente) {
    existente.cantidad = Math.min(existente.cantidad + cantidad, CANTIDAD_MAXIMA);
  } else {
    items.push({ id, cantidad: Math.min(Math.max(cantidad, CANTIDAD_MINIMA), CANTIDAD_MAXIMA) });
  }

  guardarCarrito(items);
  return items;
}

export function actualizarCantidadCarrito(id, cantidad) {
  const items = leerCarrito();
  const item = items.find((i) => i.id === id);
  if (!item) return items;

  item.cantidad = Math.min(Math.max(cantidad, CANTIDAD_MINIMA), CANTIDAD_MAXIMA);
  guardarCarrito(items);
  return items;
}

export function quitarDelCarrito(id) {
  const items = leerCarrito().filter((item) => item.id !== id);
  guardarCarrito(items);
  return items;
}

export function vaciarCarrito() {
  guardarCarrito([]);
}
