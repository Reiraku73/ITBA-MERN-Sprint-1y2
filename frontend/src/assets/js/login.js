// ==========================================================================
// Hermanos Jota — Inicio de sesión (Login.html)
// Adaptado de Sprint 2 (rama login-register-micuenta). Sin backend: la
// "base de usuarios" es un array en localStorage bajo la key "users",
// creado por Register.html. La sesión activa se guarda en "session".
// ==========================================================================

function initLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

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
      alert("Inicio de sesión exitoso.");
      window.location.href = "Cuenta.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
}

document.addEventListener("DOMContentLoaded", initLogin);
