// Create the object

// Create the functions:

    // function AddBook() :
        //Add the title, author, and a button

    // function RemoveBook 

    let books = [
        {
            title: "1984",
            author: "George Orwell",
        },
    
        {
            title: "The Great Gatsby",
            author: "Scott Fitzgerald",
        },
    
        {
            title: "Walden",
            author: "Henry David Thoreau",
        }
    ];
    
    document.getElementById('submit-button').addEventListener('click', addBook);
    
    
    function addBook () {
    
        
        const titleInput = document.getElementById('book-title');
        const authorInput = document.getElementById('book-author');
    
        // adding html
    
        const bookShelf = document.getElementById('book-shelf');
    
        bookShelf.textContent = `${titleInput}`;
    
        console.log(bookShelf);
    
    };
    
    
    
    