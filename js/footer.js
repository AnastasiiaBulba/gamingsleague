// Footer JavaScript functionality

function initFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  // Create footer HTML
  const footerHTML = `
        <footer class="footer fade-in">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Legal</h3>
                        <div class="footer-links">
                            <a href="./trip-cookies.html" class="footer-link">Cookie Policy</a>
                            <a href="./trip-privacy.html" class="footer-link">Privacy Policy</a>
                            <a href="./trip-disclaimer.html" class="footer-link">Disclaimer</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Contact Info</h3>
                        <div class="footer-contact">
                            <div class="contact-item">
                                <div class="contact-icon">📧</div>
                                <div class="contact-text">contact@gamingsleague.com</div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📞</div>
                                <div class="contact-text">+61 373 888 373</div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📍</div>
                                <div class="contact-text">
                                    42 Kent Street<br>
                                    Millers Point<br>
                                    Sydney NSW 2000<br>
                                    Australia
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="copyright">
                        © <span class="copyright-year">${new Date().getFullYear()}</span> 
                        Gamingsleague.com. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    `;

  footerContainer.innerHTML = footerHTML;

  // Get elements
  const footer = document.querySelector(".footer");
  const footerLinks = document.querySelectorAll(".footer-link");
  const contactItems = document.querySelectorAll(".contact-item");

  // Add hover effects to footer links
  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });

  // Add hover effects to contact items
  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
      const icon = this.querySelector(".contact-icon");
      if (icon) {
        icon.style.transform = "scale(1.1)";
      }
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      const icon = this.querySelector(".contact-icon");
      if (icon) {
        icon.style.transform = "scale(1)";
      }
    });
  });

  // Add click effects to contact items
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector(".contact-text");
      if (text) {
        // Create temporary highlight effect
        const originalColor = text.style.color;
        text.style.color = "var(--secondary-color)";
        setTimeout(() => {
          text.style.color = originalColor;
        }, 300);
      }
    });
  });

  // Add loading animation
  setTimeout(() => {
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  }, 200);

  // Animate footer elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  footerObserver.observe(footer);

  // Add pulse animation to contact icons
  const contactIcons = document.querySelectorAll(".contact-icon");
  contactIcons.forEach((icon, index) => {
    setTimeout(() => {
      // icon.classList.add("pulse");
    }, index * 200);
  });

  // Add staggered animation to footer links
  footerLinks.forEach((link, index) => {
    setTimeout(() => {
      link.style.opacity = "1";
      link.style.transform = "translateX(0)";
    }, index * 100);
  });

  // Add click to copy functionality for contact info
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector(".contact-text");
      if (text) {
        const textToCopy = text.textContent.trim();

        // Create temporary notification
        const notification = document.createElement("div");
        notification.textContent = "Copied to clipboard!";
        notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--primary-color);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.animation = "slideOutRight 0.3s ease-out";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);

        // Copy to clipboard (if supported)
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).catch((err) => {
            console.log("Could not copy text: ", err);
          });
        }
      }
    });
  });
}

// Export function for use in main.js
window.initFooter = initFooter;
