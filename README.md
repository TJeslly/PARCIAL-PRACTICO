# Herramienta de Análisis de Datos (BI Tool)

Una aplicación web de una sola página (SPA) que permite visualizar y analizar datos en formato CSV de manera interactiva, con soporte para la generación de gráficos y exportación de resultados.

Link
https://tjeslly.github.io/PARCIAL-PRACTICO/

## Características Principales

- **Carga de Datos**:
  - Pegado directo de datos CSV
  - Carga de archivos CSV
  - Validación de formato CSV

- **Visualización de Datos**:
  - Tabla interactiva con ordenamiento
  - Gráficos personalizables (barras, líneas, torta)
  - Selección de ejes X e Y
  - Modo horizontal/vertical para gráficos de barras

- **Exportación**:
  - Exportar gráficos como imágenes PNG
  - Exportar datos como archivo CSV

- **Accesibilidad**:
  - Navegación por teclado
  - Alto contraste
  - Soporte para lectores de pantalla
  - Modo oscuro

- **Diseño Responsive**:
  - Se adapta a diferentes tamaños de pantalla
  - Interfaz optimizada para móviles y tablets

## Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- No se requieren dependencias adicionales (todas las bibliotecas se cargan desde CDN)

## Cómo Usar

1. **Cargar Datos**:
   - Pegue sus datos CSV en el área de texto o seleccione un archivo CSV
   - Haga clic en "Procesar Datos"

2. **Explorar Datos**:
   - Los datos se mostrarán en una tabla interactiva
   - Use la barra de búsqueda para filtrar resultados
   - Haga clic en los encabezados de columna para ordenar

3. **Crear Gráficos**:
   - Seleccione las columnas para los ejes X e Y
   - Elija el tipo de gráfico deseado
   - Haga clic en "Actualizar Gráfico"

4. **Exportar Resultados**:
   - Exporte el gráfico como imagen PNG
   - Exporte los datos como archivo CSV

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS para temas)
- JavaScript Vanilla
- [Chart.js](https://www.chartjs.org/) - Para la generación de gráficos
- [Papa Parse](https://www.papaparse.com/) - Para el análisis de archivos CSV

## Estructura del Proyecto

```
.
├── index.html          # Estructura principal de la aplicación
├── styles.css         # Estilos CSS
├── app.js             # Lógica de la aplicación
└── README.md          # Este archivo
```

## Accesibilidad

La aplicación ha sido desarrollada siguiendo las pautas de accesibilidad WCAG 2.1, incluyendo:

1. **Navegación por Teclado**:
   - Navegación completa mediante teclado
   - Atajos de teclado accesibles
   - Foco visible en elementos interactivos

2. **Contraste y Legibilidad**:
   - Alto contraste entre texto y fondo
   - Tamaño de fuente escalable
   - Soporte para modo oscuro

3. **ARIA y Semántica**:
   - Roles ARIA apropiados
   - Etiquetas descriptivas
   - Estados y propiedades ARIA

4. **Navegación por Voz**:
   - Estructura lógica de encabezados
   - Texto alternativo para elementos no textuales
   - Descripciones para gráficos

## Personalización

### Modo Oscuro/Claro

La aplicación incluye un conmutador de tema en la esquina superior derecha. La preferencia del usuario se guarda en el almacenamiento local del navegador.

### Personalización de Gráficos

- **Tipos de Gráficos Disponibles**:
  - Barras verticales
  - Barras horizontales
  - Líneas
  - Gráfico de torta

## Limitaciones Conocidas

- El tamaño máximo de archivo está limitado por la memoria del navegador
- Algunos formatos de CSV complejos pueden requerir ajustes
- El rendimiento puede verse afectado con conjuntos de datos muy grandes


## Créditos

- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Papa Parse](https://www.papaparse.com/) - Analizador de CSV
- [Google Fonts](https://fonts.google.com/) - Fuentes utilizadas

---

