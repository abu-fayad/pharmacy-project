document.addEventListener("DOMContentLoaded", function () {
    // التعامل مع Navbar أو أي وظائف مشتركة أخرى
    setupNavbar();

    // إضافة وظائف مشتركة مثل تحميل البيانات أو إعداد الرسومات البيانية
    initializeCharts();
});

function setupNavbar() {
    // إضافة وظائف Navbar مثل التبديل بين اللغات أو الخروج
    console.log("Navbar setup complete.");
}

function initializeCharts() {
    // تهيئة الرسومات البيانية
    if (document.getElementById("salesChart")) {
        setupSalesChart();
    }

    if (document.getElementById("medicineChart")) {
        setupMedicineChart();
    }
}

function setupSalesChart() {
    const ctx = document.getElementById("salesChart").getContext("2d");
    let salesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Day", "Week", "Month", "Year"],
            datasets: [{
                label: "Sales",
                data: [120, 500, 1500, 7000],
                borderColor: "#4A90E2",
                backgroundColor: "rgba(74, 144, 226, 0.2)",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: "#B0C4DE"
                    }
                },
                y: {
                    grid: {
                        color: "#B0C4DE"
                    }
                }
            }
        }
    });

    window.updateSalesData = function (period) {
        const newData = {
            day: [130, 520, 1600, 7100],
            week: [140, 530, 1700, 7200],
            month: [150, 540, 1800, 7300],
            year: [160, 550, 1900, 7400]
        };

        salesChart.data.datasets[0].data = newData[period];
        salesChart.update();
        updateSalesTable(salesChart.data);
    };

    window.showSalesTable = function () {
        updateSalesTable(salesChart.data);
        document.getElementById("salesTable").classList.remove("d-none");
    };

    function updateSalesTable(chartData) {
        const tableBody = document.querySelector("#salesTable tbody");
        tableBody.innerHTML = "";

        chartData.labels.forEach((label, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td class="border bg-light">${label}</td><td class="border bg-light">${chartData.datasets[0].data[index]}</td>`;
            tableBody.appendChild(row);
        });
    }

    window.downloadSalesExcel = function () {
        let table = document.getElementById("salesTable");
        let wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, "Sales_Report.xlsx");
    };

    window.printChartPDF = function (canvasId, title) {
        const canvas = document.getElementById(canvasId);
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        doc.addImage(imgData, "PNG", 10, 20, 180, 100);
        doc.save(`${title}.pdf`);
    };
}

function setupMedicineChart() {
    const ctx = document.getElementById("medicineChart").getContext("2d");
    let medicineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Stock", "Expiring Soon", "Out of Stock"],
            datasets: [{
                label: "Medicine Levels",
                data: [200, 50, 10],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    window.updateMedicineData = function (category) {
        const newData = {
            stock: [220, 45, 15],
            expiring: [210, 60, 12],
            outOfStock: [190, 30, 8]
        };

        medicineChart.data.datasets[0].data = newData[category];
        medicineChart.update();
        updateMedicineTable(medicineChart.data);
    };

    window.showMedicineTable = function () {
        updateMedicineTable(medicineChart.data);
        const table = document.getElementById("medicineTable");
        table.classList.remove("d-none");
        setTimeout(() => {
            medicineChart.resize();
        }, 300);
    };

    function updateMedicineTable(chartData) {
        const tableBody = document.querySelector("#medicineTable tbody");
        tableBody.innerHTML = "";

        chartData.labels.forEach((label, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td class="border bg-light">${label}</td><td class="border bg-light">${chartData.datasets[0].data[index]}</td>`;
            tableBody.appendChild(row);
        });
    }

    window.downloadMedicineExcel = function () {
        let table = document.getElementById("medicineTable");
        let wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, "Medicine_Report.xlsx");
    };

    window.printChartPDF = function (canvasId, title) {
        const canvas = document.getElementById(canvasId);
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        doc.addImage(imgData, "PNG", 10, 20, 180, 100);
        doc.save(`${title}.pdf`);
    };
}