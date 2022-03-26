const bookList = document.getElementById('book-list');
const addBtn = document.getElementById('add-button');
const bookTitleInput = document.getElementById('title');
const bookAuthorInput = document.getElementById('author');
const alertMessage = document.getElementById('alert-message');

let books = [];


function bookBackground(book, element) {
  if(element % 2 === 0) {
    book.style.backgroundColor = 'rgb(214, 214, 214)';
    
  } else {
    book.style.backgroundColor = 'azure';
  }
}


function removeBook() {
  // console.log(books.findIndex((book) => 
  // book.title === this.parentElement.children[1].innerHTML.split(' ')[1]));

  books = books.filter((book) => `Title: ${book.title}` !== this.parentNode.childNodes[0].innerHTML);
  // Update localStorage
  localStorage.setItem('books', JSON.stringify(books));

  this.parentNode.remove();

  const booksArr = document.querySelectorAll('.book');
  booksArr.forEach((book, i) => bookBackground(book, i % 2 !== 0));
}



function createAndAppend(title, author) {
  // Create
  const book = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');
  // const bookHr = document.createElement('hr');

  // Classes
  book.classList.add('book');
  bookTitle.classList.add('book-title');
  bookAuthor.classList.add('book-author');
  removeBtn.classList.add('remove-btn');

  // Add Content
  bookTitle.textContent = `Title: ${title}`;
  bookAuthor.textContent = `Author: ${author}`;
  removeBtn.textContent = `Remove ${bookList.children.length + 1}`;

  // Style
  bookBackground(book, bookList.children.length % 2 !== 0);

  // Append
  book.append(bookTitle, bookAuthor, removeBtn);
  bookList.append(book);
  
  removeBtn.addEventListener('click', removeBook);
}


function loadContent() {
  books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book) => {
    createAndAppend(book.title, book.author);
  });
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



function f() {
  console.log(books);
}
window.addEventListener('click', f);



function addBook() {
  if(
    bookTitleInput.value !== ''
    && bookAuthorInput.value !== ''
    ) {
      if(books.some(checkTitleBook)) {
        alertMessage.innerHTML = 'This book already exists';
        alertMessage.style.display = 'block';
        alertMessage.style.backgroundColor = 'rgb(165, 192, 200)';
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
      alertMessage.style.backgroundColor = 'rgb(185, 140, 228)';
  }
};

function highlightMessage() {
  alertMessage.style.transform = 'scale(1.05)';
  alertMessage.style.border = '3px solid rgb(224, 55, 55)';
}

function noHighlightMessage() {
  alertMessage.style.transform = 'scale(1)';
  alertMessage.style.border = '3px solid rgb(224, 129, 129)';
}

addBtn.addEventListener('click', addBook);
addBtn.addEventListener('mousedown', highlightMessage);
addBtn.addEventListener('mouseup', noHighlightMessage);
loadContent();

