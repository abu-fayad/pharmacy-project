// Inventory Stock Levels Chart
const ctx = document.getElementById('inventoryChart').getContext('2d');
const inventoryChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'line' or other types
    data: {
        labels: ['Aspirin', 'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Vitamin C'],
        datasets: [{
            label: 'Stock Levels',
            data: [50, 120, 80, 200, 150], // Example data
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true
    }
});

// Handle Add New Item Button Click
document.getElementById('addItemBtn').addEventListener('click', function() {
    alert('Add a new inventory item...');
});

// Handle Edit and Delete Button Clicks
const editButtons = document.querySelectorAll('#editBtn');
const deleteButtons = document.querySelectorAll('#deleteBtn');

editButtons.forEach(button => {
    button.addEventListener('click', function () {
        alert('Editing inventory item...');
    });
});

deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        alert('Deleting inventory item...');
    });
});