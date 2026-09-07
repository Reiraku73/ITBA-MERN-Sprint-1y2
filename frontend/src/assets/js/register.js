// ==========================================================================
// Hermanos Jota — Registro de usuarios (Register.html)
// Adaptado de Sprint 2 (rama login-register-micuenta). Sin backend: guarda
// los usuarios en localStorage ("users"). El email es la clave única.
// ==========================================================================

import { esEmailValido, esTelefonoValido, esPasswordValida } from "./validaciones.js";

function initRegister() {
  const registerForm = document.getElementById("register-form");
  if (!registerForm) return;


  function mostrarAlertaDOM(mensaje, esExito = false) {
    let alertaPrevia = document.getElementById("alerta-dom-sistema");
    if (alertaPrevia) alertaPrevia.remove();

    const div = document.createElement("div");
    div.id = "alerta-dom-sistema";
    div.textContent = mensaje;
    div.style.padding = "1rem";
    div.style.marginBottom = "1.5rem";
    div.style.borderRadius = "4px";
    div.style.fontWeight = "bold";
    div.style.textAlign = "center";
    div.style.backgroundColor = esExito ? "#d4edda" : "#f8d7da";
    div.style.color = esExito ? "#155724" : "#721c24";
    div.style.border = `1px solid ${esExito ? "#c3e6cb" : "#f5c6cb"}`;

    registerForm.insertBefore(div, registerForm.firstChild);
  }

  const registerFields = {
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    password: document.getElementById("password"),
    passwordConfirmation: document.getElementById("password-confirmation"),
  };

  const registerErrors = {
    email: document.getElementById("email-error"),
    phone: document.getElementById("phone-error"),
    password: document.getElementById("password-error"),
    passwordConfirmation: document.getElementById("password-confirmation-error"),
  };

  function validarCampoRegister(nombre) {
    const field = registerFields[nombre];
    let message = "";

    if (nombre === "email" && field.value !== "" && !esEmailValido(field.value.trim())) {
      message = "Ingresá un correo electrónico válido.";
    } else if (nombre === "phone" && !esTelefonoValido(field.value.trim())) {
      message = "Ingresá un teléfono válido, con entre 7 y 15 dígitos.";
    } else if (nombre === "password" && field.value !== "" && !esPasswordValida(field.value)) {
      message = "Usá al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
    } else if (
      nombre === "passwordConfirmation" &&
      field.value !== "" &&
      field.value !== registerFields.password.value
    ) {
      message = "Las contraseñas no coinciden.";
    }

    registerErrors[nombre].textContent = message;
    field.classList.toggle("form-field__input--invalido", message !== "");
    return message === "";
  }

  Object.keys(registerFields).forEach((nombre) => {
    registerFields[nombre].addEventListener("blur", () => validarCampoRegister(nombre));
    registerFields[nombre].addEventListener("input", () => validarCampoRegister(nombre));
    registerFields[nombre].addEventListener("invalid", (evento) => {
      evento.preventDefault();
      validarCampoRegister(nombre);
    });
  });

  registerForm.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!Object.keys(registerFields).every(validarCampoRegister)) {
      return;
    }

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => (user.email || "").toLowerCase() === email);
    if (userExists) {
      mostrarAlertaDOM("El correo electrónico ya está registrado.", false);
      return;
    }

    users.push({ name, lastname, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    mostrarAlertaDOM("Registro exitoso. Ahora podés iniciar sesión.", true);
    
    const boton = registerForm.querySelector('button[type="submit"]');
    boton.disabled = true;
    boton.textContent = "Redirigiendo...";

    setTimeout(() => {
      window.location.href = "Login.html";
    }, 1500);
  });
}

document.addEventListener("DOMContentLoaded", initRegister);