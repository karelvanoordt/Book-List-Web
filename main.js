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

    books.forEach((book) => onScreen.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-shelf');

    const row = document.createElement('li');

    row.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.id}</p>
      <p><a href="#" class="delete">REMOVE</a></p>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-id').value = '';
  }
}

document.addEventListener('DOMContentLoaded', onScreen.displayBooks);

document.querySelector('#booklist-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  const id = document.querySelector('#book-id').value;

  if (title === '' || author === '' || id === '') {
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
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});