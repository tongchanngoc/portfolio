import * as Utils from "./utils.js";

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function handleNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let position = window.scrollY + 200;

    sections.forEach((sec) => {
      if (
        position >= sec.offsetTop &&
        position < sec.offsetTop + sec.offsetHeight
      ) {
        let id = sec.getAttribute("id");
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  });
}

function init() {
  setupReveal();
  handleNavigation();

  if (Utils.isProduction()) {
    Utils.enableContentProtection();
  }
}

// Ensure the page starts at the top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", init);
