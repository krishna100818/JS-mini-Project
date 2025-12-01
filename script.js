document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const dropdowns = document.querySelectorAll(".dropdown");
  const videoBtn = document.getElementById("watch-video-btn");
  const videoModal = document.getElementById("video-modal");
  const admissionModal = document.getElementById("admission-modal");

  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const navLinks = document.querySelectorAll(".mobile-nav a");

    const toggleMobileNav = () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
      mobileOverlay.classList.toggle("show");
    };

    hamburger.addEventListener("click", toggleMobileNav);
    mobileOverlay.addEventListener("click", toggleMobileNav);

    // Close nav on clicking a link
    navLinks.forEach((link) => link.addEventListener("click", toggleMobileNav));
  });

  const onScrollHeader = () =>
    header.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  let mobileOverlay = null;
  function createMobileOverlay() {
    if (mobileOverlay) return mobileOverlay;
    mobileOverlay = document.createElement("div");
    mobileOverlay.className = "mobile-nav-overlay";
    document.body.appendChild(mobileOverlay);
    mobileOverlay.addEventListener("click", () => {
      closeMobileNav();
    });
    return mobileOverlay;
  }

  function openMobileNav() {
    if (!navMenu) return;
    navMenu.classList.add("active");
    createMobileOverlay().classList.add("active");
    document.body.style.overflow = "hidden";
    navMenu.setAttribute("aria-expanded", "true");
    // swap icon
    const icon = hamburger?.querySelector("i");
    if (icon) {
      icon.classList.add("ri-close-line");
      icon.classList.remove("ri-menu-4-line");
    }
  }

  function closeMobileNav() {
    if (!navMenu) return;
    navMenu.classList.remove("active");
    if (mobileOverlay) mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
    navMenu.setAttribute("aria-expanded", "false");
    const icon = hamburger?.querySelector("i");
    if (icon) {
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-4-line");
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) closeMobileNav();
      else openMobileNav();
    });
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (navMenu.classList.contains("active")) closeMobileNav();
        else openMobileNav();
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
        closeMobileNav();
      }
    });
  });

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector(".nav-link");
    trigger?.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle("open");
      }
    });
  });

  /* --------- Modals (video + admission) --------- */
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("hidden");
    // small delay to allow CSS transitions
    requestAnimationFrame(() => modal.classList.add("active"));
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
    document.body.style.overflow = "";
    // pause any video inside
    const v = modal.querySelector("video");
    if (v && !v.paused)
      try {
        v.pause();
      } catch (err) {}
  };

  document
    .querySelectorAll('a[href="#admissions"], .btn-admission-trigger')
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(admissionModal);
      });
    });

  if (videoBtn) videoBtn.addEventListener("click", () => openModal(videoModal));

  document.querySelectorAll(".close-modal, .video-close").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal =
        this.closest(".modal-overlay") || this.closest(".video-modal");
      closeModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay, .video-modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.querySelectorAll(".poll-option").forEach((option) => {
    option.addEventListener("click", function () {
      const parentCard = this.closest(".poll-card");
      if (!parentCard) return;
      parentCard
        .querySelectorAll(".poll-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      setTimeout(() => {
        const value =
          this.dataset.value ||
          this.querySelector(".poll-label")?.textContent.trim();
        alert(`You voted for: ${value}`);
      }, 180);
    });
  });
  const revealEls = document.querySelectorAll(".scroll-reveal");
  const revealOnScroll = () => {
    const wh = window.innerHeight;
    const offset = 150;
    revealEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < wh - offset) {
        el.classList.add("active");
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (navMenu) {
        navMenu.classList.remove("active");
        navMenu.setAttribute("aria-expanded", "false");
      }
      if (mobileOverlay) mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
      const icon = hamburger?.querySelector("i");
      if (icon) {
        icon.classList.remove("ri-close-line");
        icon.classList.add("ri-menu-4-line");
      }
    }
  });
});
