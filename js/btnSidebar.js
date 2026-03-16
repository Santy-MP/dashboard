import { getStorage, setStorage } from "./storageUtils.js";

// Función para cerrar todos los paneles abiertos (usualmente en móvil o overlay)
export function closeAllMenus() {
  const sidebarLeft = document.querySelector("#sidebar-left");
  const sidebarRight = document.getElementById("sidebar-right");
  const overlay = document.getElementById("overlay");

  if (sidebarLeft) sidebarLeft.classList.remove("active");
  if (sidebarRight) sidebarRight.classList.remove("active");
  if (overlay) overlay.classList.remove("active");

  document.body.style.overflow = "";
}

// Inicializar menú lateral derecho (Filtros)
export function initSidebarRight() {
  const btnToggle = document.getElementById("right-menu-toggle");
  const sidebar = document.getElementById("sidebar-right");
  const overlay = document.getElementById("overlay");
  const btnClose = document.getElementById("close-sidebar-right");

  if (!btnToggle || !sidebar || !overlay) return;

  // Abrir menú
  btnToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Cerrar con la X interna
  if (btnClose) {
    btnClose.addEventListener("click", closeAllMenus);
  }

  // Cerrar al hacer clic fuera (Overlay)
  overlay.addEventListener("click", closeAllMenus);
}

// Inicializar menú izquierdo
export function initSidebar() {
  const btnToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector("#sidebar-left");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  if (!btnToggle || !sidebar || !overlay) return;

  // Restaurar estado mini si existe
  const isMini = getStorage("sidebar_mini");
  if (isMini !== null) {
    if (isMini) {
      body.classList.add("sidebar-mini");
    } else {
      body.classList.remove("sidebar-mini");
    }
  }

  btnToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    // Si estamos en desktop (> 1024), toggle mini
    if (window.innerWidth > 1024) {
      body.classList.toggle("sidebar-mini");
      setStorage("sidebar_mini", body.classList.contains("sidebar-mini"));
    } else {
      // En móvil, toggle active (slide-in)
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  });
}
