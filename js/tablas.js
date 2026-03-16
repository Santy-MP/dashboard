import { matriz } from "./Data.js";
import { updateStatusMetrics } from "./tarjetas.js";
import { getCookie } from "./storageUtils.js";

export let currentData = [];
export let paginaActual = 1;
export let filasPorPagina = 10;

export function setCurrentData(newData) {
  currentData = newData;
  paginaActual = 1;
  renderTable();
}

export function setFilasPorPagina(val) {
  filasPorPagina = val;
}

export function getBaseData() {
  const role = getCookie("userRole");
  const isRestrictedPage =
    window.location.pathname.includes("Usuarios.html") ||
    window.location.pathname.includes("inicio.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "";

  if (isRestrictedPage) {
    if (role === "superadmin") return [...matriz];
    if (role === "administrador")
      return matriz.filter((row) => row[9] === "Cliente");
    return [];
  }
  return [...matriz];
}

export const renderTable = () => {
  const tbody = document.querySelector("#main-data-table tbody");
  const infoPagina = document.getElementById("infoPagina");
  if (!tbody) return;

  tbody.innerHTML = "";
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;

  const datosPaginados = currentData.slice(inicio, fin);
  const totalPaginas = Math.ceil(currentData.length / filasPorPagina);

  datosPaginados.forEach((fila) => {
    const tr = document.createElement("tr");
    fila.forEach((celda, index) => {
      const td = document.createElement("td");
      // Formato de moneda para la columna de salario (índice 4)
      td.textContent =
        index === 4 && typeof celda === "number"
          ? `$${celda.toLocaleString()}`
          : celda;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  if (infoPagina)
    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas || 1}`;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.disabled = paginaActual === 1;
  if (nextBtn)
    nextBtn.disabled = paginaActual >= totalPaginas || currentData.length === 0;
};

export function initTableAndSearch() {
  const role = getCookie("userRole");
  const isRestrictedPage =
    window.location.pathname.includes("Usuarios.html") ||
    window.location.pathname.includes("inicio.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "";

  if (isRestrictedPage) {
    if (role === "superadmin") {
      // El Super Admin ve a todos (Empleados, Admin, SuperAdmin)
      currentData = [...matriz];
    } else if (role === "administrador") {
      // El Administrador solo ve a los Clientes (índice 9 de la matriz)
      currentData = matriz.filter((row) => row[9] === "Cliente");
    } else {
      currentData = [];
    }
  } else {
    currentData = [...matriz];
  }

  // Eventos de paginación
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    const totalPaginas = Math.ceil(currentData.length / filasPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderTable();
    }
  });

  document.getElementById("prevBtn")?.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderTable();
    }
  });

  renderTable();
  updateStatusMetrics(currentData);
}
