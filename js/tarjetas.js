import { matriz } from "./Data.js";

export function initMetrics(data = matriz) {
  const updateCard = (id, value) => {
    const span = document.querySelector(`.stat-card[data-id="${id}"] span`);
    if (span) span.textContent = value;
  };

  const total = data.length;

  updateCard("meta1", total);

  const sumaEdad = data.reduce((acc, f) => acc + (f[3] || 0), 0);
  const promedioEdad = total > 0 ? (sumaEdad / total).toFixed(1) : 0;
  updateCard("meta2", promedioEdad);

  const activos = data.filter((f) => f[8] === "Activo").length;
  updateCard("meta3", activos);

  const inactivos = data.filter((f) => f[8] === "Inactivo").length;
  updateCard("meta4", inactivos);

  const sumaSalarios = data.reduce((acc, f) => acc + (f[4] || 0), 0);
  const promedioSalarios =
    total > 0 ? Math.floor(sumaSalarios / total).toLocaleString() : 0;
  updateCard("meta5", `$ ${promedioSalarios}`);

  const maxSalario = total > 0 ? Math.max(...data.map((f) => f[4] || 0)) : 0;
  updateCard("meta6", `$ ${maxSalario.toLocaleString()}`);

  const hombres = data.filter((f) => f[7] === "Masculino").length;
  updateCard("meta7", hombres);

  const mujeres = data.filter((f) => f[7] === "Femenino").length;
  updateCard("meta8", mujeres);
}

export function updateStatusMetrics(data, duplicateCount = 0) {
  const resultadoValor = document.getElementById("resultado-valor");
  const alertaRepetidos = document.getElementById("alerta-repetidos");
  const meta7Span = document.querySelector('.stat-card[data-id="meta7"] span');
  const meta8Span = document.querySelector('.stat-card[data-id="meta8"] span');

  const total = data.length;
  const tieneRepetidos = duplicateCount > 0;

  if (resultadoValor) resultadoValor.textContent = total;
  if (meta7Span) meta7Span.textContent = total;

  if (meta8Span) {
    meta8Span.textContent = tieneRepetidos ? `${duplicateCount} Repetidos` : "Ninguno";
    const card8 = document.querySelector('.stat-card[data-id="meta8"]');
    if (card8) {
      card8.style.borderColor = tieneRepetidos
        ? "var(--accent-rose)"
        : "var(--glass-border)";
    }
  }

  const activos = data.filter((u) => u[8] === "Activo").length;
  const inactivos = data.filter((u) => u[8] === "Inactivo").length;

  const activosEl = document.getElementById("totalActivos");
  const inactivosEl = document.getElementById("totalInactivos");

  if (activosEl) activosEl.textContent = activos;
  if (inactivosEl) inactivosEl.textContent = inactivos;

  if (alertaRepetidos) {
    alertaRepetidos.style.display = tieneRepetidos ? "block" : "none";
  }

  initMetrics(data);
}
