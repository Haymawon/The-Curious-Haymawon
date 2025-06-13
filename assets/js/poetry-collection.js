// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 25;

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

// Poem filtering
const filters = document.querySelectorAll(".poem-filter");
const poems = document.querySelectorAll(".poem-card");

filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    // Update active filter
    filters.forEach((f) => f.classList.remove("active"));
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    poems.forEach((poem) => {
      if (filterValue === "all") {
        poem.style.display = "flex";
      } else {
        const tags = poem.getAttribute("data-tags");
        if (tags.includes(filterValue)) {
          poem.style.display = "flex";
        } else {
          poem.style.display = "none";
        }
      }
    });
  });
});

// Poem search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();

  poems.forEach((poem) => {
    const title = poem.querySelector(".poem-title").textContent.toLowerCase();
    const content = poem
      .querySelector(".poem-content")
      .textContent.toLowerCase();
    const tags = poem.getAttribute("data-tags").toLowerCase();

    if (
      title.includes(searchTerm) ||
      content.includes(searchTerm) ||
      tags.includes(searchTerm)
    ) {
      poem.style.display = "flex";
    } else {
      poem.style.display = "none";
    }
  });
});

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
});
