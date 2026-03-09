# Documentación de JavaScript: `inicio.js`

Este documento explica de forma detallada cada línea y parte del código JavaScript utilizado para controlar la interactividad del dashboard.

---

## 1. Evento de Carga Inicial

```javascript
1: document.addEventListener("DOMContentLoaded", () => {
```

- **Línea 1**: Espera a que todo el contenido HTML haya sido cargado y procesado por el navegador antes de ejecutar el código. Esto asegura que los elementos (como botones o gráficos) ya existan cuando intentemos manipularlos.

---

## 2. Definición de Variables Globales

```javascript
2:   const menuToggle = document.getElementById("menu-toggle");
3:   const aside = document.querySelector("aside");
4:   const overlay = document.getElementById("overlay");
```

- **Línea 2**: Obtiene el botón que activa/desactiva el menú lateral.
- **Línea 3**: Obtiene el elemento `<aside>` (la barra lateral).
- **Línea 4**: Obtiene el "overlay" (capa oscura de fondo) que aparece en móviles.

---

## 3. Lógica del Menú Lateral (Sidebar)

```javascript
7:   const toggleMenu = () => {
8:     if (window.innerWidth >= 1024) {
9:       // Desktop: Toggle mini mode
10:       document.body.classList.toggle("sidebar-mini");
11:     } else {
12:       // Mobile: Toggle drawer
13:       aside.classList.toggle("active");
14:       overlay.classList.toggle("active");
15:       document.body.style.overflow = aside.classList.contains("active")
16:         ? "hidden"
17:         : "";
18:     }
19:   };
```

- **Línea 7**: Define la función `toggleMenu`.
- **Línea 8**: Verifica si el ancho de la pantalla es mayor o igual a 1024px (escritorio).
- **Línea 10**: Si es escritorio, añade o quita la clase `sidebar-mini` al `body` para encoger el menú.
- **Líneas 11-18**: Si es móvil, activa/desactiva la clase `active` en el menú y el fondo oscuro. Además, bloquea el scroll del cuerpo (`overflow: hidden`) cuando el menú está abierto.

```javascript
21:   menuToggle.addEventListener("click", toggleMenu);
22:   overlay.addEventListener("click", () => {
23:     aside.classList.remove("active");
24:     overlay.classList.remove("active");
25:     document.body.style.overflow = "";
26:   });
```

- **Línea 21**: Asigna la función `toggleMenu` al click del botón.
- **Líneas 22-26**: Cierra el menú si el usuario hace click en la capa de fondo oscuro.

---

## 4. Inicialización de Gráficos (Chart.js)

```javascript
29:   const ctx = document.getElementById("performanceChart").getContext("2d");
30:   const performanceChart = new Chart(ctx, { ... });
```

- **Línea 29**: Obtiene el contexto de dibujo para el primer gráfico.
- **Línea 30-73**: Crea una instancia de `Chart.js`.
  - `type: "line"`: Define que es un gráfico de líneas.
  - `data.labels`: Los nombres en el eje X (semanas).
  - `datasets`: Contiene los datos numéricos, colores, grosores de línea y si lleva relleno (`fill: true`).
  - `options`: Configura que sea responsivo y oculta la leyenda superior.

_(Se repite una lógica similar para `performanceChart_1` en las líneas 75-119)_.

---

## 5. Simulación de Filtros

```javascript
122:   const filterBtn = document.querySelector(".btn-filter");
123:   const statusFilter = document.getElementById("statusFilter");
...
126:   filterBtn.addEventListener("click", () => {
130:     filterBtn.innerText = "Cargando...";
131:     filterBtn.disabled = true;
...
134:     setTimeout(() => {
135:       const newData = (lógica de selección de datos);
142:       performanceChart.data.datasets[0].data = newData;
143:       performanceChart.update();
145:       filterBtn.innerText = btnText;
146:       filterBtn.disabled = false;
147:     }, 600);
148:   });
```

- **Línea 126**: Escucha el click en el botón de filtrar.
- **Líneas 130-131**: Cambia el texto a "Cargando..." y deshabilita el botón visualmente.
- **Línea 134**: Usa `setTimeout` para esperar 0.6 segundos, simulando una carga de base de datos.
- **Líneas 142-143**: Actualiza los datos del gráfico con el nuevo array generado y llama a `.update()` para redibujarlo.

---

## 6. Persistencia de Preferencias (LocalStorage)

```javascript
184:   const savePreferences = () => {
185:     const preferences = {
186:       status: statusFilter.value,
187:       period: periodFilter.value,
188:       viewMode: cardViewMode.value,
189:       visibleCards: Array.from(cardCheckboxes)
190:         .filter((cb) => cb.checked)
191:         .map((cb) => cb.value),
192:     };
193:     localStorage.setItem("dashboardPreferences", JSON.stringify(preferences));
194:   };
```

- **Líneas 184-192**: Crea un objeto con los valores actuales de los selectores y las tarjetas visibles.
- **Línea 193**: Guarda ese objeto en el navegador usando `localStorage`, permitiendo que la configuración se mantenga aunque se refresque la página.

```javascript
196:   const loadPreferences = () => {
197:     const saved = localStorage.getItem("dashboardPreferences");
198:     if (!saved) return;
200:     const preferences = JSON.parse(saved);
...
214:     updateCardVisibility();
215:   };
```

- **Línea 197**: Intenta recuperar los datos guardados.
- **Línea 198**: Si no hay datos, termina la función.
- **Línea 200**: Convierte el texto guardado de nuevo a un objeto usable.
- **Líneas 203-213**: Restaura los valores de los filtros y el estado de los checkboxes en la interfaz.

---

## 7. Control de Visibilidad de Tarjetas

```javascript
217:   const updateCardVisibility = () => {
218:     if (cardViewMode.value === "all") {
219:       statCards.forEach((card) => (card.style.display = "flex"));
220:       customCardSelector.style.display = "none";
221:     } else {
...
229:           targetCard.style.display = checkbox.checked ? "flex" : "none";
...
233:   };
```

- **Línea 218**: Si el modo de vista es "all" (todas), muestra todas las tarjetas.
- **Líneas 221-231**: Si es modo personalizado, recorre los checkboxes y oculta o muestra las tarjetas según si están marcadas.

---

## 8. Cierre Automático del Menú

```javascript
254:   const navLinks = document.querySelectorAll("aside a");
255:   navLinks.forEach((link) => {
256:     link.addEventListener("click", () => {
257:       if (aside.classList.contains("active")) {
258:         toggleMenu();
259:       }
260:     });
261:   });
```

- **Línea 254-261**: Busca todos los enlaces en el menú lateral. Si el usuario hace click en uno y está en móvil (clase `active`), cierra el menú automáticamente para facilitar la navegación.
