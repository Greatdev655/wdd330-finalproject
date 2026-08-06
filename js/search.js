import { searchBooks } from "./api.js";
import { createBookCard, renderBookList } from "./render.js";
import { openBookDetail } from "./book-details.js";

// listing all essential variables

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("search-result-container");
const stateMessage = document.getElementById("state-message");
const bookDetailsModal = document.getElementById("bookDetails");

let searchResultStatus = []; // updated with every search

resultContainer.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".book-card");

  if (!clickedCard) {
    return;
  }

  const bookId = clickedCard.getAttribute("data-book-id");
  const book = searchResultStatus.find((b) => b.id === bookId);

  if (!book) {
    return;
  }

  openBookDetail(book);
});

searchInput.addEventListener("input", () => {
  searchInput.classList.remove("error-message-state");
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (searchInput.value === "") {
    searchInput.classList.add("error-message-state");
    return;
  }

  stateMessage.textContent = "Searching...";

  try {
    const books = await searchBooks(searchInput.value);

    if (books.length > 0) {
      stateMessage.textContent = "";
      renderBookList(books, resultContainer);
      searchResultStatus = books;
    } else {
      stateMessage.textContent = "No books found for that search!";
      resultContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("Error searching for books:", error);
    stateMessage.textContent = "An error occurred while searching for books.";
  }
});