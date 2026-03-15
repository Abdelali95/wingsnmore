const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuPanels = document.querySelectorAll(".menu-panel");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

// Mobile nav toggle
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Menu filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    menuPanels.forEach((panel) => {
      const category = panel.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });
  });
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  updateActiveNavLink();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-link");
    }
  });
}

updateActiveNavLink();

// Close menu if clicking outside on mobile
document.addEventListener("click", (event) => {
  const clickedInsideNav = navMenu.contains(event.target);
  const clickedToggle = navToggle.contains(event.target);

  if (!clickedInsideNav && !clickedToggle) {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
});