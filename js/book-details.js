const bookDetailsModal = document.getElementById("bookDetails");
const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalAuthor = document.getElementById("modal-author");
const modalDescription = document.getElementById("modal-description");
const modalPageCount = document.getElementById("modal-pagecount");
const modalAddBtn = document.getElementById("modal-add-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");

let currentBook = null;

export function openBookDetail(book) {
  currentBook = book;

  modalCover.src = book.coverUrl || "assets/images/coverimageplaceholder.webp";
  modalCover.alt = book.title;
  modalTitle.textContent = book.title;
  modalAuthor.textContent = book.author;
  modalDescription.textContent = book.description;

  if (book.pageCount === 0) {
    modalPageCount.hidden = true;
  } else {
    modalPageCount.hidden = false;
    modalPageCount.textContent = `${book.pageCount} pages`;
  }

  modalAddBtn.textContent = "Add to Library";
  modalAddBtn.disabled = false;

  bookDetailsModal.showModal();
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