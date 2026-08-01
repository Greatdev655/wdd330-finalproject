export async function getBooksFromGoogleBooks(searchQuery) {
  try {
    const params = new URLSearchParams({
      q: searchQuery,
      key: "AIzaSyCq2DSu9hLdIkrgjFXh8fKD_WsxHG92Dbo",
    });

    const url = `https://www.googleapis.com/books/v1/volumes?${params}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching books from Google Books API:", error);
    throw error;
  }
}

// normalize the data to match the structure of the books in the database
export function normalizeBookData(booksData) {
  const items = booksData?.items ?? [];

  return items.map((item) => {
    const id = `google-${item.id}`;
    const source = "google";
    const title = item.volumeInfo?.title ?? "Untitled";
    const author = item.volumeInfo?.authors?.join(", ") ?? "Unknown Author";
    const description = item.volumeInfo?.description ?? "";
    const coverUrl = item.volumeInfo?.imageLinks?.thumbnail ?? "";
    const pageCount = item.volumeInfo?.pageCount ?? 0;

    return {
      id,
      source,
      title,
      author,
      description,
      coverUrl,
      pageCount
    };
  });
}


// get books from Open Library API 
export async function getBooksFromOpenLibrary(searchQuery){
    try {
    const params = new URLSearchParams({
      title: searchQuery,
    });

    const url = `https://openlibrary.org/search.json?${params}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching books from Open Library API:", error);
    throw error;
  }

}

// normalizing the data structure from open Library 
export function normalizeOpenLibraryData(booksData) {
  const docs = booksData?.docs ?? [];

  return docs.map((item) => {
    const id = `openlibrary-${item.key}`;
    const source = "openlibrary";
    const title = item.title ?? "Untitled";
    const author = item.author_name?.join(", ") ?? "Unknown Author";
    const description = "";
    const coverUrl = item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
      : "";
    const pageCount = 0;

    return {
      id,
      source,
      title,
      author,
      description,
      coverUrl,
      pageCount
    };
  });
}


export async function searchBooks(query) {
  let googleResults = [];

  try {
    const rawGoogleData = await getBooksFromGoogleBooks(query);
    googleResults = normalizeBookData(rawGoogleData);
  } catch (error) {
    console.error("Google Books search failed, will try Open Library:", error);
  }

  if (googleResults.length > 0) {
    return googleResults;
  }

  try {
    const rawOpenLibraryData = await getBooksFromOpenLibrary(query);
    const openLibraryResults = normalizeOpenLibraryData(rawOpenLibraryData);
    return openLibraryResults;
  } catch (error) {
    console.error("Open Library search also failed:", error);
    throw new Error("Unable to fetch books from either source. Please try again later.");
  }
}

