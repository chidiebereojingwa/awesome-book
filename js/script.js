let books = [];

const deleteBook = (bookTitle) => {
  const result = books.filter((book) => book.title !== bookTitle);
  books = result;
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks(books);
};

const addBook = (title, author) => {
  const bookList = document.getElementById('book-list');
  const book = document.createElement('div');
  const bookTitle = document.createElement('p');
  bookTitle.textContent = `Title: ${title}`;
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Author: ${author}`;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', () => {
    deleteBook(title);
  });

  const bookHr = document.createElement('hr');

  book.append(bookTitle, bookAuthor, removeBtn, bookHr);
  bookList.append(book);
};

const renderBooks = (books) => {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book) => {
    addBook(book.title, book.author);
  });
};

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}
