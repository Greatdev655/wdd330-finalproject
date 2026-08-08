import { getLibrary, markAsFinished, undoFinished, removeBook } from "./storage.js";
import { createLibraryCard } from "./render.js";

const filterTabs = document.getElementById("filter-tabs");
const libraryContainer = document.getElementById("library-container");
const stateMessage = document.getElementById("library-state-message");

let currentFilter = "reading";

// Reads the library fresh from storage every time, filters by currentFilter,
// and redraws the container. Called after every action that changes the data
// (finish/undo/remove) and whenever the active tab changes, since the DOM
// never updates itself just because storage.js data changed.
function renderLibrary() {
  const library = getLibrary();
  const filteredBooks = library.filter((book) => book.status === currentFilter);

  libraryContainer.innerHTML = "";

  if (filteredBooks.length === 0) {
    stateMessage.textContent = "No books found.";
  } else {
    stateMessage.textContent = "";
  }

  filteredBooks.forEach((book) => {
    const libraryCard = createLibraryCard(book);
    libraryContainer.appendChild(libraryCard);
  });
}

// Tab switching: update currentFilter, swap which button looks "active",
// then re-render using the new filter.
filterTabs.addEventListener("click", (e) => {
  const clickedTab = e.target.closest("[data-filter]");

  if (!clickedTab) {
    return;
  }

  currentFilter = clickedTab.getAttribute("data-filter");

  const allTabs = filterTabs.querySelectorAll("[data-filter]");
  allTabs.forEach((tab) => tab.classList.remove("active"));
  clickedTab.classList.add("active");

  renderLibrary();
});

// Card actions: Mark Finished / Undo / Remove.
// Delegated listener on the container, same pattern as search.js's
// click-to-open-modal listener, just branching on data-action instead.
libraryContainer.addEventListener("click", (e) => {
  const clickedButton = e.target.closest("[data-action]");

  if (!clickedButton) {
    return;
  }

  const action = clickedButton.getAttribute("data-action");
  const bookId = clickedButton.getAttribute("data-book-id");

  if (action === "finish") {
    markAsFinished(bookId);
  } else if (action === "undo") {
    undoFinished(bookId);
  } else if (action === "remove") {
    removeBook(bookId);
  }

  // Regardless of which action ran, storage has changed — re-render so the
  // screen matches what's actually saved.
  renderLibrary();
});

// Initial render on page load, so the library isn't blank before any click.
renderLibrary();