document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar.html", "navbar-container");
    loadComponent("sidebar.html", "sidebar-container", initSidebar);

    const reportLink = document.getElementById("report-link");
    const submenu = document.getElementById("report-submenu");
    const arrow = document.getElementById("report-arrow");

    reportLink.addEventListener("click", function (e) {
        e.preventDefault();
        submenu.classList.toggle("d-none");
        if (submenu.classList.contains("d-none")) {
            arrow.style.transform = "rotate(0deg)";
        } else {
            arrow.style.transform = "rotate(180deg)";
        }
    });
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
            submenu.classList.toggle("d-none");
            arrow.classList.toggle("rotate-180");
        });

        console.log("✅ Sidebar initialized successfully.");
    }, 200);
}