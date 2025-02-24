document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar.html", "navbar-container");
    loadComponent("sidebar.html", "sidebar-container", initSidebar);
});

function loadComponent(url, containerId, callback = null) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}

function initSidebar() {
    setTimeout(() => {
        const reportLink = document.getElementById("report-link");
        const submenu = document.getElementById("report-submenu");
        const arrow = document.getElementById("report-arrow");

        if (!reportLink || !submenu || !arrow) {
            console.error("Sidebar elements not found. Check your sidebar.html.");
            return;
        }

        reportLink.addEventListener("click", function (event) {
            event.preventDefault();
            submenu.classList.toggle("hidden");
            arrow.classList.toggle("rotate-180");
        });

        console.log("✅ Sidebar initialized successfully.");
    }, 200);
}