document.addEventListener("DOMContentLoaded", function () {
    let salesCtx = document.getElementById('salesChart').getContext('2d');
    let medicineCtx = document.getElementById('medicineChart').getContext('2d');

    let salesChart = createChart(salesCtx, salesData.day);
    let medicineChart = createChart(medicineCtx, medicineData.stock);

    window.updateSalesData = function (type) {
        refreshChart(salesChart, salesData[type]);
        showSalesTable(type);  // تحديث الجدول بناءً على النوع
    };

    window.updateMedicineData = function (type) {
        refreshChart(medicineChart, medicineData[type]);
        showMedicineTable(type);  // تحديث الجدول بناءً على النوع
    };
});

// Function to create chart
function createChart(ctx, data) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label,
                data: data.data,
                backgroundColor: data.borderColor,
                borderColor: data.borderColor,
                borderWidth: 2
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Function to refresh chart data
function refreshChart(chart, newData) {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.data;
    chart.data.datasets[0].label = newData.label;
    chart.update();
}

// Function to show Sales Table dynamically
function showSalesTable(type) {
    let tableContainer = document.getElementById('salesTableContainer');
    tableContainer.classList.remove("hidden");

    let salesTableBody = document.getElementById('salesTableBody');
    salesTableBody.innerHTML = "";  // Clear existing table content

    let data = salesData[type];  // Get the selected data (day, week, month, year)
    data.labels.forEach((label, index) => {
        let row = document.createElement("tr");
        let dateCell = document.createElement("td");
        dateCell.textContent = label;
        let salesCell = document.createElement("td");
        salesCell.textContent = data.data[index];
        row.appendChild(dateCell);
        row.appendChild(salesCell);
        salesTableBody.appendChild(row);
    });
}

// Function to show Medicine Table dynamically
function showMedicineTable(type) {
    let tableContainer = document.getElementById('medicineTableContainer');
    tableContainer.classList.remove("hidden");

    let medicineTableBody = document.getElementById('medicineTableBody');
    medicineTableBody.innerHTML = "";  // Clear existing table content

    let data = medicineData[type];  // Get the selected data (stock, expiring, outOfStock)
    data.labels.forEach((label, index) => {
        let row = document.createElement("tr");
        let medicineCell = document.createElement("td");
        medicineCell.textContent = label;
        let stockCell = document.createElement("td");
        stockCell.textContent = data.data[index];
        row.appendChild(medicineCell);
        row.appendChild(stockCell);
        medicineTableBody.appendChild(row);
    });
}

// Function to print chart and table as PDF
function printChartWithTablePDF(canvasId, tableId, title) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const canvas = document.getElementById(canvasId);
    const imgData = canvas.toDataURL("image/png");

    doc.setFontSize(18);
    doc.text(title, 15, 20);
    doc.addImage(imgData, 'PNG', 15, 30, 180, 100);

    // Add the table
    let table = document.getElementById(tableId);
    let tableData = table.innerHTML;
    doc.setFontSize(10);
    doc.text(tableData, 15, 140);

    doc.save(`${title}.pdf`);
}

// Download Sales Data as Excel
function downloadSalesExcel() {
    let ws = XLSX.utils.table_to_sheet(document.getElementById('salesTable'));
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "Sales_Report.xlsx");
}

// Download Medicine Data as Excel
function downloadMedicineExcel() {
    let ws = XLSX.utils.table_to_sheet(document.getElementById('medicineTable'));
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Medicine Stock");
    XLSX.writeFile(wb, "Medicine_Stock.xlsx");
}

// Sample data for sales and medicine (you can replace this with actual data from your backend)
const salesData = {
    day: { labels: ['8 AM', '12 PM', '4 PM', '8 PM'], data: [120, 200, 150, 180], borderColor: 'red', label: 'Daily Sales' },
    week: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [500, 600, 700, 550, 650, 750, 800], borderColor: 'blue', label: 'Weekly Sales' },
    month: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [2500, 3000, 2800, 3200], borderColor: 'green', label: 'Monthly Sales' },
    year: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: [10000, 12000, 9000, 11000, 10500, 11500, 14000, 13000, 12500, 15000, 16000, 17000], borderColor: 'purple', label: 'Yearly Sales' }
};

const medicineData = {
    stock: { labels: ['Medicine A', 'Medicine B', 'Medicine C'], data: [50, 80, 30], borderColor: 'green', label: 'Stock Levels' },
    expiring: { labels: ['Medicine D', 'Medicine E', 'Medicine F'], data: [10, 20, 15], borderColor: 'orange', label: 'Expiring Soon' },
    outOfStock: { labels: ['Medicine G', 'Medicine H'], data: [0, 0], borderColor: 'red', label: 'Out of Stock' }
};