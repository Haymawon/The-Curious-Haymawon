// Topics data with descriptions
const topics = [
  {
    name: "Lifestyle",
    description:
      "Thoughts on intentional living, daily routines, and creating a meaningful life",
    posts: 2,
    icon: "fas fa-heart",
  },
  {
    name: "Mindfulness",
    description:
      "Practices for presence, meditation, and cultivating awareness",
    posts: 1,
    icon: "fas fa-leaf",
  },
  {
    name: "Philosophy",
    description:
      "Fragments of thought, questions without answers, and the quiet search for meaning in a meaningless world.",
    posts: 1,
    icon: "fas fa-brain",
  },
  {
    name: "Books",
    description: "Reviews, reading lists, and literary inspirations",
    posts: 0,
    icon: "fas fa-book-open",
  },
  {
    name: "Creativity",
    description:
      "Exploring the creative process, inspiration, and artistic expression",
    posts: 0,
    icon: "fas fa-paint-brush",
  },
  {
    name: "Food",
    description: "Recipes, culinary adventures, and mindful eating",
    posts: 1,
    icon: "fas fa-utensils",
  },
  {
    name: "Wellness",
    description: "Holistic health, self-care practices, and wellbeing",
    posts: 0,
    icon: "fas fa-spa",
  },
  {
    name: "Productivity",
    description: "Tips for focus, organization, and meaningful work",
    posts: 0,
    icon: "fas fa-tasks",
  },
  {
    name: "Relationships",
    description: "Building connections, communication, and community",
    posts: 0,
    icon: "fas fa-users",
  },
  {
    name: "Nature",
    description: "Connecting with the natural world and outdoor adventures",
    posts: 0,
    icon: "fas fa-tree",
  },
  {
    name: "Photography",
    description: "Visual storytelling, photo tips, and creative perspectives",
    posts: 0,
    icon: "fas fa-camera",
  },
  {
    name: "Art",
    description:
      "Exploring various art forms, artists, and creative expressions",
    posts: 0,
    icon: "fas fa-palette",
  },
  {
    name: "Music",
    description: "Playlists, artist features, and the power of sound",
    posts: 0,
    icon: "fas fa-music",
  },
  {
    name: "Reflections",
    description: "Personal insights, life lessons, and introspective thoughts",
    posts: 0,
    icon: "fas fa-lightbulb",
  },
  {
    name: "Adventure",
    description:
      "Exploring new places, trying new things, and embracing uncertainty",
    posts: 0,
    icon: "fas fa-mountain",
  },
  {
    name: "Poetry",
    description: "Original poems and poetic reflections",
    posts: 1,
    icon: "fas fa-feather",
  },
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    filename: "/templates/featured.html",
    title: "A Cup of Quiet: Finding Peace in Everyday Rituals",
    excerpt:
      "How I learned to create pockets of tranquility in the busiest of days by embracing simple, meaningful rituals that anchor me to the present moment.",
    date: "May 22, 2025",
    tags: ["Mindfulness", "Rituals"],
    image: "/images/thought-catalog-OJZB0VUQKKc-unsplash.jpg",

    readTime: 12,
  },

  {
    id: 2,
    filename: "/templates/posts/food-and-culture.html",
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
    id: 3,
    filename: "/templates/posts/how-to-read-tarot.html",
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
    image: "/images/tarot.jpg",

    readTime: 8,
  },
  {
    id: 4,
    filename: "/templates/posts/poetry-collection.html",
    title: "She Wrote What She Couldn't Say",
    excerpt: "A Collection of Poems About Love, Ache, and Unspoken Truths",
    date: "June 3, 2025",
    tags: ["Poetry", "Reflections", "Love", "Personal Growth"],
    image: "/images/mrika-selimi-1ZO0QLfGe0g-unsplash.jpg",
    readTime: 2,
  },
  {
    id: 5,
    filename: "/templates/posts/Do-We-Even-Exist.html",
    title: "Do We Even Exist",
    excerpt: "A Deep Dive into the Strange Mystery of Being Human",
    date: "June 11, 2025",
    tags: ["Philosophy", "Existentialism", "Self-Discovery"],
    image: "/images/A-person-who-thinks-all-the-time.jpg",
    readTime: 6,
  },
];

// Variables for state management
let selectedTopic = null;
let filteredPosts = [...blogPosts];

// Function to display topics
function displayTopics(topicsArray) {
  const topicsGrid = document.getElementById("topicsGrid");
  topicsGrid.innerHTML = "";

  topicsArray.forEach((topic) => {
    const topicCard = `
                    <div class="topic-card" data-topic="${topic.name}">
                        <i class="${topic.icon} fa-2x" style="color: var(--primary); margin-bottom: 15px;"></i>
                        <h3>${topic.name}</h3>
                        <p>${topic.description}</p>
                        <div class="topic-stats">
                            <span><i class="far fa-file-alt"></i> ${topic.posts} posts</span>
                        </div>
                    </div>
                `;

    topicsGrid.innerHTML += topicCard;
  });

  // Add event listeners to topic cards
  document.querySelectorAll(".topic-card").forEach((card) => {
    card.addEventListener("click", function () {
      const topic = this.getAttribute("data-topic");
      filterPostsByTopic(topic);
    });
  });
}

// Function to filter posts by topic
function filterPostsByTopic(topic) {
  selectedTopic = topic;

  // Update UI
  document.getElementById("currentTopic").textContent = topic;
  document.getElementById("currentTopicContainer").style.display = "flex";

  // Filter posts
  if (topic === "All Topics") {
    filteredPosts = [...blogPosts];
  } else {
    filteredPosts = blogPosts.filter((post) => post.tags.includes(topic));
  }

  displayPosts(filteredPosts);

  // Scroll to posts section
  document
    .querySelector(".posts-section")
    .scrollIntoView({ behavior: "smooth" });
}

// Function to display posts
function displayPosts(posts) {
  const postsGrid = document.getElementById("postsGrid");
  postsGrid.innerHTML = "";

  if (posts.length === 0) {
    postsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                        <i class="fas fa-search fa-3x" style="color: var(--primary); margin-bottom: 20px;"></i>
                        <h3>No posts found</h3>
                        <p>Try a different search term or topic</p>
                    </div>
                `;
    return;
  }

  posts.forEach((post) => {
    const tagsHtml = post.tags
      .map((tag) => `<span class="post-tag" data-tag="${tag}">${tag}</span>`)
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
  // Add event listeners to tag buttons
  document.querySelectorAll(".post-tag").forEach((tag) => {
    tag.addEventListener("click", function (e) {
      e.stopPropagation();
      const tagName = this.getAttribute("data-tag");
      filterPostsByTopic(tagName);
    });
  });
}

// Function to search topics
function searchTopics(term) {
  if (!term) {
    displayTopics(topics);
    return;
  }

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(term.toLowerCase()) ||
      topic.description.toLowerCase().includes(term.toLowerCase())
  );

  displayTopics(filteredTopics);
}

// Function to search posts
function searchPosts(term) {
  if (!term) {
    if (selectedTopic) {
      filterPostsByTopic(selectedTopic);
    } else {
      filteredPosts = [...blogPosts];
      displayPosts(filteredPosts);
    }
    return;
  }

  const searchResults = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase()))
  );

  filteredPosts = searchResults;
  displayPosts(filteredPosts);
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
  // Display all topics and posts
  displayTopics(topics);
  displayPosts(blogPosts);
  createParticles();

  // Setup search functionality
  const topicSearch = document.getElementById("topicSearch");
  topicSearch.addEventListener("input", function () {
    searchTopics(this.value);
  });

  const postSearch = document.getElementById("postSearch");
  postSearch.addEventListener("input", function () {
    searchPosts(this.value);
  });

  // Clear filter button
  const clearFilter = document.getElementById("clearFilter");
  clearFilter.addEventListener("click", function () {
    selectedTopic = null;
    document.getElementById("currentTopicContainer").style.display = "none";
    filteredPosts = [...blogPosts];
    displayPosts(filteredPosts);
    postSearch.value = "";
  });

  // Check if coming from index.html with a topic parameter
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get("topic");
  if (topicParam) {
    filterPostsByTopic(topicParam);
  }
});
