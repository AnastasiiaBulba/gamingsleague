// Simple News Page functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("News page initialized");

  // Initialize header and footer
  if (typeof initHeader === "function") {
    initHeader();
  }

  if (typeof initFooter === "function") {
    initFooter();
  }

  // Add hover effects to news cards
  const newsCards = document.querySelectorAll(".news-card");
  newsCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Update copyright year
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll(".copyright-year");
  copyrightElements.forEach((element) => {
    element.textContent = currentYear;
  });

  // Add smooth scrolling for internal links
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
});

// Toggle read more functionality
function toggleReadMore(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  if (!card) return;

  const excerpt = card.querySelector(".news-card-excerpt");
  const fullText = card.querySelector(".news-card-full-text");
  const button = card.querySelector(".read-more-btn");

  if (fullText.classList.contains("show")) {
    // Hide full text
    fullText.classList.remove("show");
    excerpt.style.display = "-webkit-box";
    button.textContent = "Read more";
  } else {
    // Show full text
    fullText.classList.add("show");
    excerpt.style.display = "none";
    button.textContent = "Read less";
  }
}
