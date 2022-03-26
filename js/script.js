let books = [];

const renderBooks = (books) => {
  const addBook = (title, author) => {
    const bookList = document.getElementById('book-list');
    const book = document.createElement('div');
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `Title: ${title}`;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${author}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    const deleteBook = (bookTitle) => {
      const result = books.filter((book) => book.title !== bookTitle);
      books = result;
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks(books);
    };

    removeBtn.addEventListener('click', () => {
      deleteBook(title);
    });

    const bookHr = document.createElement('hr');

    book.append(bookTitle, bookAuthor, removeBtn, bookHr);
    bookList.append(book);
  };

  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book) => {
    addBook(book.title, book.author);
  });
};

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}
const addBtn = document.getElementById('add-button');
const addBtnHandler = (e) => {
  e.preventDefault();
  const bookTitleInput = document.getElementById('title');
  const bookAuthorInput = document.getElementById('author');
  const bookObject = {
    title: bookTitleInput.value,
    author: bookAuthorInput.value,
  };
  books.push(bookObject);
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks(books);
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
};
addBtn.addEventListener('click', addBtnHandler);
renderBooks(books);