# Documentación de inicio.css - Explicación línea por línea

Este archivo explica cada parte del código CSS del dashboard (`inicio.css`).

---

## 1. Importación de fuentes

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
```

Importa la fuente **Inter** de Google Fonts con 6 grosores diferentes (300 a 800). Se usa como tipografía principal del dashboard.

---

## 2. Variables CSS (`:root`)

```css
:root { ... }
```

Define **variables globales** reutilizables en todo el archivo. Esto permite cambiar colores y valores desde un solo lugar.

| Variable          | Valor                        | Descripción                                 |
| ----------------- | ---------------------------- | ------------------------------------------- |
| `--primary`       | `#4f46e5`                    | Color principal (índigo)                    |
| `--primary-light` | `#6366f1`                    | Variante clara del color principal          |
| `--primary-dark`  | `#3730a3`                    | Variante oscura del color principal         |
| `--bg`            | `#f8fafc`                    | Color de fondo general de la página         |
| `--sidebar`       | `#0f172a`                    | Fondo de la barra lateral (azul muy oscuro) |
| `--sidebar-hover` | `rgba(255,255,255,0.04)`     | Fondo al pasar el mouse en el sidebar       |
| `--text-main`     | `#1e293b`                    | Color de texto principal                    |
| `--text-muted`    | `#64748b`                    | Color de texto secundario/atenuado          |
| `--card-bg`       | `#ffffff`                    | Fondo de las tarjetas                       |
| `--glass-border`  | `rgba(226,232,240,0.8)`      | Color del borde con efecto cristal          |
| `--accent-blue`   | `#3b82f6`                    | Color de acento azul                        |
| `--accent-amber`  | `#f59e0b`                    | Color de acento ámbar                       |
| `--accent-rose`   | `#f43f5e`                    | Color de acento rosa                        |
| `--accent-green`  | `#22c55d`                    | Color de acento verde                       |
| `--transition`    | `all 0.3s cubic-bezier(...)` | Transición suave estándar para animaciones  |
| `--radius`        | `1.25rem`                    | Radio de redondeado de esquinas             |

---

## 3. Selector universal (`*`)

```css
* {
  margin: 0;                          → Elimina el margen por defecto de todos los elementos
  padding: 0;                         → Elimina el padding por defecto
  box-sizing: border-box;             → El padding y borde se incluyen en el ancho total
  font-family: "Inter", system-ui...  → Establece la fuente principal
  -webkit-font-smoothing: antialiased → Suaviza los bordes de las fuentes en WebKit
}
```

---

## 4. Cuerpo del documento (`body`)

```css
body {
  display: flex;              → Contenedor flexible
  flex-direction: column;     → Organiza el contenido verticalmente
  min-height: 100vh;          → Ocupa al menos toda la altura de la pantalla
  background: ...             → Fondo con gradientes radiales sutiles + color plano
  color: var(--text-main);    → Color de texto principal
  overflow-x: hidden;         → Evita barra de desplazamiento horizontal
}
```

---

## 5. Animación `fadeIn`

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }  → Inicia transparente y 10px abajo
  to   { opacity: 1; transform: translateY(0); }     → Termina opaco en su posición
}
```

Se aplica a `.stat-card`, `.stats-details` y `.filters-group` para que aparezcan con un efecto suave de 0.5 segundos.

---

## 6. Encabezado (`header`)

```css
header {
  background: rgba(255,255,255,0.85)     → Fondo blanco semi-transparente (efecto cristal)
  backdrop-filter: blur(16px)            → Desenfoque del fondo detrás del header
  -webkit-backdrop-filter: blur(16px)    → Compatibilidad con Safari
  padding: 0.75rem 1.5rem               → Espaciado interno
  border-bottom: 2px solid ...           → Borde inferior fino
  border- top: 3px solid var(--primary)   → Línea superior con color de marca
  position: sticky                       → Se queda fijo al hacer scroll
  top: 0                                → Pegado arriba
  z-index: 1000                          → Por encima de otros elementos
  display: flex                          → Flexbox para alinear contenido
  justify-content: space-between         → Espacio entre elementos hijos
  align-items: center                    → Centra verticalmente
  box-shadow: ...                        → Sombra sutil de profundidad
}
```

### `.header-left`

Contenedor izquierdo del header. Usa `flex` para alinear el botón de menú y el título con un espacio de `1.25rem`.

### `#menu-toggle`

Botón para abrir/cerrar el sidebar. Fondo transparente, sin bordes, cursor puntero, redondeado, con transición suave. Al pasar el mouse se oscurece ligeramente.

### `header h1`

Título principal. Fuente grande (1.25rem), extra negrita (800), con gradiente lineal. Usa `background-clip: text` para aplicar el gradiente al texto.

### `header h1 span`

Texto secundario dentro del título. Peso normal (400) y opacidad al 60%.

---

## 7. Información del usuario (`.user-info`)

Contenedor flex con iconos interactivos. Los iconos tienen:

- Cursor puntero
- Borde circular (`border-radius: 50%`)
- Color atenuado que cambia al color principal al pasar el mouse

---

## 8. Layout principal (`.main-layout`)

```css
.main-layout {
  display: flex;       → Contenedor flexible
  flex: 1;             → Ocupa todo el espacio disponible
  position: relative;  → Referencia para elementos hijos posicionados
}
```

---

## 9. Overlay (`#overlay`)

Capa de superposición oscura y translúcida. Se usa cuando el sidebar está abierto en móvil.

- `position: fixed; inset: 0` → Cubre toda la pantalla
- `backdrop-filter: blur(4px)` → Desenfoque de fondo
- `opacity: 0; visibility: hidden` → Oculto por defecto
- Cuando tiene la clase `.active` → Se hace visible (`opacity: 1`)

---

## 10. Sidebar izquierdo (`aside#sidebar-left`)

```css
aside#sidebar-left {
  width: 260px                → Ancho fijo
  background-color: var(--sidebar) → Fondo oscuro
  color: white                → Texto blanco
  padding: 1.5rem 0.75rem     → Espaciado interno
  position: fixed             → Fijo (no se mueve con scroll)
  top: 0                      → Desde arriba
  left: -260px                → Escondido hacia la izquierda (fuera de pantalla)
  height: 100vh               → Altura completa
  z-index: 1002               → Por encima del overlay
  transition: ...             → Animación suave para ancho y transformación
  box-shadow: ...             → Sombra lateral
  overflow: hidden             → Oculta el contenido que sobresale
}
```

### Estado activo (`.active`)

Se desplaza 260px a la derecha con `transform: translateX(260px)`.

### Modo mini (`body.sidebar-mini`)

- Ancho reducido a **80px**
- Los textos (`span`) se ocultan
- Al pasar el mouse se expande a 260px y muestra los textos
- Los enlaces se centran cuando está contraído

---

## 11. Enlaces del sidebar (`aside ul li a`)

```css
aside ul li a {
  color: #94a3b8             → Gris claro
  text-decoration: none      → Sin subrayado
  display: flex              → Alinea icono + texto
  align-items: center        → Centrado vertical
  gap: 1rem                  → Espacio entre icono y texto
  padding: 0.85rem 1.25rem   → Espaciado interno
  border-radius: 0.75rem     → Bordes redondeados
  transition: ...            → Transición suave
  font-weight: 500           → Grosor medio
  font-size: 0.95rem         → Tamaño estándar
}
```

- **Hover**: fondo sutil y texto blanco
- **Activo** (`.active`): fondo azul pálido y texto color primario claro

---

## 12. Contenido principal (`main`)

```css
main {
  flex: 1                    → Ocupa el espacio restante
  padding: 2.5rem 2rem       → Espaciado interno generoso
  width: 100%                → Ancho completo
  transition: margin-left... → Transición suave al mover el sidebar
}
```

### `main h2`

Título de sección. Fuente grande (1.85rem), extra negrita (800), tracking ajustado.

---

## 13. Área de contenido del dashboard

### `.dashboard-content-area`

Contenedor flex en columna con `gap: 2rem`.

### `.container`

Cuadrícula CSS Grid con columnas automáticas (`auto-fit`), mínimo 300px, separación de 1.5rem.

---

## 14. Barra lateral de filtros (`.filters-sidebar`)

Panel derecho de 320px fijo. Fondo gris claro, borde izquierdo, padding generoso, flex en columna.

### `.filters-sticky-wrapper`

Envoltorio con `position: sticky; top: 5.5rem` para que los filtros se mantengan visibles al hacer scroll.

---

## 15. Media Queries (Diseño responsivo)

### `@media (min-width: 1800px)` — Ultra-widescreen

Limita el ancho máximo del layout, header y footer a **1800px** y los centra horizontalmente.

### `@media (min-width: 1024px)` — Escritorio

- Siempre muestra el botón de menú
- Oculta el overlay
- Sidebar siempre visible en posición 0
- `main` tiene margen izquierdo de 260px (o 80px en modo mini)

### `@media (max-width: 1200px)` — Tablets

- La barra de filtros ocupa el **100% del ancho** y se pone debajo del contenido
- Se desactiva el `position: sticky`

### `@media (max-width: 1024px)` — Tablets pequeñas

- `main` sin margen izquierdo
- Columnas de la cuadrícula con mínimo de 240px

### `@media (max-width: 768px)` — Móviles

- Padding del `main` reducido
- Una sola columna de tarjetas
- Título del header más pequeño (1.1rem)

---

## 16. Selector de tarjetas personalizadas

### `#customCardSelector`

Contenedor con fondo claro, borde punteado, redondeado. Sirve para elegir qué tarjetas mostrar.

### `.card-checkbox-label`

Etiqueta del checkbox. Usa flex, cursor puntero, fuente media. Cambia al color principal al pasar el mouse.

### `.card-checkbox`

La casilla de verificación. Tamaño 1.1rem, redondeado de 4px, color de acento principal cuando está marcado.

---

## 17. Tarjetas de métricas (`.stat-card`)

```css
.stat-card {
  background: white          → Fondo blanco
  padding: 1.75rem           → Espaciado interno
  border-radius: var(--radius) → Esquinas redondeadas
  border: 1px solid ...      → Borde sutil
  box-shadow: var(--shadow)  → Sombra
  transition: ...            → Transición suave
  position: relative         → Para pseudo-elementos internos
  overflow: hidden           → Oculta bordes redondeados
  display: flex              → Flex
  flex-direction: column     → En columna
  gap: 0.5rem                → Separación entre elementos
}
```

### `::after` (pseudo-elemento)

Crea un gradiente radial muy tenue (`opacity: 0.03`) que simula un foco de luz sutil dentro de la tarjeta.

### Colores por tarjeta (`:nth-child`)

| Tarjeta | Borde superior           | Color degradado                         |
| ------- | ------------------------ | --------------------------------------- |
| 1ª      | Azul (`--accent-blue`)   | Azul sutil                              |
| 2ª      | Ámbar (`--accent-amber`) | Ámbar sutil                             |
| 3ª      | Rosa (`--accent-rose`)   | Rosa sutil                              |
| 4ª      | Verde (`--accent-green`) | Rosa sutil (posible error del original) |

### Iconos de las tarjetas (`.stat-card i`)

Cuadrado de 46x46px, centrado, redondeado (12px), con fondo de color de acento y sombra brillante.

### Hover de las tarjetas

Se elevan 5px (`translateY(-5px)`), aumentan su sombra y el borde cambia al color principal claro.

---

## 18. Detalles y filtros

### `.stats-details`, `.filters-group`

Padding vertical de 0.5rem. El grupo de filtros usa flex en columna con separación de 2rem.

### Títulos (`h3`)

Fuente de 1rem, extra negrita (800), mayúsculas, tracking de 0.05em.

---

## 19. Gráfico (`.chart`)

Contenedor con altura mínima de 450px, fondo blanco, bordes redondeados, padding de 1.5rem, borde fino.

---

## 20. Filtros individuales (`.filter`)

### Contenedor

Flex en columna con gap de 0.75rem.

### Etiqueta (`label`)

Fuente pequeña (0.75rem), negrita, color atenuado, mayúsculas.

### Selector (`select`)

Padding de 1rem, redondeado de 0.75rem, fondo blanco, cursor puntero. Al recibir foco: borde cambia al color principal y añade un anillo de sombra azul sutil.

---

## 21. Botón de filtrar (`.btn-filter`)

```css
.btn-filter {
  background: var(--sidebar)  → Fondo oscuro
  color: white                → Texto blanco
  border: none                → Sin bordes
  padding: 1.25rem            → Padding generoso
  border-radius: 0.75rem      → Redondeado
  font-weight: 700            → Negrita
  cursor: pointer             → Cursor puntero
  transition: ...             → Transición suave
  margin-top: 1rem            → Separación superior
}
```

**Hover**: Fondo cambia al color principal y crece ligeramente (`scale(1.02)`).

---

## 22. Pie de página (`footer`)

```css
footer {
  padding: 2.5rem        → Padding abundante
  text-align: center     → Texto centrado
  color: var(--text-muted) → Color atenuado
  font-size: 0.85rem     → Fuente pequeña
}
```
