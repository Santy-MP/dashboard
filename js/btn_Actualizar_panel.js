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
