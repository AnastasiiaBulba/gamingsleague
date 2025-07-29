// Hero JavaScript functionality

function initHero() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  // Add scroll-triggered animations
  const heroContent = heroSection.querySelector(".hero-content");
  const heroImage = heroSection.querySelector(".hero-image");

  // Add parallax effect to hero image
  window.addEventListener(
    "scroll",
    utils.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    }, 16)
  );

  // Add floating animation to hero content
  if (heroContent) {
    heroContent.addEventListener("mouseenter", function () {
      this.style.animation = "float 3s ease-in-out infinite";
    });

    heroContent.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  }

  // Add click effects to hero elements
  const heroTitle = heroSection.querySelector("h1");
  const heroText = heroSection.querySelector("p");

  if (heroTitle) {
    heroTitle.addEventListener("click", function () {
      this.style.transform = "scale(1.05)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  if (heroText) {
    heroText.addEventListener("click", function () {
      this.style.color = "var(--secondary-color)";
      setTimeout(() => {
        this.style.color = "var(--text-secondary)";
      }, 500);
    });
  }

  // Add keyboard navigation
  heroSection.setAttribute("tabindex", "0");
  heroSection.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Scroll to game section
      const gameSection = document.querySelector(".game-section");
      if (gameSection) {
        gameSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Add intersection observer for hero animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Add staggered animations to hero elements
        const elements = entry.target.querySelectorAll("h1, p, .hero-image");
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
    });
  }, observerOptions);

  heroObserver.observe(heroSection);

  // Add mouse move effect
  heroSection.addEventListener(
    "mousemove",
    utils.throttle((e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = ((x - centerX) / centerX) * 10;
      const moveY = ((y - centerY) / centerY) * 10;

      if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    }, 16)
  );

  // Reset transform on mouse leave
  heroSection.addEventListener("mouseleave", () => {
    if (heroContent) {
      heroContent.style.transform = "translate(0, 0)";
    }
  });

  console.log("Hero section initialized");
}

// Export function for use in main.js
window.initHero = initHero;
