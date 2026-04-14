// Nav Links
const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if(linkPage === currentPage || (linkPage === 'index.html' && currentPage === '')){
        link.classList.add("active");
    }
});

// Tools Category Logic
const categories = document.querySelectorAll('.tool-categories li');
const toolFrame = document.getElementById('tool-frame');
const urlBar = document.getElementById('tool-url-bar');

if (categories.length > 0 && toolFrame && urlBar) {
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            // Remove active
            categories.forEach(c => c.classList.remove('active'));
            // Add active
            cat.classList.add('active');
            
            // Update iframe
            const src = cat.getAttribute('data-tool-src');
            toolFrame.src = src;
            
            // Update URL bar snippet
            urlBar.textContent = src;
        });
    });
}

// Initialize VanillaTilt if available
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}