function saveManagerSettings() {
    const manager = JSON.parse(localStorage.getItem('managerProfile')) || {};
    
    const phoneInput = document.getElementById('managerPhone');
    const phoneRegex = /^01[0-9]{9}$/;
    
    if (!phoneRegex.test(phoneInput.value)) {
        alert('Please enter a valid Egyptian phone number starting with 01 and containing exactly 11 digits.');
        return;
    }
    
    manager.email = document.getElementById('managerEmail').value;
    manager.phone = phoneInput.value;
    manager.password = document.getElementById('managerPassword').value;
    localStorage.setItem('managerProfile', JSON.stringify(manager));
    alert('Manager profile saved successfully!');
}

function validatePhoneNumber(input) {
    input.value = input.value.replace(/\D/g, ''); // يمنع الحروف تمامًا
    
    if (input.value.length > 11) {
        input.value = input.value.slice(0, 11); // يمنع الإدخال بأكثر من 11 رقمًا
    }
    
    if (input.value.length >= 2 && !input.value.startsWith("01")) {
        input.value = "01"; // يمنع الأرقام التي لا تبدأ بـ 01
        alert("Phone number must start with 01");
    }
}

window.onload = function() {
    let manager = JSON.parse(localStorage.getItem('managerProfile')) || {};
    document.getElementById('managerId').value = manager.id || '';
    document.getElementById('managerName').value = manager.name || '';
    document.getElementById('managerEmail').value = manager.email || '';
    document.getElementById('managerPhone').value = manager.phone || '';
    document.getElementById('managerAge').value = manager.age || '';
    document.getElementById('managerPassword').value = manager.password || '';
    document.getElementById('managerBranch').value = manager.branch || '';
};
