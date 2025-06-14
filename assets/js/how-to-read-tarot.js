let blogPosts = [];

fetch("../posts.json") // adjust path if needed
  .then((response) => response.json())
  .then((data) => {
    blogPosts = data.posts;
    displayPosts();
  })
  .catch((error) => {
    console.error("Error loading posts.json:", error);
  });
// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Share functions
function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Check out this amazing article on slow living by Haymawon"
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
}

function shareOnTelegram() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("How to Read Tarot: A Straightforward Guide");
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareOnPinterest() {
  const url = encodeURIComponent(window.location.href);
  const media = encodeURIComponent(
    "/templates/tarot.jpg" // Adjust path if needed
  );
  const description = encodeURIComponent(
    "How to Read Tarot: A Straightforward Guide"
  );
  window.open(
    `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`,
    "_blank"
  );
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
});
