document.addEventListener("DOMContentLoaded", () => {
  // 1. Hide Loader (Hides on page load or after a max 5-second timeout)
  const loader = document.getElementById("loader");
  
  if (loader) {
    const hideLoader = () => {
      if (!loader.classList.contains("hidden")) {
        loader.classList.add("hidden");
      }
    };

    // Fallback: Force hide after 5 seconds
    const maxTimeout = setTimeout(hideLoader, 5000);

    // Normal behavior: Hide when page assets finish loading
    window.addEventListener("load", () => {
      clearTimeout(maxTimeout); // Clear the fallback timer
      setTimeout(hideLoader, 400); // Optional slight delay for smooth transition
    });
  }

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

  // --- 4. Advert Display Logic (Visit Counter & Video Rotation) ---
  const sourceDesktop = document.getElementById("ad-source-desktop") 
  const sourceMobile = document.getElementById("ad-source-mobile")
  const imageFallback = document.getElementById("ad-image-fallback")

  if (sourceDesktop && sourceMobile && sourceDesktop) {
    // Retrieve last display state (defaults to 'flyer1' if missing)
    const lastFlyer = localStorage.getItem("fort_last_rendered_flyer") || "flyer2"

    // Determine the next flyer vairant to show
    const currentFlyer = lastFlyer === "flyer1" ? "flyer2" : "flyer1"

    if (currentFlyer === "flyer1") {
      sourceDesktop.srcset = "flyer-fort-landscape.png"
      sourceMobile.srcset = "flyer-fort-potrait.png"
      imageFallback.src = "flyer-fort-landscape.png"
    } else {
      sourceDesktop.srcset = "flyer-fort-2_ewnab_landscape.png"
      sourceMobile.srcset = "flyer-fort-2_ewnab_potrait.png"
      imageFallback.src = "flyer-fort-2_ewnab_landscape.png"      
    }

    // Overwrite history with the current active layout
    localStorage.setItem("fort_last_rendered_flyer", currentFlyer);
  }
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

document.querySelectorAll('.wa-direct-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      e.preventDefault();

      // Extract phone and message directly from href
      const url = new URL(this.href);
      const phone = url.pathname.replace('/', '');
      const text = url.searchParams.get('text') || '';

      // Direct URI scheme (Bypasses web landing page on iOS & Android)
      window.location.href = `whatsapp://send?phone=${phone}&text=${text}`;
    }
    // Desktop devices follow default href target="_blank" to wa.me
  });
});