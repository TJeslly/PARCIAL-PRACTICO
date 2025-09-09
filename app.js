document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const csvInput = document.getElementById('csvInput');
    const fileInput = document.getElementById('fileInput');
    const parseBtn = document.getElementById('parseBtn');
    const clearBtn = document.getElementById('clearBtn');
    const dataTable = document.getElementById('dataTable');
    const dataSection = document.querySelector('.data-section');
    const chartSection = document.querySelector('.chart-section');
    const xAxisSelect = document.getElementById('xAxisSelect');
    const yAxisSelect = document.getElementById('yAxisSelect');
    const chartType = document.getElementById('chartType');
    const updateChartBtn = document.getElementById('updateChartBtn');
    const exportChartBtn = document.getElementById('exportChartBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    const errorToast = document.getElementById('errorToast');
    const errorMessage = document.getElementById('errorMessage');
    const closeToast = document.querySelector('.close-toast');

    let parsedData = [];
    let currentChart = null;

    // Initialize the application
    function init() {
        setupEventListeners();
        loadThemePreference();
        setupSkipLink();
    }

    // Set up all event listeners
    function setupEventListeners() {
        parseBtn.addEventListener('click', handleParse);
        clearBtn.addEventListener('click', resetApp);
        fileInput.addEventListener('change', handleFileUpload);
        updateChartBtn.addEventListener('click', updateChart);
        exportChartBtn.addEventListener('click', exportChart);
        exportCsvBtn.addEventListener('click', exportToCsv);
        searchInput.addEventListener('input', filterTable);
        themeToggle.addEventListener('click', toggleTheme);
        closeToast.addEventListener('click', hideToast);
    }

    // Handle CSV parsing
    function handleParse() {
        const csvText = csvInput.value.trim();
        
        if (!csvText) {
            showError('Por favor ingrese datos CSV o seleccione un archivo');
            return;
        }

        try {
            const results = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                transform: value => value.trim()
            });

            if (results.errors.length > 0) {
                const errorMessages = results.errors.map(err => `Línea ${err.row}: ${err.message}`).join('\n');
                showError(`Error al analizar el CSV:\n${errorMessages}`);
                return;
            }

            parsedData = results.data;
            
            if (parsedData.length === 0) {
                showError('El archivo CSV está vacío o no contiene datos válidos');
                return;
            }

            // Show data sections
            dataSection.hidden = false;
            chartSection.hidden = false;

            // Render table and update chart controls
            renderTable(parsedData);
            updateChartControls(parsedData[0]);
            
            // Auto-generate initial chart
            setTimeout(updateChart, 100);
            
            // Show success message
            showToast('Datos cargados correctamente', 'success');
            
        } catch (error) {
            showError(`Error al procesar el archivo CSV: ${error.message}`);
        }
    }

    // Handle file upload
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            csvInput.value = e.target.result;
            // Auto-parse the file after loading
            handleParse();
        };
        reader.onerror = function() {
            showError('Error al leer el archivo');
        };
        reader.readAsText(file);
    }

    // Render data table
    function renderTable(data) {
        if (!data || data.length === 0) return;

        // Clear existing table
        dataTable.innerHTML = '';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Get headers from the first data row
        const headers = Object.keys(data[0]);
        
        // Add header cells
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.setAttribute('scope', 'col');
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        dataTable.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add data rows
        data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.setAttribute('role', 'row');
            if (rowIndex % 2 === 0) {
                tr.classList.add('even');
            }

            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header] || '';
                td.setAttribute('data-label', header);
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });

        dataTable.appendChild(tbody);
    }

    // Update chart controls with available columns
    function updateChartControls(firstRow) {
        const headers = Object.keys(firstRow);
        
        // Clear existing options
        xAxisSelect.innerHTML = '';
        yAxisSelect.innerHTML = '';
        
        // Add options to selects
        headers.forEach(header => {
            // For X-axis, prefer text/non-numeric columns
            const optionX = document.createElement('option');
            optionX.value = header;
            optionX.textContent = header;
            xAxisSelect.appendChild(optionX);
            
            // For Y-axis, prefer numeric columns
            const optionY = document.createElement('option');
            optionY.value = header;
            optionY.textContent = header;
            yAxisSelect.appendChild(optionY);
        });
        
        // Set default selections
        if (headers.length >= 2) {
            xAxisSelect.value = headers[0];
            yAxisSelect.value = headers[1];
        }
    }

    // Update chart based on user selections
    function updateChart() {
        if (parsedData.length === 0) return;
        
        const xAxis = xAxisSelect.value;
        const yAxis = yAxisSelect.value;
        const type = chartType.value;
        
        if (!xAxis || !yAxis) {
            showError('Seleccione los ejes X e Y para generar el gráfico');
            return;
        }
        
        // Extract data for chart
        const labels = parsedData.map(item => item[xAxis]);
        const dataValues = parsedData.map(item => parseFloat(item[yAxis]) || 0);
        
        // Get chart container
        const ctx = document.getElementById('dataChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (currentChart) {
            currentChart.destroy();
        }
        
        // Create new chart
        currentChart = new Chart(ctx, {
            type: type === 'horizontalBar' ? 'bar' : type,
            data: {
                labels: labels,
                datasets: [{
                    label: yAxis,
                    data: dataValues,
                    backgroundColor: getChartColors(dataValues.length),
                    borderColor: getChartColors(dataValues.length, 0.8),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: type === 'horizontalBar' ? {
                        beginAtZero: true
                    } : {
                        title: {
                            display: true,
                            text: xAxis
                        }
                    },
                    y: type === 'horizontalBar' ? {
                        title: {
                            display: true,
                            text: yAxis
                        }
                    } : {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: type !== 'pie',
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: `${yAxis} por ${xAxis}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}`;
                            }
                        }
                    }
                },
                indexAxis: type === 'horizontalBar' ? 'y' : 'x',
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // Generate colors for chart
    function getChartColors(count, opacity = 0.6) {
        const colors = [
            'rgba(54, 162, 235, OPACITY)',
            'rgba(255, 99, 132, OPACITY)',
            'rgba(75, 192, 192, OPACITY)',
            'rgba(255, 159, 64, OPACITY)',
            'rgba(153, 102, 255, OPACITY)',
            'rgba(255, 205, 86, OPACITY)',
            'rgba(201, 203, 207, OPACITY)',
            'rgba(54, 162, 235, OPACITY)',
            'rgba(255, 99, 132, OPACITY)',
            'rgba(75, 192, 192, OPACITY)'
        ];
        
        return colors.slice(0, count).map(color => color.replace('OPACITY', opacity));
    }

    // Export chart as PNG
    function exportChart() {
        if (!currentChart) {
            showError('No hay gráfico para exportar');
            return;
        }
        
        const link = document.createElement('a');
        link.download = `grafico-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = currentChart.toBase64Image('image/png', 1);
        link.click();
    }

    // Export data as CSV
    function exportToCsv() {
        if (parsedData.length === 0) {
            showError('No hay datos para exportar');
            return;
        }
        
        const csv = Papa.unparse(parsedData);
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `datos-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Filter table based on search input
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = dataTable.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    // Toggle between light and dark theme
    function toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const theme = isDark ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    // Load theme preference from localStorage
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorToast.hidden = false;
        errorToast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(hideToast, 5000);
    }

    // Show toast notification
    function showToast(message, type = 'error') {
        errorMessage.textContent = message;
        errorToast.hidden = false;
        errorToast.className = `toast show ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(hideToast, 5000);
    }

    // Hide toast notification
    function hideToast() {
        errorToast.classList.remove('show');
        setTimeout(() => {
            errorToast.hidden = true;
        }, 300);
    }

    // Reset the application
    function resetApp() {
        csvInput.value = '';
        fileInput.value = '';
        parsedData = [];
        dataSection.hidden = true;
        chartSection.hidden = true;
        searchInput.value = '';
        
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
    }

    // Set up skip to content link
    function setupSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Saltar al contenido principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Initialize the app
    init();
});
