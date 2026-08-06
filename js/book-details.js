import { enrichBookDescription } from "./api.js";

const bookDetailsModal = document.getElementById("bookDetails");
const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalAuthor = document.getElementById("modal-author");
const modalDescription = document.getElementById("modal-description");
const modalPageCount = document.getElementById("modal-pagecount");
const modalAddBtn = document.getElementById("modal-add-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");

let currentBook = null;

export async function openBookDetail(book) {
  currentBook = book;

  modalCover.src = book.coverUrl || "assets/images/coverimageplaceholder.webp";
  modalCover.alt = book.title;
  modalTitle.textContent = book.title;
  modalAuthor.textContent = book.author;

  if (book.pageCount === 0) {
    modalPageCount.hidden = true;
  } else {
    modalPageCount.hidden = false;
    modalPageCount.textContent = `${book.pageCount} pages`;
  }

  modalAddBtn.textContent = "Add to Library";
  modalAddBtn.disabled = false;

  bookDetailsModal.showModal();


  if (book.description) {
    modalDescription.textContent = book.description;
    return;
  }

  // Case 2: Open Library books never had a description to begin with,
  // and enrichment doesn't apply to them — show the fallback directly.
  if (book.source !== "google") {
    modalDescription.textContent = "No description available.";
    return;
  }

  modalDescription.textContent = "Loading description...";

  const enrichedDescription = await enrichBookDescription(book);

  // Guard: if the user closed this modal and opened a different book
  // while this fetch was in flight, don't overwrite the wrong modal's text.
  if (currentBook !== book) {
    return;
  }

  if (enrichedDescription) {
    book.description = enrichedDescription; // cache on the book object
  } else {
    book.description = "No description available.";
  }

  modalDescription.textContent = book.description;
}

modalCloseBtn.addEventListener("click", () => {
  bookDetailsModal.close();
});

modalAddBtn.addEventListener("click", () => {
  // storage.js doesn't exist yet — this is a placeholder for now.
  // Once it does, this will call something like:
  // addBookToLibrary(currentBook);

  modalAddBtn.textContent = "Added ✓";
  modalAddBtn.disabled = true;
});