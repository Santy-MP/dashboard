// --- Global State & Data ---
const matriz = [
  [1, "Joseph", "Cadena", 25, 1000000],
  [2, "Ana", "Diaz", 58, 2000000],
  [3, "Sebastio", "Morales", 19, 3000000],
  [4, "Joseph", "Cadena", 25, 4000000],
  [5, "Ana", "Diaz", 58, 5000000],
  [6, "Sebastio", "Morales", 19, 60000],
  [7, "Joseph", "Cadena", 25, 7000000],
  [8, "Ana", "Diaz", 28, 8000000],
  [9, "Sebastio", "Morales", 19, 9000000],
  [10, "Santiago", "Cadena", 25, 9999999999],
  [11, "Ana", "Diaz", 28, 11000000],
  [12, "Sebastio", "Morales", 19, 12000000],
  [13, "Joseph", "Cadena", 25, 13000000],
  [14, "Ana", "Diaz", 28, 14000000],
  [15, "Sebastio", "Morales", 19, 15000000],
  [16, "Joseph", "Cadena", 25, 60000],
  [17, "Ana", "Diaz", 28, 17000000],
  [18, "Sebastio", "Morales", 19, 18000000],
  [19, "Joseph", "Cadena", 25, 19000000],
  [20, "Santiago", "Diaz", 28, 9999999999],
  [21, "Sebastio", "Morales", 19, 21000000],
  [22, "Joseph", "Cadena", 25, 22000000],
  [23, "Ana", "Diaz", 28, 23000000],
  [24, "Sebastio", "Morales", 19, 24000000],
  [25, "Joseph", "Cadena", 25, 25000000],
  [26, "Ana", "Diaz", 28, 60000],
  [27, "Sebastio", "Morales", 19, 27000000],
  [28, "Joseph", "Cadena", 25, 28000000],
  [29, "Ana", "Diaz", 28, 29000000],
  [30, "Santiago", "Morales", 19, 9999999999],
  [31, "Joseph", "Cadena", 25, 31000000],
  [32, "Ana", "Diaz", 28, 32000000],
  [33, "Sebastio", "Morales", 19, 33000000],
  [34, "Joseph", "Cadena", 25, 34000000],
  [35, "Ana", "Diaz", 28, 35000000],
  [36, "Sebastio", "Morales", 19, 60000],
  [37, "Joseph", "Cadena", 25, 37000000],
  [38, "Ana", "Diaz", 28, 38000000],
  [39, "Sebastio", "Morales", 19, 39000000],
  [40, "Santiago", "Cadena", 25, 9999999999],
  [41, "Ana", "Diaz", 28, 41000000],
  [42, "Sebastio", "Morales", 19, 42000000],
  [43, "Joseph", "Cadena", 25, 43000000],
  [44, "Ana", "Diaz", 28, 44000000],
  [45, "Sebastio", "Morales", 19, 45000000],
  [46, "Joseph", "Cadena", 25, 60000],
  [47, "Ana", "Diaz", 28, 47000000],
  [48, "Sebastio", "Morales", 19, 48000000],
  [49, "Joseph", "Cadena", 25, 49000000],
  [50, "Santiago", "Diaz", 28, 9999999999],
  [51, "Sebastio", "Morales", 19, 51000000],
  [52, "Joseph", "Cadena", 25, 52000000],
  [53, "Ana", "Diaz", 28, 53000000],
  [54, "Sebastio", "Morales", 19, 54000000],
  [55, "Joseph", "Cadena", 25, 55000000],
  [56, "Ana", "Diaz", 28, 60000],
  [57, "Sebastio", "Morales", 19, 57000000],
  [58, "Joseph", "Cadena", 25, 58000000],
  [59, "Ana", "Diaz", 28, 59000000],
  [60, "Sebastio", "Morales", 19, 60000000],
  [62, "Ana", "Diaz", 28, 62000000],
  [63, "Sebastio", "Morales", 19, 63000000],
  [64, "Joseph", "Cadena", 25, 64000000],
  [65, "Ana", "Diaz", 28, 65000000],
  [66, "Sebastio", "Morales", 19, 66000000],
];

let performanceChart, performanceChart_1;
let paginaActual = 1;
const filasPorPagina = 10;

/**
 * Main Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initCharts();
  initTableAndSearch();
  initFilters();
  initMetrics();
  initFormLogic();
});

// --- Utility Functions ---
function debounce(func, wait) {
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

// --- 1. Sidebar Module ---
function initSidebar() {
  const menuToggle = document.getElementById("menu-toggle");
  const aside = document.querySelector("#sidebar-left");
  const overlay = document.getElementById("overlay");

  if (!menuToggle || !aside || !overlay) return;

  const toggleMenu = () => {
    if (window.innerWidth >= 1024) {
      document.body.classList.toggle("sidebar-mini");
    } else {
      aside.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = aside.classList.contains("active")
        ? "hidden"
        : "";
    }
  };

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", () => {
    aside.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
}

// --- 2. Table & Search Module ---
function initTableAndSearch() {
  const tbody = document.querySelector("#main-data-table tbody");
  const buscador = document.getElementById("buscar");
  const listaResultados = document.getElementById("listaResultados");
  const infoPagina = document.getElementById("infoPagina");

  if (!tbody || !buscador) return;

  const renderTable = (tableData) => {
    tbody.innerHTML = "";
    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const datosPaginados = tableData.slice(inicio, fin);
    const totalPaginas = Math.ceil(tableData.length / filasPorPagina);

    datosPaginados.forEach((fila) => {
      const tr = document.createElement("tr");
      fila.forEach((celda, index) => {
        const td = document.createElement("td");
        td.textContent = index === 4 ? `$${celda.toLocaleString()}` : celda;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    if (infoPagina) {
      infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas || 1}`;
    }

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn) prevBtn.disabled = paginaActual === 1;
    if (nextBtn)
      nextBtn.disabled = paginaActual >= totalPaginas || tableData.length === 0;
  };

  const handleSearch = debounce((termino) => {
    const query = termino.toLowerCase().trim();
    paginaActual = 1;

    if (query === "") {
      if (listaResultados) {
        listaResultados.classList.remove("active");
        listaResultados.innerHTML = "";
      }
      renderTable(matriz);
      updateStatusMetrics(matriz);
      return;
    }

    const filtered = matriz.filter(
      (f) =>
        f[1].toLowerCase().includes(query) ||
        f[2].toLowerCase().includes(query),
    );
    renderTable(filtered);
    updateStatusMetrics(filtered);

    if (listaResultados) {
      listaResultados.innerHTML = "";
      if (filtered.length > 0) {
        listaResultados.classList.add("active");
        filtered.slice(0, 5).forEach((match) => {
          const li = document.createElement("li");
          li.textContent = `${match[1]} ${match[2]}`;
          li.addEventListener("click", () => {
            buscador.value = `${match[1]} ${match[2]}`;
            listaResultados.classList.remove("active");
            renderTable([match]);
            updateStatusMetrics([match]);
          });
          listaResultados.appendChild(li);
        });
      } else {
        listaResultados.classList.remove("active");
      }
    }
  }, 300);

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    const totalPaginas = Math.ceil(matriz.length / filasPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderTable(matriz);
    }
  });

  document.getElementById("prevBtn")?.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderTable(matriz);
    }
  });

  buscador.addEventListener("input", (e) => handleSearch(e.target.value));
  renderTable(matriz);
  updateStatusMetrics(matriz);
}

// --- 3. Charts Module ---
function initCharts() {
  const canvas1 = document.getElementById("performanceChart");
  const canvas2 = document.getElementById("performanceChart_1");

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        padding: 16,
        caretSize: 8,
        cornerRadius: 16,
        titleFont: { size: 14, weight: "800", family: "'Inter', sans-serif" },
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 8,
        usePointStyle: true,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(226, 232, 240, 0.6)",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: "#94a3b8",
          padding: 10,
          font: { size: 12, weight: "600" },
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          padding: 10,
          font: { size: 12, weight: "600" },
        },
      },
    },
    animation: false,
    animations: {
      tension: false,
    },
  };

  if (canvas1) {
    const ctx = canvas1.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.35)");
    gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
    gradient.addColorStop(1, "rgba(99, 102, 241, 0)");

    performanceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"],
        datasets: [
          {
            label: "Ventas",
            data: [1200, 1900, 1500, 4500, 2500, 3200, 2800],
            borderColor: "#6366f1",
            backgroundColor: gradient,
            borderWidth: 4,
            fill: true,
            tension: 0.45,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#6366f1",
            pointBorderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#6366f1",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: commonOptions,
    });
  }

  if (canvas2) {
    const ctx2 = canvas2.getContext("2d");
    const gradient2 = ctx2.createLinearGradient(0, 0, 0, 350);
    gradient2.addColorStop(0, "rgba(244, 63, 94, 0.35)");
    gradient2.addColorStop(0.5, "rgba(244, 63, 94, 0.1)");
    gradient2.addColorStop(1, "rgba(244, 63, 94, 0)");

    performanceChart_1 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [
          {
            label: "Ingresos",
            data: [5000, 8000, 6000, 10000, 15000, 20000, 25000],
            borderColor: "#f43f5e",
            backgroundColor: gradient2,
            borderWidth: 4,
            tension: 0.45,
            fill: true,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#f43f5e",
            pointBorderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#f43f5e",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: commonOptions,
    });
  }
}

// --- 4. Filters & Controls Module ---
function initFilters() {
  const filterBtn = document.querySelector(".btn-filter");
  const cardViewMode = document.getElementById("cardViewMode");
  const customSelector = document.getElementById("customCardSelector");
  const checkboxes = document.querySelectorAll(".card-checkbox");

  const updateCardVisibility = () => {
    const isCustom = cardViewMode && cardViewMode.value === "custom";
    if (customSelector)
      customSelector.style.display = isCustom ? "block" : "none";

    document.querySelectorAll(".stat-card").forEach((card) => {
      const cardId = card.getAttribute("data-id");
      if (isCustom) {
        const checkbox = Array.from(checkboxes).find(
          (cb) => cb.value === cardId,
        );
        card.classList.toggle(
          "hidden-card",
          checkbox ? !checkbox.checked : false,
        );
      } else {
        card.classList.remove("hidden-card");
      }
    });
  };

  cardViewMode?.addEventListener("change", updateCardVisibility);
  checkboxes.forEach((cb) =>
    cb.addEventListener("change", updateCardVisibility),
  );

  if (filterBtn && filterBtn.id !== "btn-crear-cliente") {
    filterBtn.addEventListener("click", () => {
      const originalText = filterBtn.innerText;
      filterBtn.innerText = "Cargando...";
      filterBtn.disabled = true;

      setTimeout(() => {
        if (performanceChart) {
          performanceChart.data.datasets[0].data = [
            250000, 320000, 280000, 500000, 150000, 420000, 980000,
          ];
          performanceChart.update();
        }
        filterBtn.innerText = originalText;
        filterBtn.disabled = false;
      }, 600);
    });
  }
}

// --- 5. Metrics Module ---
function initMetrics() {
  const updateCard = (id, value) => {
    const span = document.querySelector(`.stat-card[data-id="${id}"] span`);
    if (span) span.textContent = value;
  };

  const sumaEdad = matriz.reduce((acc, f) => acc + f[3], 0);
  const promedioEdad =
    matriz.length > 0 ? (sumaEdad / matriz.length).toFixed(1) : 0;
  const mismos28 = matriz.filter((f) => f[3] === 28).length;
  const santiagoCount = matriz.filter(
    (f) => f[1].toLowerCase() === "santiago",
  ).length;
  const porcentajeSantiago =
    matriz.length > 0 ? ((santiagoCount / matriz.length) * 100).toFixed(1) : 0;
  const sumaSalarios = matriz.reduce((acc, f) => acc + f[4], 0);
  const promedioSalarios =
    matriz.length > 0 ? (sumaSalarios / matriz.length).toLocaleString() : 0;
  const mismos60k = matriz.filter((f) => f[4] === 60000).length;

  updateCard("meta1", mismos28);
  updateCard("meta2", promedioEdad);
  updateCard("meta3", santiagoCount);
  updateCard("meta4", `${porcentajeSantiago}%`);
  updateCard("meta5", mismos60k);
  updateCard("meta6", `$ ${promedioSalarios}`);
}

// --- 6. Form & Status Metrics Module ---
function updateStatusMetrics(data) {
  const resultadoValor = document.getElementById("resultado-valor");
  const alertaRepetidos = document.getElementById("alerta-repetidos");
  const meta7Span = document.querySelector('.stat-card[data-id="meta7"] span');
  const meta8Span = document.querySelector('.stat-card[data-id="meta8"] span');

  const total = data.length;
  const setUnicos = new Set(data.map((item) => JSON.stringify(item)));
  const tieneRepetidos = setUnicos.size !== total;

  if (resultadoValor) resultadoValor.textContent = total;
  if (meta7Span) meta7Span.textContent = total;

  if (meta8Span) {
    meta8Span.textContent = tieneRepetidos ? "Detectados" : "Ninguno";
    const card8 = document.querySelector('.stat-card[data-id="meta8"]');
    if (card8)
      card8.style.borderColor = tieneRepetidos
        ? "var(--accent-rose)"
        : "var(--glass-border)";
  }

  if (alertaRepetidos)
    alertaRepetidos.style.display = tieneRepetidos ? "block" : "none";
}

// --- 7. Form Logic ---
let lista = [];
function initFormLogic() {
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
    const nuevoRegistro = [nuevoId, nombre, apellido, edad, 0]; // Salario por defecto 0
    matriz.push(nuevoRegistro);
    lista.push({ id: nuevoId, nombre, apellido, edad });

    console.log("Nuevo cliente guardado:", nuevoRegistro);

    // Actualizar UI
    const saveBtn = registroForm.querySelector(".btn-save");
    const originalContent = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i data-lucide="check"></i> Guardado';
    lucide.createIcons();

    // Refrescar componentes globales
    if (typeof renderTable === "function") {
      const buscador = document.getElementById("buscar");
      const currentQuery = buscador ? buscador.value : "";
      if (currentQuery) {
        // Si hay búsqueda activa, volver a filtrar
        const filtered = matriz.filter(
          (f) =>
            f[1].toLowerCase().includes(currentQuery.toLowerCase()) ||
            f[2].toLowerCase().includes(currentQuery.toLowerCase()),
        );
        renderTable(filtered);
        updateStatusMetrics(filtered);
      } else {
        renderTable(matriz);
        updateStatusMetrics(matriz);
      }
    }
    initMetrics();
    // Actualizar gráficas si existen
    if (performanceChart) performanceChart.update();
    if (performanceChart_1) performanceChart_1.update();

    setTimeout(() => {
      toggleForm();
      registroForm.reset();
      saveBtn.innerHTML = originalContent;
      lucide.createIcons();
    }, 600);
  });
}
