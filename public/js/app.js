import Swal from "sweetalert2";
import { agregarUsuario } from "../../controllers/usuarioController";
document.addEventListener("DOMContentLoaded", () => {
  const usuario = document.querySelector(".lg action-1");
  if (usuario) {
    usuario.addEventListener("click", agregarUsuario);
    Swal.fire({
      position: "top-end",
      type: "success",
      title: "Cuenta Registrada",
      showConfirmButton: false,
      timer: 1500
    });
  }
});
