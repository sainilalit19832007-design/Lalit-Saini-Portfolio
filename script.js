// Small interactions only: mobile navigation, scroll reveals, and current year.
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

/*
  IMPORTANT: Add your actual LinkedIn profile URL in index.html.
  Search for: id="linkedinLink"
  Replace https://www.linkedin.com/ with your personal profile URL.
*/


// Owner convenience mode: append ?owner=1 to the URL to reveal the edit shortcut.
// GitHub authentication and repository permissions are still required to save/publish changes.
const ownerEditButton = document.querySelector("#ownerEditButton");
const ownerMode = new URLSearchParams(window.location.search).get("owner") === "1";
if (ownerEditButton && ownerMode) {
  ownerEditButton.hidden = false;
  ownerEditButton.title = "Opens the portfolio HTML editor on GitHub; sign in to save changes.";
}
