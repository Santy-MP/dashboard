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
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Ventas de Julio",
          data: [1200000, 1900000, 1500000, 4500000],
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
