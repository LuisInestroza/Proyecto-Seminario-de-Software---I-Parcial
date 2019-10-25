import axios from "axios";
import Swal from "sweetalert2";
// import { Result } from "express-validator";

document.addEventListener("DOMContentLoaded", () => {
  // Limpiar las alertas
  let alertas = document.querySelector(".alertas");

  if (alertas) {
    limpiarAlertas(alertas);
  }

  // // Mensaje de gardar registro
  // const guardar = document.getElementById("btnGuardar");
  // if (guardar) {
  //   guardar.addEventListener("click", guardarEstado);
  // }

  // // Mostrar la sumatoria de los totales
  // const suma = document.getElementById("total");
  // if (suma) {
  //   suma.addEventListener("load", sumarTotales);
  // }

  // Eliminar Insumo
  const insumoLista = document.querySelector(".table-hover");
  if (insumoLista) {
    insumoLista.addEventListener("click", accionEliminar);
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

// const guardarEstado = () => {
//   Swal.fire("Guardado", "Usuario Registrado", "success");
// };

// const sumarTotales = () => {
//   const fila = document.querySelectorAll("#insumo tbody tr");
//   const total = 0;

//   fila.forEach(function(e) {
//     const columna = e.querySelectorAll("td");
//     const cantidad = parseFloat(columna[2].textContent);

//     total = cantidad++;

//     const sumatoria = document.querySelectorAll("#insumo tfoot tr td");
//     sumatoria.textContent = total.toFixed(2);
//   });
// };

const accionEliminar = e => {
  e.preventDefault();

  // Verificar que el usuario elimino
  if (e.target.dataset.eliminar) {
    Swal.fire({
      title: "¿Desea eliminar este gasto?",
      text: "No se podra recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        const url = `${location.origin}/insumoEliminar/${e.target.dataset.eliminar}`;

        // Axios haga la petición de eliminación
        axios
          .delete(url, { params: url })
          .then(function(respuesta) {
            if (respuesta.status == 200) {
              Swal.fire("¡Eliminado!", respuesta.data, "success");

              // Eliminar la vacante seleccionada del DOM
              e.target.parentElement.parentElement.parentElement.parentElement.parentElement.removeChild(
                e.target.parentElement.parentElement.parentElement.parentElement
              );
            }
          })
          .catch(() =>
            Swal.fire({
              type: "error",
              title: "Error",
              text: " Hubo un error al eliminar"
            })
          );
      }
    });
  }
};
