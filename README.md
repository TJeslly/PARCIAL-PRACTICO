# Visualizador Interactivo de Datos CSV

Una aplicación web de una sola página (SPA) que funciona como una herramienta de inteligencia de negocios (BI) básica, permitiendo visualizar y analizar datos en formato CSV de manera interactiva, con funciones avanzadas de accesibilidad.

## 🚀 Características Principales

### 📊 Visualización de Datos
- **Tabla Interactiva**
  - Muestra los datos CSV de forma estructurada
  - Ordenamiento por columnas
  - Diseño responsive para todos los dispositivos
  - Filtrado de datos

### 📈 Gráficos Personalizables
- **Tipos de Gráficos**
  - Barras (verticales/horizontales)
  - Líneas
  - Torta
  - Dona
  - Radar
- **Personalización**
  - Selección libre de ejes X e Y
  - Orientación horizontal/vertical
  - Exportación a imagen PNG
  - Interactividad con tooltips

### 📂 Manejo de Datos
- **Formatos de Entrada**
  - Pegado directo de datos CSV
  - Carga de archivos CSV
- **Opciones de Delimitadores**
  - Coma (,)
  - Punto y coma (;)
  - Tabulador (\t)
- **Validación de Datos**
  - Detección de CSV mal formateados
  - Mensajes de error descriptivos

### ♿ Accesibilidad (WCAG 2.1 Compliant)
- **Ajustes Visuales**
  - Modo oscuro/claro
  - Alto contraste
  - Tamaño de texto ajustable
- **Navegación**
  - Compatible con teclado
  - Soporte para lectores de pantalla
  - Etiquetas ARIA y roles semánticos
- **Personalización**
  - Interfaz intuitiva
  - Retroalimentación clara
  - Controles accesibles

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a Internet (para cargar las bibliotecas CDN)

## Cómo usar

1. Abra el archivo `public/index.html` en su navegador web
2. Pegue los datos CSV en el área de texto o cargue un archivo CSV
3. Personalice la visualización utilizando los controles proporcionados
4. Explore los datos en la tabla y en los gráficos
5. Utilice el menú de accesibilidad (ícono en la esquina inferior derecha) para ajustar la visualización según sus necesidades

## Estructura del proyecto

```
csv-visualizer/
├── public/
│   └── index.html          # Página principal de la aplicación
├── src/
│   ├── index.js           # Código fuente principal de la aplicación
│   └── styles.css         # Estilos personalizados
└── README.md              # Este archivo
```

## Accesibilidad

Esta aplicación ha sido diseñada siguiendo las pautas de accesibilidad WCAG 2.1, incluyendo:

1. **Perceptible**
   - Texto con suficiente contraste
   - Texto redimensionable sin pérdida de funcionalidad
   - Alternativas de texto para elementos no textuales

2. **Operable**
   - Navegación completa por teclado
   - Tiempo suficiente para leer y usar el contenido
   - No se utilizan patrones que se sabe que causan convulsiones

3. **Comprensible**
   - Texto legible y comprensible
   - Las páginas se muestran de manera predecible
   - Asistencia para evitar y corregir errores

4. **Robusto**
   - Compatible con tecnologías de asistencia
   - Compatibilidad con navegadores actuales y futuros

## Personalización

Puede personalizar la aplicación modificando los archivos en la carpeta `src/`:

- `styles.css` - Para modificar los estilos visuales
- `index.js` - Para modificar la funcionalidad de la aplicación

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo `LICENSE` para más información.

---

Desarrollado como parte de un proyecto de ingeniería con enfoque en accesibilidad y usabilidad.
