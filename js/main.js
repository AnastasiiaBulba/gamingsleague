// Main JavaScript file for Triple Treat Toss website

// Global variables
const currentYear = new Date().getFullYear();

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: function (func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Add animation class when element comes into view
  animateOnScroll: function () {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );
    elements.forEach((element) => {
      if (utils.isInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  },

  // Load JSON data
  loadJSON: async function (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading JSON:", error);
      return null;
    }
  },

  // Create SVG avatar
  createSVGAvatar: function (name, size = 50) {
    const colors = ["#ff6b9d", "#ffd700", "#ff4757", "#3742fa", "#2ed573"];
    const color = colors[name.length % colors.length];

    return `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <circle cx="${size / 2}" cy="${size / 2}" r="${
      size / 2
    }" fill="${color}"/>
                <text x="${size / 2}" y="${
      size / 2 + 5
    }" text-anchor="middle" fill="white" font-size="${
      size / 3
    }" font-weight="bold">
                    ${name.charAt(0).toUpperCase()}
                </text>
            </svg>
        `;
  },

  // Generate star rating HTML
  generateStarRating: function (rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = "";

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += '<span class="star filled">★</span>';
      } else if (i === fullStars && hasHalfStar) {
        starsHTML += '<span class="star filled">★</span>';
      } else {
        starsHTML += '<span class="star empty">☆</span>';
      }
    }

    return starsHTML;
  },
};

// Loading screen functionality
function initLoadingScreen() {
  // Create loading screen
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = `
    <div class="loading-animation">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading Triple Treat Toss</div>
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </div>
  `;

  document.body.appendChild(loadingScreen);

  // Hide loading screen after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1500);
  });
}

// Back to top button functionality
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement("div");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add scroll event listener
  window.addEventListener("scroll", utils.throttle(toggleBackToTop, 100));
}

// Initialize website
document.addEventListener("DOMContentLoaded", function () {
  console.log("Triple Treat Toss website initialized");

  // Initialize loading screen
  initLoadingScreen();

  // Initialize back to top button
  initBackToTop();

  // Initialize cookie banner
  initCookieBanner();

  // Initialize all modules
  initHeader();
  initFooter();
  initHero();
  initGameSection();
  initFeatures();
  initHowToPlay();
  initField();
  initScreenshots();
  initStatistics();
  initTestimonials();
  initReviews();
  initNews();
  initContacts();
  initLegal();

  // Add scroll event listener for animations
  window.addEventListener("scroll", utils.throttle(utils.animateOnScroll, 100));

  // Initial animation check
  utils.animateOnScroll();

  // Update copyright year
  updateCopyright();

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + K to scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Escape to close mobile menu
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
        if (mobileMenuBtn) {
          mobileMenuBtn.click();
        }
      }
    }
  });

  // Add smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add intersection observer for lazy loading
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyObserver.unobserve(img);
        }
      }
    });
  }, observerOptions);

  // Observe all images with data-src
  document.querySelectorAll("img[data-src]").forEach((img) => {
    lazyObserver.observe(img);
  });
});

// Update copyright year
function updateCopyright() {
  const copyrightElements = document.querySelectorAll(".copyright-year");
  copyrightElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// Export utils for use in other modules
window.utils = utils;
