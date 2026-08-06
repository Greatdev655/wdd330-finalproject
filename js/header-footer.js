// header-footer.js
// Injects the shared header and footer into every page,
// and wires up nav highlighting + the mobile hamburger menu.

const headerHTML = `
  <a href="index.html" class="logo">Book Tracker</a>
  <button class="hamburger-btn" aria-label="Toggle navigation" aria-expanded="false">
    <i class="bi bi-list"></i>
  </button>
  <nav class="nav-links">
    <a href="index.html">Search</a>
    <a href="library.html">Library</a>
  </nav>
`;

const footerHTML = `
  <p>&copy; 2026 Book Tracker — Ikechukwu Great.</p>
  <p>Book data provided by Google Books and Open Library.</p>
`;

function insertHeader() {
  const header = document.getElementById("site-header");
  header.innerHTML = headerHTML;
}

function insertFooter() {
  const footer = document.getElementById("site-footer");
  footer.innerHTML = footerHTML;
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupHamburgerMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navLinks = document.querySelector(".nav-links");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
  });
}


function setupScrollTransparency() {
  const header = document.getElementById("site-header");
  const scrollThreshold = 20;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    { passive: true }
  );
}

insertHeader();
insertFooter();
setActiveNavLink();
setupHamburgerMenu();
setupScrollTransparency();