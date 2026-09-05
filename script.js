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