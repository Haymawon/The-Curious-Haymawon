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

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("active");
  });
});

// Initialize page and EmailJS after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  emailjs.init("cDTZxdP7v5xsKrxH3");

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Create or select a status message element inside the form
      let statusMsg = document.getElementById("status-message");
      if (!statusMsg) {
        statusMsg = document.createElement("div");
        statusMsg.id = "status-message";
        this.appendChild(statusMsg);
      }
      const container = document.querySelector(".container");
      statusMsg.innerHTML = "Sending...";
      statusMsg.className = "message";

      emailjs
        .sendForm("service_6lrz0do", "template_xkz0dbu", this)
        .then(() => {
          statusMsg.innerHTML = "Your message has been sent!";
          statusMsg.className = "message success";
          this.reset();
        })
        .catch((err) => {
          console.error("FAILED...", err);
          statusMsg.innerHTML = "Failed to send message. Please try again.";
          statusMsg.className = "message error";

          // Add error shake effect
          if (container) {
            container.classList.add("shake");
          }
          setTimeout(() => {
            container.classList.remove("shake");
          }, 500);
        });
    });
});
