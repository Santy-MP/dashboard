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
];

let performanceChart, performanceChart_1;

/**
 * Main Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initCharts();
  initTableAndSearch();
  initFilters();
  initMetrics();
});

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
let paginaActual = 1;
const filasPorPagina = 10;

function initTableAndSearch() {
  const tbody = document.querySelector("#main-data-table tbody");
  const buscador = document.getElementById("buscar");
  const listaResultados = document.getElementById("listaResultados");
  const infoPagina = document.getElementById("infoPagina");

  if (!tbody || !buscador || !listaResultados) return;

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

    // Actualizar estado de botones
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn) prevBtn.disabled = paginaActual === 1;
    if (nextBtn)
      nextBtn.disabled = paginaActual >= totalPaginas || tableData.length === 0;
  };

  // --- Lógica de Búsqueda ---
  const handleSearch = (termino) => {
    const query = termino.toLowerCase().trim();

    // Al buscar, siempre reseteamos a la página 1
    paginaActual = 1;

    if (query === "") {
      listaResultados.classList.remove("active");
      listaResultados.innerHTML = "";
      renderTable(matriz);
      return;
    }

    const filtered = matriz.filter(
      (f) =>
        f[1].toLowerCase().includes(query) ||
        f[2].toLowerCase().includes(query),
    );
    renderTable(filtered);

    // ... (El resto de tu lógica de lista de resultados se mantiene igual)
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
        });
        listaResultados.appendChild(li);
      });
    } else {
      listaResultados.classList.remove("active");
    }
  };

  // --- Eventos de los Botones de Paginación ---
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

  // Inicialización
  buscador.addEventListener("input", (e) => handleSearch(e.target.value));
  renderTable(matriz); // Carga inicial
}

// --- 3. Charts Module ---
function initCharts() {
  const canvas1 = document.getElementById("performanceChart");
  const canvas2 = document.getElementById("performanceChart_1");

  if (canvas1) {
    const ctx = canvas1.getContext("2d");
    performanceChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Semana 1",
          "Semana 2",
          "Semana 3",
          "Semana 4",
          "Semana 5",
          "Semana 6",
          "Semana 7",
        ],
        datasets: [
          {
            label: "Ventas de Julio",
            data: [
              1200000, 1900000, 1500000, 4500000, 2500000, 3200000, 2800000,
            ],
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            borderWidth: 3,
            fill: true,
            pointBackgroundColor: "#4f46e5",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(226, 232, 240, 0.5)" } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  if (canvas2) {
    const ctx2 = canvas2.getContext("2d");
    performanceChart_1 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: [
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
          "Domingo",
        ],
        datasets: [
          {
            label: "Ingresos de Junio",
            data: [500000, 800000, 600000, 1000000, 1500000, 2000000, 2500000],
            borderColor: "#f43f5e",
            backgroundColor: "rgba(244, 63, 94, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#f43f5e",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(226, 232, 240, 0.5)" } },
          x: { grid: { display: false } },
        },
      },
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

    if (isCustom) {
      if (customSelector) customSelector.style.display = "block";
      checkboxes.forEach((cb) => {
        const cardId = cb.value;
        const card = document.querySelector(`.stat-card[data-id="${cardId}"]`);
        if (card) {
          card.classList.toggle("hidden-card", !cb.checked);
        }
      });
    } else {
      if (customSelector) customSelector.style.display = "none";
      document
        .querySelectorAll(".stat-card")
        .forEach((c) => c.classList.remove("hidden-card"));
    }
  };

  // Listeners para cambio de modo (Todas vs Personalizar)
  if (cardViewMode) {
    cardViewMode.addEventListener("change", updateCardVisibility);
  }

  // Listeners para cada checkbox individual
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateCardVisibility);
  });

  // Listener para el botón (efecto visual de recarga de gráficas)
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const originalText = filterBtn.innerText;
      filterBtn.innerText = "Cargando...";
      filterBtn.disabled = true;

      // Actualizar visibilidad por si acaso
      updateCardVisibility();

      setTimeout(() => {
        const altData1 = [
          2500000, 3200000, 2800000, 5000000, 1500000, 4200000, 3800000,
        ];
        const altData2 = [
          1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000,
        ];

        if (performanceChart) {
          performanceChart.data.datasets[0].data = altData1;
          performanceChart.update();
        }
        if (performanceChart_1) {
          performanceChart_1.data.datasets[0].data = altData2;
          performanceChart_1.update();
        }

        filterBtn.innerText = originalText;
        filterBtn.disabled = false;
      }, 600);
    });
  }

  // Ejecución inicial para sincronizar estado
  updateCardVisibility();
}

// --- 5. Metrics Module ---
function initMetrics() {
  const updateCard = (id, value) => {
    const card = document.querySelector(`.stat-card[data-id="${id}"] span`);
    if (card) card.textContent = value;
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

  updateCard("usuarios", mismos28);
  updateCard("usuarios2", promedioEdad);
  updateCard("meta", santiagoCount);
  updateCard("meta1", `${porcentajeSantiago}%`);
  updateCard("meta2", mismos60k);
  updateCard("meta3", `$ ${promedioSalarios}`);
}
