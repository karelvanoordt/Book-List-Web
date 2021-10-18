// IDENTIFIER

// IDs
// Form = book-form
// Title = book-title
// Author = book-author

// Book shelf = book-shelf
// Book Class: represents a book

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// UI Class: Handles UI tasks

class UI {
 static displayBooks() {
    const books = Store.getBooks();    
    books.forEach((book) => UI.addBooktoList(book));
 }  


 static addBooktoList(book) {
   const list = document.getElementById('book-shelf'); 

   const row = document.createElement('div');

   row.innerHTML = 

    `<p>${book.title}</p>
     <p>${book.author}</p>
      <p>${book.id}</p>
      <a href="#" value="${book.id}" class="delete">REMOVE</a>

    `



          //STORED 
  //  `
  //   <p>${book.title}</p>
  //   <p>${book.author}</p>
  //   <p>${book.id}</p>
  //   <a href="#" class="delete">REMOVE</a>
  //   `;



    list.appendChild(row);
 }

 static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
 }

 static clearFields() {
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-id').value = '';
 }
}


// Store Class: handles local storage (doesnt go away when the page is refreshed)

class Store {

  static getBooks (){
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else { 
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook (book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook (id) {
    const books = Store.getBooks();

    // TEMPORARY

    const buttonID = document.querySelector('.delete');




    //

    books.forEach((book, index) => {
      // if (book.id === id) {



      if (book.id === buttonID) {
        books.splice(index,1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));

  }

}

// Event: display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event: Add book

document.getElementById('booklist-form').addEventListener('submit', (e) => {

// prevent submit

e.preventDefault();

// get Form values

const title = document.getElementById('book-title').value;
const author = document.getElementById('book-author').value;
const id = document.getElementById('book-id').value;


// Validate
if(title === '' || author === '' || id === '') {
  alert ('Please complete the fields')
} else {

  // Instantiate book

  const book = new Book (title, author, id);

  // Add book to display

  UI.addBooktoList(book);

  // Add book to Store

  Store.addBook(book);

  // Clear fields
  UI.clearFields();

};

// Event: Remove book

document.getElementById('book-shelf').addEventListener('click', (e) => {
  
  // Remove book from display
  UI.deleteBook(e.target);

  // Remove book from Storage
  // Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})};


