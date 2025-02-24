function displayStaff() {
    const staffList = document.getElementById('staffList');
    staffList.innerHTML = '';
    let staff = JSON.parse(localStorage.getItem('staff')) || [];
    staff.forEach(name => {
        let li = document.createElement('li');
        li.textContent = name;
        li.className = 'p-4 bg-blue-100 border-l-4 border-blue-500 text-gray-800 rounded-lg shadow-sm font-semibold';
        staffList.appendChild(li);
    });
}

window.onload = displayStaff;