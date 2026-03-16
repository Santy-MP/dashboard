import { initSidebar, initSidebarRight } from "./btnSidebar.js";
import { initCharts } from "./Graficas.js";
import { initTableAndSearch } from "./tablas.js";
import { initFilters } from "./filtros.js";
import { initMetrics } from "./tarjetas.js";
import { initFormLogic } from "./btn-CrearUsuario.js";

document.addEventListener("DOMContentLoaded", () => {
  console.group("🚀 Santy Analytics Dashboard: Inicializando...");

  try {
    initSidebar();
    console.log("✅ Sidebar: Listo");

    initSidebarRight();
    console.log("✅ Sidebar Derecho: Listo");

    initCharts();
    console.log("✅ Gráficas: Renderizadas");

    initTableAndSearch();
    console.log("✅ Tabla y Paginación: Operativas");

    initFilters();
    console.log("✅ Sistema de Filtros: Activo");

    initMetrics();
    console.log("✅ Tarjetas de Métricas: Calculadas");

    initFormLogic();
    console.log("✅ Formulario de Registro: Vinculado");

    console.groupEnd();
    console.log(
      "%c✨ ¡Todo funciona correctamente!",
      "color: #6366f1; font-weight: bold; font-size: 1.2rem;",
    );
  } catch (error) {
    console.groupEnd();
    console.error("❌ Error durante la inicialización:", error);
  }
});

// --- Utility Functions ---
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
