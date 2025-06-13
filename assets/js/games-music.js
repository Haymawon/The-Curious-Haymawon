// Add subtle interactive animations
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector("i");
    icon.style.animation = "none";
    setTimeout(() => {
      icon.style.animation = "float 5s ease-in-out infinite";
    }, 10);
  });
});

// Create additional floating elements
const floatingContainer = document.querySelector(".floating-elements");
for (let i = 0; i < 8; i++) {
  const size = Math.floor(Math.random() * 40) + 20;
  const top = Math.floor(Math.random() * 100);
  const left = Math.floor(Math.random() * 100);
  const delay = Math.floor(Math.random() * 20) - 10;
  const duration = Math.floor(Math.random() * 20) + 25;

  const element = document.createElement("div");
  element.classList.add("floating-element");
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.top = `${top}%`;
  element.style.left = `${left}%`;
  element.style.animationDuration = `${duration}s`;
  element.style.animationDelay = `${delay}s`;

  // Random pastel color
  const colors = [
    "rgba(255, 209, 102, 0.1)",
    "rgba(166, 227, 233, 0.1)",
    "rgba(255, 158, 192, 0.1)",
  ];
  element.style.background = colors[Math.floor(Math.random() * colors.length)];

  floatingContainer.appendChild(element);
}
