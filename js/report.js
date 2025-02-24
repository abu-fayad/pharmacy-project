document.addEventListener("DOMContentLoaded", function () {
    let salesCtx = document.getElementById('salesChart').getContext('2d');
    let medicineCtx = document.getElementById('medicineChart').getContext('2d');

    let salesChart = createChart(salesCtx, salesData.day);
    let medicineChart = createChart(medicineCtx, medicineData.stock);

    window.updateSalesData = function (type) {
        refreshChart(salesChart, salesData[type]);
        updateSalesTable(salesData[type]);
    };

    window.updateMedicineData = function (type) {
        refreshChart(medicineChart, medicineData[type]);
        updateMedicineTable(medicineData[type]);
    };
});

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

function refreshChart(chart, newData) {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.data;
    chart.data.datasets[0].label = newData.label;
    chart.update();
}

function updateSalesTable(data) {
    const tableBody = document.querySelector('#salesTable tbody');
    tableBody.innerHTML = ''; // Clear existing table data
    data.labels.forEach((label, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${label}</td><td>${data.data[index]}</td>`;
        tableBody.appendChild(row);
    });
    document.getElementById('salesTable').classList.remove('hidden');
    document.getElementById('medicineTable').classList.add('hidden'); // Hide the other table
}

function updateMedicineTable(data) {
    const tableBody = document.querySelector('#medicineTable tbody');
    tableBody.innerHTML = ''; // Clear existing table data
    data.labels.forEach((label, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${label}</td><td>${data.data[index]}</td>`;
        tableBody.appendChild(row);
    });
    document.getElementById('medicineTable').classList.remove('hidden');
    document.getElementById('salesTable').classList.add('hidden'); // Hide the other table
}

function printChartPDF(canvasId, title) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const canvas = document.getElementById(canvasId);
    const imgData = canvas.toDataURL("image/png");

    doc.setFontSize(18);
    doc.text(title, 15, 20);
    doc.addImage(imgData, 'PNG', 15, 30, 180, 100);
    doc.save(`${title}.pdf`);
}

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

function downloadSalesExcel() {
    const table = document.querySelector('#salesTable');
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sales Data' });
    XLSX.writeFile(workbook, 'sales_data.xlsx');
}

function downloadMedicineExcel() {
    const table = document.querySelector('#medicineTable');
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Medicine Stock' });
    XLSX.writeFile(workbook, 'medicine_stock.xlsx');
}