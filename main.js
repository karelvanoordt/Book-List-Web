// Create the object

// Create the functions:

// function AddBook() :
//Add the title, author, and a button

// function RemoveBook

let books = [
  {
    title: "1984",
    author: "George Orwell",
    buttonId: 0
  },

  {
    title: "The Great Gatsby",
    author: "Scott Fitzgerald",
    buttonId:1

  },

  {
    title: "Walden",
    author: "Henry David Thoreau",
    buttonId:2
  },
];

function addBook(event) {
  const titleInput = document.getElementById("book-title");
  const authorInput = document.getElementById("book-author");

  // adding html

  const bookShelf = document.getElementById("book-shelf");

  let addedBook = {
    title: titleInput.value,
    author: authorInput.value,
    buttonId: books.length
  };

  books.push(addedBook);
  console.log(books)
 bookShelf.innerHTML = ''
 
 for ( let i=0 ; i< books.length ; i += 1) {
     bookShelf.innerHTML += `<div class="book-title">${books[i].title}</div>
        <div class="book-author">${books[i].author}</div>
        <button class="removeBook" id='${books[i].buttonId}'>remove</button>
        <hr>`
 }
  event.preventDefault();
}

document.getElementById("submit-button").addEventListener("click", addBook);


let btnBook = document.querySelectorAll('.removeBook')



