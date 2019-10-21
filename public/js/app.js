import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  // Limpiar las alertas
  let alertas = document.querySelector(".alertas");

  if (alertas) {
    limpiarAlertas(alertas);
  }

  // Mensaje de gardar registro
  const guardar = document.getElementById("btnGuardar");
  if (guardar) {
    guardar.addEventListener("click", guardarEstado);
  }
});
const limpiarAlertas = alertas => {
  // Verificar si el div alertas tiene hijos
  const interval = setInterval(() => {
    if (alertas.children.length > 0) {
      alertas.removeChild(alertas.children[0]);
    } else {
      alertas.parentElement.removeChild(alertas);
      clearInterval(interval);
    }
  }, 3000);
};

const guardarEstado = () => {
  Swal.fire("Guardado", "Usuario Registrado", "success");
};
