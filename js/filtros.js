import { matriz } from "./Data.js";
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

  let selectedRange = getStorage("filter_range") || { start: null, end: null };

  // Inicializar Flatpickr
  if (rangeInput) {
    const fp = flatpickr(rangeInput, {
      mode: "range",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y",
      theme: "dark",
      defaultDate: selectedRange.start && selectedRange.end ? [selectedRange.start, selectedRange.end] : null,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          selectedRange.start = selectedDates[0].toISOString().split("T")[0];
          selectedRange.end = selectedDates[1].toISOString().split("T")[0];
        } else if (selectedDates.length === 1) {
          selectedRange.start = selectedDates[0].toISOString().split("T")[0];
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
      
      const matchSearch =
        query === "" ||
        firstName.includes(query) ||
        lastName.includes(query) ||
        fullName.includes(query);

      // Usamos el índice 6 para fecha de incorporación según Data.js
      const recordDate = f[6]; // Format: "YYYY-MM-DD"
      
      const matchDesde = !selectedRange.start || recordDate >= selectedRange.start;
      const matchHasta = !selectedRange.end || recordDate <= selectedRange.end;
      const matchFecha = matchDesde && matchHasta;

      const matchEstado = pEstado === "" || f[8].toLowerCase() === pEstado;

      return matchSearch && matchFecha && matchEstado;
    });

    // 2. Comprobamos si hay duplicados antes de limpiar (basado en Nombre + Apellido)
    const rawNames = filteredResults.map(f => `${f[1].toLowerCase()} ${f[2].toLowerCase()}`);
    const hasSuppressedDuplicates = new Set(rawNames).size !== filteredResults.length;

    // 3. Eliminamos duplicados por Nombre + Apellido para la tabla
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

    // 4. Actualizamos el estado en tablas.js
    // Esto asegura que la tabla use los datos filtrados y regrese a la pág 1
    setCurrentData(uniqueResults);
    updateStatusMetrics(uniqueResults, duplicateCount);
    initCharts(uniqueResults);

    // 5. Lógica de la lista de sugerencias (Autocomplete)
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
            applyFilters(); // Re-aplicar filtros con el nombre seleccionado
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
