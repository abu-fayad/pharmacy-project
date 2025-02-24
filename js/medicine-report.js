document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("medicineChart").getContext("2d");

    let medicineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Stock", "Expiring Soon", "Out of Stock"],
            datasets: [{
                label: "Medicine Levels",
                data: [200, 50, 10],
                borderColor: "red",
                borderWidth: 2,
                fill: false
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
        updateMedicineTable(medicineChart.data); // تحديث الجدول تلقائيًا
    };

    window.showMedicineTable = function () {
        updateMedicineTable(medicineChart.data);
        document.getElementById("medicineTable").classList.remove("hidden");
    };

    function updateMedicineTable(chartData) {
        const tableBody = document.querySelector("#medicineTable tbody");
        tableBody.innerHTML = "";

        chartData.labels.forEach((label, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td class="border px-4 py-2">${label}</td><td class="border px-4 py-2">${chartData.datasets[0].data[index]}</td>`;
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
});