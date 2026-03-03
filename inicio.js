document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const aside = document.querySelector("aside");
  const overlay = document.getElementById("overlay");

  // --- Toggle Sidebar logic ---
  const toggleMenu = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: Toggle mini mode
      document.body.classList.toggle("sidebar-mini");
    } else {
      // Mobile: Toggle drawer
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

  // --- Chart initialization ---
  const ctx = document.getElementById("performanceChart").getContext("2d");
  const performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7"],
      datasets: [
        {
          label: "Ventas de Julio",
          data: [1200000, 1900000, 1500000, 4500000, 2500000, 3200000, 2800000],
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          borderWidth: 3,
          tension: 0.4,
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
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(226, 232, 240, 0.5)" },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });

  const ctx2 = document.getElementById("performanceChart-1").getContext("2d");
  const performanceChart_1 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7"],
      datasets: [
        {
          label: "Ingresos de Diciembre",
          data: [1200000, 1900000, 1500000, 4500000, 2500000, 3200000, 2800000],
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          borderWidth: 3,
          tension: 0.4,
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
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(226, 232, 240, 0.5)" },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });

  // --- Filter logic simulation ---
  const filterBtn = document.querySelector(".btn-filter");
  const statusFilter = document.getElementById("statusFilter");
  const periodFilter = document.getElementById("periodFilter");

  filterBtn.addEventListener("click", () => {
    const value = statusFilter.value;
    const btnText = filterBtn.innerText;

    filterBtn.innerText = "Cargando...";
    filterBtn.disabled = true;

    // Simulate data update
    setTimeout(() => {
      const newData =
        value === "Activos"
          ? [2500000, 3200000, 2800000, 5000000]
          : value === "Inactivos"
            ? [500000, 800000, 600000, 1000000]
            : [1200000, 1900000, 1500000, 4500000];

      performanceChart.data.datasets[0].data = newData;
      performanceChart.update();

      filterBtn.innerText = btnText;
      filterBtn.disabled = false;
    }, 600);
  });

  // --- Card Visibility & Persistence Logic ---
  const cardViewMode = document.getElementById("cardViewMode");
  const customCardSelector = document.getElementById("customCardSelector");
  const cardCheckboxes = document.querySelectorAll(".card-checkbox");
  const statCards = document.querySelectorAll(".stat-card");

  const savePreferences = () => {
    const preferences = {
      status: statusFilter.value,
      period: periodFilter.value,
      viewMode: cardViewMode.value,
      visibleCards: Array.from(cardCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value),
    };
    localStorage.setItem("dashboardPreferences", JSON.stringify(preferences));
  };

  const loadPreferences = () => {
    const saved = localStorage.getItem("dashboardPreferences");
    if (!saved) return;

    const preferences = JSON.parse(saved);

    // Restore Sidebar Filters
    if (preferences.status) statusFilter.value = preferences.status;
    if (preferences.period) periodFilter.value = preferences.period;

    // Restore Card Visibility
    cardViewMode.value = preferences.viewMode;
    if (preferences.viewMode === "custom") {
      customCardSelector.style.display = "flex";
      cardCheckboxes.forEach((cb) => {
        cb.checked = preferences.visibleCards.includes(cb.value);
      });
    }
    updateCardVisibility();
  };

  const updateCardVisibility = () => {
    if (cardViewMode.value === "all") {
      statCards.forEach((card) => (card.style.display = "flex"));
      customCardSelector.style.display = "none";
    } else {
      customCardSelector.style.display = "flex";
      cardCheckboxes.forEach((checkbox) => {
        const cardId = checkbox.value;
        const targetCard = document.querySelector(
          `.stat-card[data-id="${cardId}"]`,
        );
        if (targetCard) {
          targetCard.style.display = checkbox.checked ? "flex" : "none";
        }
      });
    }
  };

  // Event Listeners for Automatic Saving
  [statusFilter, periodFilter, cardViewMode].forEach((el) => {
    el.addEventListener("change", () => {
      updateCardVisibility();
      savePreferences();
    });
  });

  cardCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateCardVisibility();
      savePreferences();
    });
  });

  // Initialize from storage
  loadPreferences();

  // Close menu on link click
  const navLinks = document.querySelectorAll("aside a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (aside.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
});
