// loadComponents.js
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar.html", "navbar-container");
    loadComponent("sidebar.html", "sidebar-container");
});

function loadComponent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}