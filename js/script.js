const bookList = document.getElementById('book-list');
const addBtn = document.getElementById('add-button');
const bookTitleInput = document.getElementById('title');
const bookAuthorInput = document.getElementById('author');
const alertMessage = document.getElementById('alert-message');

let books = [];
let i = 0;


function removeBook() {
  books = books.filter((book) => `Title: ${book.title}` !== this.parentNode.childNodes[0].innerHTML);
  // Update localStorage
  localStorage.setItem('books', JSON.stringify(books));
  this.parentNode.remove();
  i -= 1;
}


function createAndAppend(title, author) {
  // Create
  const book = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');
  const bookHr = document.createElement('hr');

  // Classes
  book.classList.add('book');
  bookTitle.classList.add('book-title');

  // Add Content
  i += 1;
  bookTitle.textContent = `Title: ${title}`;
  bookAuthor.textContent = `Author: ${author}`;
  removeBtn.textContent = `Remove ${i}`;

  // Append
  book.append(bookTitle, bookAuthor, removeBtn, bookHr);
  bookList.append(book);

  removeBtn.addEventListener('click', removeBook);
}

// To check if a book is repeated
function checkTitleBook(book) {
  return book.title === bookTitleInput.value;
}


class BookObject {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  add() {
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    createAndAppend(this.title, this.author);
  }
}



function addBook() {
  if(
    bookTitleInput.value !== ''
    && bookAuthorInput.value !== ''
    ) {

      if(books.some(checkTitleBook)) {
        alertMessage.innerHTML = 'This book already exists';
        alertMessage.style.display = 'block';

      } else {
        const newBook = new BookObject(bookTitleInput.value, bookAuthorInput.value);
        newBook.add();

        bookTitleInput.value = bookTitleInput.defaultValue;
        bookAuthorInput.value = bookAuthorInput.defaultValue;

        alertMessage.style.display = 'none';
      }

    } else {
      alertMessage.innerHTML = 'Add text to both fields';
      alertMessage.style.display = 'block';
  }
};

addBtn.addEventListener('click', addBook);
