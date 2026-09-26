document.addEventListener("DOMContentLoaded", () => {
  // 1. Hide Loader
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 400);
  });

  // 2. Mobile Navigation Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 3. Scroll Reveal Animations
  const sections = document.querySelectorAll(".scroll-section");
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => sectionObserver.observe(section));

  // 4. Lightbox Image Modal Logic
  const lightboxModal = document.getElementById("lightbox-modal");
  const closeLightboxBtn = document.getElementById("close-lightbox-btn");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt || "Fortunate Osas Gallery";
      lightboxModal.classList.add("active");
      document.body.classList.add("modal-open");
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      lightboxModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });
});

/**
 * Displays a custom animated toast notification from top-right.
 * @param {string} message - Text content of the alert.
 * @param {'success'|'error'|'info'} type - Theme flavor (default: 'success').
 * @param {number} durationMs - Display duration before sliding out (default: 3500ms).
 */
function showTopRightToast(message, type = 'success', durationMs = 3500) {
    // 1. Ensure the global container exists on the DOM
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Create the toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    // Add text message + manual close button
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close-btn" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    // 3. Trigger entry animation in next animation frame
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });

    // Helper for graceful exit removal
    const dismissToast = () => {
        toast.classList.remove('toast-show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        }, { once: true });
    };

    // Manual close trigger on button click
    toast.querySelector('.toast-close-btn').addEventListener('click', dismissToast);

    // Auto dismiss timer
    if (durationMs > 0) {
        setTimeout(dismissToast, durationMs);
    }
}
