// ==========================================================================
// Hermanos Jota — Validaciones compartidas de login / registro / cuenta
// Adaptado de Sprint 2 (rama login-register-micuenta) como ES module, para
// poder importarlo con `import { ... } from "./validaciones.js"` en vez de
// depender de que se cargue como script global.
// ==========================================================================

export function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

export function esTelefonoValido(phone) {
  if (phone === "") return true;

  const digits = phone.replace(/\D/g, "");
  return /^[+]?[-\s\d()]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

export function esPasswordValida(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z\d\s]/.test(password)
  );
}
