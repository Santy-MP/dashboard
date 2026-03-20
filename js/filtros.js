import {
  renderTable,
  setCurrentData,
  setFilasPorPagina,
  getBaseData,
} from "./tablas.js";
import { updateStatusMetrics } from "./tarjetas.js";
import { debounce } from "./app.js";
import { initCharts } from "./Graficas.js";
import { getStorage, setStorage } from "./storageUtils.js";

export function initFilters() {
  const rangeInput = document.getElementById("fechaRango");
  const estadoFiltro = document.getElementById("estadoFiltro");
  const cantidadFilas = document.getElementById("cantidadFilas");
  const buscador = document.getElementById("buscar");
  const listaResultados = document.getElementById("listaResultados");

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let selectedRange = getStorage("filter_range") || { start: null, end: null };

  if (rangeInput) {
    const fp = flatpickr(rangeInput, {
      mode: "range",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y",
      theme: "dark",
      defaultDate:
        selectedRange.start && selectedRange.end
          ? [selectedRange.start, selectedRange.end]
          : null,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          selectedRange.start = formatDate(selectedDates[0]);
          selectedRange.end = formatDate(selectedDates[1]);
        } else if (selectedDates.length === 1) {
          selectedRange.start = formatDate(selectedDates[0]);
          selectedRange.end = null;
        } else {
          selectedRange.start = null;
          selectedRange.end = null;
        }
        setStorage("filter_range", selectedRange);
        applyFilters();
      },
    });
  }

  // Logic for Personalizar Métricas (from btn_Actualizar_panel.js)
  const pageSuffix = window.location.pathname.split("/").pop() || "inicio.html";
  const cardModeKey = `card_view_mode_${pageSuffix}`;
  const selectedCardKey = `selected_cards_${pageSuffix}`;

  const cardViewMode = document.getElementById("cardViewMode");
  const customSelector = document.getElementById("customCardSelector");
  const checkboxes = document.querySelectorAll(".card-checkbox");

  const updateCardVisibility = () => {
    if (!cardViewMode && checkboxes.length === 0) return;

    const isCustom = cardViewMode && cardViewMode.value === "custom";
    if (customSelector)
      customSelector.style.display = isCustom ? "block" : "none";

    const selectedCards = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) selectedCards.push(cb.value);
    });

    document.querySelectorAll(".stat-card").forEach((card) => {
      const cardId = card.getAttribute("data-id");
      if (isCustom) {
        const isSelected = selectedCards.includes(cardId);
        card.classList.toggle("hidden-card", !isSelected);
      } else {
        card.classList.remove("hidden-card");
      }
    });

    // Persist to localStorage ONLY if we have checkboxes to save
    if (cardViewMode) setStorage(cardModeKey, cardViewMode.value);
    if (checkboxes.length > 0) {
      setStorage(selectedCardKey, selectedCards);
    }
  };

  cardViewMode?.addEventListener("change", updateCardVisibility);
  checkboxes.forEach((cb) =>
    cb.addEventListener("change", updateCardVisibility),
  );

  // Definimos la lógica de filtrado
  const applyFilters = () => {
    const query = buscador ? buscador.value.toLowerCase().trim() : "";
    const pEstado = estadoFiltro ? estadoFiltro.value.toLowerCase() : "";

    // 1. Filtramos sobre la base de datos permitida según el rol
    const baseData = getBaseData();
    const filteredResults = baseData.filter((f) => {
      const firstName = f[1].toLowerCase();
      const lastName = f[2].toLowerCase();
      const fullName = `${firstName} ${lastName}`;
      const recordDate = f[6] || "";

      const matchSearch =
        query === "" ||
        firstName.includes(query) ||
        lastName.includes(query) ||
        fullName.includes(query) ||
        recordDate.includes(query);

      const matchDesde =
        !selectedRange.start || recordDate >= selectedRange.start;
      const matchHasta = !selectedRange.end || recordDate <= selectedRange.end;
      const matchFecha = matchDesde && matchHasta;

      const matchEstado = pEstado === "" || f[8].toLowerCase() === pEstado;

      return matchSearch && matchFecha && matchEstado;
    });

    // 2. Comprobamos si hay duplicados antes de limpiar (basado en Nombre + Apellido)
    const uniqueResults = [];
    const seenNames = new Set();

    filteredResults.forEach((f) => {
      const fullName = `${f[1].toLowerCase()} ${f[2].toLowerCase()}`;
      if (!seenNames.has(fullName)) {
        seenNames.add(fullName);
        uniqueResults.push(f);
      }
    });

    const duplicateCount = filteredResults.length - uniqueResults.length;

    // 3. Actualizamos el estado en tablas.js
    setCurrentData(uniqueResults);
    updateStatusMetrics(uniqueResults, duplicateCount);
    initCharts(uniqueResults);

    // 4. Lógica de la lista de sugerencias (Autocomplete)
    if (listaResultados) {
      listaResultados.innerHTML = "";
      if (query !== "" && uniqueResults.length > 0) {
        listaResultados.classList.add("active");
        uniqueResults.slice(0, 5).forEach((match) => {
          const li = document.createElement("li");
          li.textContent = `${match[1]} ${match[2]}`;
          li.addEventListener("click", () => {
            buscador.value = `${match[1]} ${match[2]}`;
            listaResultados.classList.remove("active");
            applyFilters();
          });
          listaResultados.appendChild(li);
        });
      } else {
        listaResultados.classList.remove("active");
      }
    }
  };

  // Usamos debounce para que el buscador no sature el renderizado
  const debouncedSearch = debounce(applyFilters, 300);

  // Restore Saved Values
  if (buscador) {
    buscador.value = getStorage("filter_query") || "";
  }
  if (estadoFiltro) {
    estadoFiltro.value = getStorage("filter_status") || "";
  }
  if (cantidadFilas) {
    const savedRows = getStorage("filter_rows");
    if (savedRows) {
      cantidadFilas.value = savedRows;
      setFilasPorPagina(parseInt(savedRows, 10));
    }
  }

  // Restore Card Selection
  const savedCardMode = getStorage(cardModeKey);
  const savedSelectedCards = getStorage(selectedCardKey);

  if (cardViewMode && savedCardMode) {
    cardViewMode.value = savedCardMode;
  }

  if (savedSelectedCards && Array.isArray(savedSelectedCards)) {
    checkboxes.forEach((cb) => {
      cb.checked = savedSelectedCards.includes(cb.value);
    });
  } else {
    // Default: If no saved cards, ensure all are checked if it's the first time
    checkboxes.forEach((cb) => {
      cb.checked = true;
    });
  }

  // Initial Visibility Sync
  updateCardVisibility();

  // Initial Apply
  applyFilters();

  // Listeners
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      setStorage("filter_query", e.target.value);
      debouncedSearch();
    });
  }

  if (estadoFiltro) {
    estadoFiltro.addEventListener("change", (e) => {
      setStorage("filter_status", e.target.value);
      applyFilters();
    });
  }

  if (cantidadFilas) {
    cantidadFilas.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
        setStorage("filter_rows", val);
        setFilasPorPagina(val);
        renderTable();
      }
    });
  }
}
