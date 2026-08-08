
const LIBRARY_KEY = "bookTrackerLibrary";


function readLibrary() {
  const raw = localStorage.getItem(LIBRARY_KEY);

  if (raw === null) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Corrupted library data in localStorage, resetting to empty array:", error);
    return [];
  }
}

// Private helper (not exported).
// Takes a full array and saves it back to localStorage as a JSON string.
function writeLibrary(library) {
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
}

// Returns the full array of saved books.
// Always returns a real array (possibly empty) — never null, never throws.
export function getLibrary() {
  return readLibrary();
}

// Adds a new book to the library.
// Refuses to add a duplicate if a book with the same id already exists.
// Returns true if the book was added, false if it was already there.
export function saveBook(book) {
  const library = readLibrary();

  const alreadyExists = library.some((existingBook) => existingBook.id === book.id);
  if (alreadyExists) {
    return false;
  }

  book.undoUsed = false;
  library.push(book);
  writeLibrary(library);

  return true;
}

// Marks a book as finished: sets status to "finished" and records today's date
// (plain date string, e.g. "2026-08-08" — no time component).
// Returns true if the book was found and updated, false otherwise.
export function markAsFinished(bookId) {
  const library = readLibrary();
  const book = library.find((b) => b.id === bookId);

  if (!book) {
    return false;
  }

  book.status = "finished";
  book.finishedDate = new Date().toISOString().split("T")[0];

  writeLibrary(library);
  return true;
}

// Reverts a book from "finished" back to "reading" — but only once per book.
// If undoUsed is already true, refuses and returns false without changing anything.
// Returns true if the undo was actually performed.
export function undoFinished(bookId) {
  const library = readLibrary();
  const book = library.find((b) => b.id === bookId);

  if (!book) {
    return false;
  }

  if (book.undoUsed) {
    return false;
  }

  book.status = "reading";
  book.finishedDate = null;
  book.undoUsed = true;

  writeLibrary(library);
  return true;
}

// Removes a book from the library entirely.
// Returns true if a book was removed, false if no book with that id existed.
export function removeBook(bookId) {
  const library = readLibrary();
  const newLibrary = library.filter((b) => b.id !== bookId);

  if (newLibrary.length === library.length) {
    return false;
  }

  writeLibrary(newLibrary);
  return true;
}