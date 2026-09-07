// ==========================================================================
// Hermanos Jota — Mi cuenta (Cuenta.html)
// Adaptado de Sprint 2 (rama login-register-micuenta). Sin backend: lee la
// sesión y la lista de usuarios de localStorage. Si no hay sesión activa,
// redirige a Login.html.
// ==========================================================================

import { esEmailValido, esTelefonoValido, esPasswordValida } from "./validaciones.js";

function initCuenta() {
  const contenedor = document.getElementById("cuenta-form");
  if (!contenedor) return;

  
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

    contenedor.insertBefore(div, contenedor.firstChild);
    

    if (esExito) {
      setTimeout(() => {
        const msg = document.getElementById("alerta-dom-sistema");
        if (msg) msg.remove();
      }, 3000);
    }
  }

  const session = JSON.parse(localStorage.getItem("session"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = session && users.find((user) => user.email === session.email);

  if (!currentUser) {
    window.location.href = "Login.html";
    return;
  }

  const accountForm = contenedor;
  const editButton = document.getElementById("editar-cuenta");
  const logoutButton = document.getElementById("cerrar-sesion");
  const cancelButton = document.getElementById("cancelar-edicion");
  const actions = document.getElementById("cuenta-acciones");
  const passwordSection = document.getElementById("cuenta-password");
  const fields = {
    name: document.getElementById("cuenta-nombre"),
    lastname: document.getElementById("cuenta-apellido"),
    email: document.getElementById("cuenta-email"),
    phone: document.getElementById("cuenta-telefono"),
    currentPassword: document.getElementById("cuenta-password-actual"),
    newPassword: document.getElementById("cuenta-password-nueva"),
    repeatedPassword: document.getElementById("cuenta-password-repetida"),
  };

  const showUserData = () => {
    fields.name.value = currentUser.name || "";
    fields.lastname.value = currentUser.lastname || "";
    fields.email.value = currentUser.email || "";
    fields.phone.value = currentUser.phone || "";
    fields.currentPassword.value = "";
    fields.newPassword.value = "";
    fields.repeatedPassword.value = "";
  };

  const setEditing = (isEditing) => {
    Object.values(fields).forEach((field) => {
      field.readOnly = !isEditing;
    });
    fields.email.readOnly = true;
    fields.email.disabled = true;
    actions.hidden = !isEditing;
    passwordSection.hidden = !isEditing;
    editButton.hidden = isEditing;
    

    const alerta = document.getElementById("alerta-dom-sistema");
    if (!isEditing && alerta) alerta.remove();
  };

  editButton.addEventListener("click", () => setEditing(true));

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "Login.html";
  });

  cancelButton.addEventListener("click", () => {
    showUserData();
    setEditing(false);
  });

  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentUser.name = fields.name.value.trim();
    currentUser.lastname = fields.lastname.value.trim();
    currentUser.phone = fields.phone.value.trim();

    if (!esEmailValido(currentUser.email)) {
      mostrarAlertaDOM("El correo electrónico actual no es válido.", false);
      return;
    }

    if (!esTelefonoValido(currentUser.phone)) {
      mostrarAlertaDOM("Ingresá un teléfono válido, con entre 7 y 15 dígitos.", false);
      return;
    }

    const passwordValues = [
      fields.currentPassword.value,
      fields.newPassword.value,
      fields.repeatedPassword.value,
    ];
    const changingPassword = passwordValues.some((value) => value !== "");

    if (changingPassword && passwordValues.some((value) => value === "")) {
      mostrarAlertaDOM("Completá la contraseña actual y los dos campos de la nueva contraseña.", false);
      return;
    }

    if (changingPassword && fields.currentPassword.value !== currentUser.password) {
      mostrarAlertaDOM("La contraseña actual es incorrecta.", false);
      return;
    }

    if (changingPassword && fields.newPassword.value !== fields.repeatedPassword.value) {
      mostrarAlertaDOM("Las nuevas contraseñas no coinciden.", false);
      return;
    }

    if (changingPassword && !esPasswordValida(fields.newPassword.value)) {
      mostrarAlertaDOM(
        "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
        false
      );
      return;
    }

    if (changingPassword) {
      currentUser.password = fields.newPassword.value;
    }

    const userIndex = users.findIndex((user) => user.email === currentUser.email);
    users[userIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "session",
      JSON.stringify({ email: currentUser.email, name: currentUser.name })
    );

    showUserData();
    setEditing(false);
    mostrarAlertaDOM("Los datos se actualizaron correctamente.", true);
  });

  showUserData();
}

document.addEventListener("DOMContentLoaded", initCuenta);