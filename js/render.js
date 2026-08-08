export function createBookCard(book) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("book-card");
    const coverImage = document.createElement("img");
    const title = document.createElement("h3");
    const author = document.createElement("p");

    coverImage.src = book?.coverUrl || "assets/images/coverimageplaceholder.webp";
    title.textContent = book?.title ?? "Untitled";
    author.textContent = book?.author ?? "Unknown Author";

    cardContainer.appendChild(coverImage);
    cardContainer.appendChild(title);
    cardContainer.appendChild(author);

    cardContainer.setAttribute("data-book-id", book?.id ?? "");

    return cardContainer;
}

// creating renderBookList function

export function renderBookList(books, container) {
    container.innerHTML = "";
    books.forEach((book) => {
        const bookCard = createBookCard(book);
        container.appendChild(bookCard);
    });
    return container;
}


// create libraryBookcard function
export function createLibraryCard(book) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("book-card", "library-card");
  cardContainer.setAttribute("data-book-id", book?.id ?? "");

  const coverImage = document.createElement("img");
  const title = document.createElement("h3");
  const author = document.createElement("p");

  coverImage.src = book?.coverUrl || "assets/images/coverimageplaceholder.webp";
  title.textContent = book?.title ?? "Untitled";
  author.textContent = book?.author ?? "Unknown Author";

  cardContainer.appendChild(coverImage);
  cardContainer.appendChild(title);
  cardContainer.appendChild(author);

  // Status tag — Forest Ink for reading, Antique Gold for finished
  const statusTag = document.createElement("span");
  statusTag.classList.add("status-tag");
  if (book?.status === "finished") {
    statusTag.classList.add("status-finished");
    statusTag.textContent = "Finished";
  } else {
    statusTag.classList.add("status-reading");
    statusTag.textContent = "Currently Reading";
  }
  cardContainer.appendChild(statusTag);

  // Action buttons container
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("card-actions");

  // Conditional button: Mark Finished, Undo, or nothing
  if (book?.status === "reading") {
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Mark Finished";
    finishBtn.setAttribute("data-action", "finish");
    finishBtn.setAttribute("data-book-id", book?.id ?? "");
    actionsContainer.appendChild(finishBtn);
  } else if (book?.status === "finished" && !book?.undoUsed) {
    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Undo";
    undoBtn.setAttribute("data-action", "undo");
    undoBtn.setAttribute("data-book-id", book?.id ?? "");
    actionsContainer.appendChild(undoBtn);
  }
  // If status === "finished" and undoUsed is true, no button goes here — intentional.

  // Remove button — always present regardless of status
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("data-action", "remove");
  removeBtn.setAttribute("data-book-id", book?.id ?? "");
  actionsContainer.appendChild(removeBtn);

  cardContainer.appendChild(actionsContainer);

  return cardContainer;
}