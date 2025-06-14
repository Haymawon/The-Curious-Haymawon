// Create floating tea leaves
function createTeaLeaves() {
  const container = document.getElementById("teaLeaves");
  const leafCount = 25;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("div");
    leaf.classList.add("tea-leaf");

    // Random properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 15 + 15;
    const opacity = Math.random() * 0.4 + 0.1;

    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.left = `${posX}%`;
    leaf.style.top = `${posY}%`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.opacity = opacity;

    container.appendChild(leaf);
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
    "Check out this beautiful article on finding peace in everyday rituals by Haymawon"
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
}

function shareOnTelegram() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "A Cup of Quiet: Finding Peace in Everyday Rituals"
  );
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareOnPinterest() {
  const url = encodeURIComponent(window.location.href);
  const media = encodeURIComponent(
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a"
  );
  const description = encodeURIComponent(
    "A Cup of Quiet: Finding Peace in Everyday Rituals"
  );
  window.open(
    `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`,
    "_blank"
  );
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  createTeaLeaves();
});

// Enhanced JS with close-on-click
window.addEventListener("load", () => {
  const overlay = document.getElementById("popup-overlay");

  // Show with animation
  setTimeout(() => {
    overlay.style.display = "flex";
    overlay.style.animation = "fadeIn 0.4s";
  }, 500);

  // Close functionality
  overlay.addEventListener("click", () => {
    overlay.style.animation = "fadeOut 0.4s";
    setTimeout(() => (overlay.style.display = "none"), 400);
  });

  // Auto-close after 5s
  setTimeout(() => {
    if (overlay.style.display !== "none") {
      overlay.style.animation = "fadeOut 0.4s";
      setTimeout(() => (overlay.style.display = "none"), 400);
    }
  }, 5000);
});
