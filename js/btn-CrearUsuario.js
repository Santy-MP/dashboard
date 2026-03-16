import { matriz, saveData } from "./Data.js";
import { setCurrentData } from "./tablas.js";
import { updateStatusMetrics } from "./tarjetas.js";
import { initCharts } from "./Graficas.js";

// --- 7. Form Logic ---
let lista = [];
export function initFormLogic() {
  const btnAbrir = document.getElementById("btn-crear-cliente");
  const modal = document.getElementById("modalRegistro");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnCerrarX = document.getElementById("btnCerrarX");
  const registroForm = document.getElementById("registroForm");

  if (!btnAbrir || !modal) return;

  const toggleForm = () => {
    modal.classList.toggle("form-visible");
    modal.classList.toggle("form-hidden");

    if (modal.classList.contains("form-visible")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  btnAbrir.addEventListener("click", toggleForm);
  btnCancelar?.addEventListener("click", toggleForm);
  btnCerrarX?.addEventListener("click", toggleForm);

  // Cerrar al hacer click en el overlay
  modal.querySelector(".modal-overlay")?.addEventListener("click", toggleForm);

  registroForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreCompleto = document.getElementById("nombre").value.split(" ");
    const nombre = nombreCompleto[0] || "Sin Nombre";
    const apellido = nombreCompleto.slice(1).join(" ") || "Sin Apellido";
    const edad = parseInt(document.getElementById("edad").value) || 0;
    const nuevoId = matriz.length + 1;

     // Guardar en arrays
    const nuevoRegistro = [nuevoId, nombre, apellido, edad, 0, "2026-03-13", "2026-03-13", "Masculino", "Activo"]; // Datos completos
    matriz.push(nuevoRegistro);
    saveData(); // <--- PERSISTIR EN LOCALSTORAGE

    console.log("Nuevo cliente guardado:", nuevoRegistro);

    // Actualizar UI
    const saveBtn = registroForm.querySelector(".btn-save");
    const originalContent = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i data-lucide="check"></i> Guardado';
    lucide.createIcons();

    // Refrescar componentes globales
    // Actualizamos los datos actuales en tablas.js (que dispara renderTable)
    setCurrentData([...matriz]); 
    updateStatusMetrics([...matriz]);
    initCharts([...matriz]);

    setTimeout(() => {
      toggleForm();
      registroForm.reset();
      saveBtn.innerHTML = originalContent;
      lucide.createIcons();
    }, 600);
  });
}
