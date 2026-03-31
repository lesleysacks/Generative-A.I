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

// Three.js Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });
    
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        
        particlesMesh.rotation.y += 0.002 + (targetX - particlesMesh.rotation.y) * 0.05;
        particlesMesh.rotation.x += 0.002 + (targetY - particlesMesh.rotation.x) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize VanillaTilt if available
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}