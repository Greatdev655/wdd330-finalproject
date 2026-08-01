export function createBookCard(book){
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("book-card");
    const coverImage = document.createElement("img");
    const title = document.createElement("h3");
    const author = document.createElement("p"); 

    coverImage.src = book?.coverUrl || "assets/images/coverimageplaceholder.webp";
    title.textContent = book?.title ?? "Untitled"; 
    author.textContent = book?.author?? "Unknown Author";

    cardContainer.appendChild(coverImage);
    cardContainer.appendChild(title);
    cardContainer.appendChild(author);

    cardContainer.setAttribute("data-book-id", book?.id ?? "");

    return cardContainer;
}

// creating renderBookList function

export function renderBookList(books,container){
    container.innerHTML = "";
    books.forEach((book) => {
        const bookCard = createBookCard(book);
        container.appendChild(bookCard);  
    });
    return container;
}