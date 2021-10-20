/* eslint max-classes-per-file: ["error", 4] */

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    const booksDom = document.querySelectorAll('.book a');
    booksDom.forEach((book, i) => {
      book.parentElement.classList.remove('gray');
      if (i % 2 === 0) {
        book.parentElement.classList.add('gray');
      }
    });
  }

  static removeBook(id) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class onScreen {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      onScreen.addBookToList(book);
    });

    const booksDom = document.querySelectorAll('.book a');
    booksDom.forEach((book, i) => {
      book.parentElement.classList.remove('gray');
      if (i % 2 === 0) {
        book.parentElement.classList.add('gray');
      }
    });
    
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-shelf');

    const row = document.createElement('div');
    row.className = 'book';

    row.innerHTML = `
      <p>"${book.title}" by ${book.author}</p>

      <a  id=${book.id} href="#" class="delete">REMOVE</a>
    `;

    const booksDom = document.querySelectorAll('.book a');

    booksDom.forEach((book, i) => {
      if (i % 2 === 0) {
        book.parentElement.classList.add('gray');
      } 

    });

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }

    const booksDom = document.querySelectorAll('.book a');

    booksDom.forEach((book, i) => {
      book.parentElement.classList.remove('gray');
      if (i % 2 === 0) {
        book.parentElement.classList.add('gray');
      }
    });
  }

  static clearFields() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', onScreen.displayBooks);

document.querySelector('#booklist-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  if (title === '' || author === '') {
    alert('Complete all the fields');
  } else {
    const book = new Book(title, author, id);

    onScreen.addBookToList(book);

    Store.addBook(book);

    onScreen.clearFields();
  }
});

document.querySelector('#book-shelf').addEventListener('click', (e) => {
  onScreen.deleteBook(e.target);
  Store.removeBook(e.target.id);
});
