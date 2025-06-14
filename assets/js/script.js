// Wait for EmailJS script to load before initializing
document.addEventListener("DOMContentLoaded", function () {
  function initEmailJS() {
    if (typeof emailjs !== "undefined" && !window._emailjsInitialized) {
      emailjs.init("9V6x1dzoYd8bb5iQa");
      window._emailjsInitialized = true;
    }
  }
  if (typeof emailjs !== "undefined") {
    initEmailJS();
  } else {
    // Fallback: try again after script loads
    const script = document.querySelector('script[src*="email.min.js"]');
    if (script) {
      script.addEventListener("load", initEmailJS);
    }
  }
});

// Sample JSON data for blog posts
const blogPosts = [
  {
    id: 1,
    filename: "/posts/food-and-culture.html",
    title: "The Timeless Joy of Traditional Home Cooking",
    excerpt:
      "Discover how ancestral recipes, family rituals, and handmade meals connect us to our roots, nourish our bodies, and create lasting memories across generations.",
    date: "June 2, 2025",
    tags: ["Food", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    readTime: 6,
  },
  {
    id: 2,
    filename: "/posts/how-to-read-tarot.html",
    title: "How to Read Tarot: A Straightforward Guide",
    excerpt:
      "No fluff, no mystical gatekeeping—just a clear, honest, and practical explanation of how to read tarot cards, even if you’ve never touched a deck in your life.",
    date: "June 2, 2025",
    tags: [
      "Spirituality",
      "Lifestyle",
      "Divination",
      "Tarot",
      "Self-Discovery",
      "Personal Growth",
    ],
    image: "/tarot.jpg",

    readTime: 8,
  },
];

// All available topics
const topics = [
  "Lifestyle",
  "Mindfulness",
  "Travel",
  "Books",
  "Creativity",
  "Food",
  "Wellness",
  "Productivity",
  "Relationships",
  "Nature",
  "Photography",
  "Art",
  "Music",
  "Reflections",
  "Adventure",
];

// Function to display posts
function displayPosts(posts = blogPosts) {
  const postsGrid = document.getElementById("postsGrid");
  postsGrid.innerHTML = "";

  posts.forEach((post) => {
    const tagsHtml = post.tags
      .map((tag) => `<span class="post-tag-sm">${tag}</span>`)
      .join("");

    const postCard = `
        <div class="post-card" onclick="window.location.href='${post.filename}'">
          <div class="post-card-image">
            <img src="${post.image}" alt="${post.title}">
          </div>
          <div class="post-card-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="post-card-footer">
              <div class="post-tags">
                ${tagsHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    postsGrid.innerHTML += postCard;
  });
}

// Favorites data
const favorites = [
  {
    title: "The Midnight Library",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "A novel about regret, hope and second chances",
  },
  {
    title: "Soulful Jazz",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "My go-to playlist for rainy evenings",
  },
  {
    title: "Matcha Latte",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Morning ritual that never fails to energize",
  },
  {
    title: "Nature Walks",
    category: "Activities",
    image:
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Reconnecting with the simple joys of life",
  },
  {
    title: "Minimalism",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Finding beauty in simplicity and intention",
  },
  {
    title: "Watercolor Art",
    category: "Hobbies",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Creative outlet for emotional expression",
  },
];

// Function to display favorites
function displayFavorites() {
  const gallery = document.getElementById("favoritesGallery");
  gallery.innerHTML = "";

  favorites.forEach((item) => {
    const favoriteItem = `
            <div class="favorite-item">
              <div class="favorite-image">
                <img src="${item.image}" alt="${item.title}" />
                <div class="favorite-overlay">${item.description}</div>
              </div>
              <div class="favorite-content">
                <h3>${item.title}</h3>
                <div class="favorite-category">${item.category}</div>
              </div>
            </div>
          `;
    gallery.innerHTML += favoriteItem;
  });
}

// Update initialization function
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  displayFavorites(); // Replaced displayTopics
  createParticles();
});

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

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
  displayPosts(filteredPosts);
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

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  // displayTopics(); // Removed because function does not exist
  createParticles();
});
const checkbox = document.getElementById("accept-checkbox");
const button = document.getElementById("enter-btn");
const overlay = document.getElementById("disclaimer-overlay");

// Check localStorage on load
window.addEventListener("DOMContentLoaded", () => {
  const hasAccepted = localStorage.getItem("disclaimerAccepted");

  if (hasAccepted === "true") {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  } else {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
});

// Handle checkbox interaction
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    button.disabled = false;
    button.classList.add("enabled");
  } else {
    button.disabled = true;
    button.classList.remove("enabled");
  }
});

// When user clicks "Enter"
button.addEventListener("click", () => {
  if (checkbox.checked) {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    localStorage.setItem("disclaimerAccepted", "true");
  }
});

// Newsletter Form Submission
function initEmailJSAndNewsletter() {
  if (typeof emailjs !== "undefined") {
    if (!window._emailjsInitialized) {
      emailjs.init("9V6x1dzoYd8bb5iQa");
      window._emailjsInitialized = true;
    }

    const form = document.getElementById("newsletter-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const messageDiv = document.getElementById("form-message");
        messageDiv.textContent = "Sending...";

        emailjs
          .sendForm("service_6lrz0do", "template_g86mlvt", form)
          .then(() => {
            messageDiv.textContent =
              "🎉 The Curious Haymawon! Check your inbox for our welcome email.";
            form.reset();
          })
          .catch((error) => {
            messageDiv.textContent =
              "❌ Oh no! The bookworms are confused. Please try again later.";
            console.error("EmailJS error:", error);
          });
      });
    }
  } else {
    console.warn("EmailJS not loaded yet.");
  }
}

// Wait until the emailjs script loads
const emailScript = document.querySelector('script[src*="email.min.js"]');
if (emailScript) {
  emailScript.addEventListener("load", initEmailJSAndNewsletter);
} else {
  // fallback in case script tag isn't there yet
  window.addEventListener("load", initEmailJSAndNewsletter);
}

let originalTitle = document.title;
let blinkInterval;

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Start blinking title
    blinkInterval = setInterval(() => {
      document.title =
        document.title === "Wait! Come back!"
          ? originalTitle
          : "Wait! Come back!";
    }, 1000); // change every 1 second
  } else {
    // Stop blinking and reset title
    clearInterval(blinkInterval);
    document.title = originalTitle;
  }
});
