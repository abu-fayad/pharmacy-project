document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("salesChart").getContext("2d");

    let salesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Day", "Week", "Month", "Year"],
            datasets: [{
                label: "Sales",
                data: [120, 500, 1500, 7000],
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
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
        updateSalesTable(salesChart.data); // تحديث الجدول تلقائيًا
    };

    window.showSalesTable = function () {
        updateSalesTable(salesChart.data);
        document.getElementById("salesTable").classList.remove("hidden");
    };

    function updateSalesTable(chartData) {
        const tableBody = document.querySelector("#salesTable tbody");
        tableBody.innerHTML = "";

        chartData.labels.forEach((label, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td class="border px-4 py-2">${label}</td><td class="border px-4 py-2">${chartData.datasets[0].data[index]}</td>`;
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
});