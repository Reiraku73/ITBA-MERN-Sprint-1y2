// ==========================================================================
// Hermanos Jota — Inicio de sesión (Login.html)
// Adaptado de Sprint 2 (rama login-register-micuenta). Sin backend: la
// "base de usuarios" es un array en localStorage bajo la key "users",
// creado por Register.html. La sesión activa se guarda en "session".
// ==========================================================================

function initLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;


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

    form.insertBefore(div, form.firstChild);
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) => (user.email || "").toLowerCase() === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("session", JSON.stringify({ email: validUser.email, name: validUser.name }));
      mostrarAlertaDOM("¡Inicio de sesión exitoso! Redirigiendo...", true);
      
      const boton = form.querySelector('button[type="submit"]');
      boton.disabled = true;
      boton.textContent = "Cargando...";

      setTimeout(() => {
        window.location.href = "Cuenta.html";
      }, 1500);
    } else {
      mostrarAlertaDOM("Correo o contraseña incorrectos.", false);
    }
  });
}

document.addEventListener("DOMContentLoaded", initLogin);