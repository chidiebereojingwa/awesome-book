class BookObject {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  add() {
    books.push(this);
  }

  remove(bookTitle) {
    books.filter((b) => {
      b.title !== bookTitle;
    });
  }
}

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


function addBook() {
  // To check if a book is repeated
  function checkTitleBook(book) {
    return book.title === bookTitleInput.value;
  }
  
  const book = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');
  const bookHr = document.createElement('hr');

  book.classList.add('book');
  bookTitle.classList.add('book-title');
  
    
  if(
    bookTitleInput.value !== ''
    && bookAuthorInput.value !== ''
    ) {
      
      if(books.some(checkTitleBook)) {
        alertMessage.innerHTML = 'This book already exists';
        alertMessage.style.display = 'block';
      } else {
        // Push Object to Array
        const newBook = new BookObject(bookTitleInput.value, bookAuthorInput.value);
        books.push(newBook);

        // localStorage
        localStorage.setItem('books', JSON.stringify(books));
        
        i += 1;
        bookTitle.textContent = `Title: ${newBook.title}`;
        bookAuthor.textContent = `Author: ${newBook.author}`;
        removeBtn.textContent = `Remove ${i}`;
        
        book.append(bookTitle, bookAuthor, removeBtn, bookHr);
        bookList.append(book);
        
        
        removeBtn.addEventListener('click', removeBook);
        
        bookTitleInput.value = bookTitleInput.defaultValue;
        bookAuthorInput.value = bookAuthorInput.defaultValue;
        
        alertMessage.style.display = 'none';
      }
      
    } else {
      alertMessage.innerHTML = 'Fill out both fields';
      alertMessage.style.display = 'block';
  }
};

addBtn.addEventListener('click', addBook);
