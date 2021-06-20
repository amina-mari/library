/* *********** DOM VARIABLES *********** */

let myLibrary = [];
let bookCounter = 0;
let sectionBooks = document.querySelector(".books");
let sectionAddBook = document.querySelector(".addBooks");
let inputTitle = document.getElementById("title");
let inputAuthor = document.getElementById("author");
let inputPages = document.getElementById("pages");
let inputReadedYes = document.getElementById("readedYes");
let inputReadedNo = document.getElementById("readedNo");
let buttonSubmit = document.getElementById("buttonSubmitBook");
let warning = document.getElementById("warning");
let buttonAddBook = document.getElementById("buttonAddBook");

/* *********** BUTTON ADD BOOKS *********** */

sectionAddBook.style.display = "none";

buttonAddBook.addEventListener("click", function(event){
    if(sectionAddBook.style.display === "none") {
        sectionAddBook.style.display = "block";
        event.currentTarget.textContent = "Close";
    }
    else {
        sectionAddBook.style.display = "none";
        event.currentTarget.textContent = "New Book";
    };
})

// Book constructor

function Book(title, author, pages, readed){
    this.title = title;
    this.author = author;
    this.pages = pages > 0 ? pages : "invalid number of pages";
    this.readed = readed;
    this.id;

    this.info = function(){
        return (`${this.title} by ${this.author}, ${this.pages}${typeof this.pages === "number" ? this.pages === 1  ? " page": " pages" : ""}, ${this.readed? "readed": "not readed yet"}`);
    }
    this.toggleReaded = function(){
        this.readed = !(this.readed);
    }
};


/* *********** ADD BOOKS *********** */

function verifyInputs(){
    if(
        !(inputAuthor.value) ||
        !(inputPages.value) || 
        !(inputTitle.value)) return false;
    else if(!(inputReadedYes.checked) && !(inputReadedNo.checked)) return false;
    else return true;    
}

function clearInputs(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    warning.textContent = "";
    if(inputReadedYes.checked) inputReadedYes.checked = false;
    else inputReadedNo.checked = false;
}

function displayBook(book){
    let divBook = document.createElement("div");
    let bookTitle = document.createElement("span");
    let bookAuthor = document.createElement("span");
    let bookPages = document.createElement("span");
    let bookReaded = document.createElement("span");
    let buttonDelete = document.createElement("button");
    let buttonReaded = document.createElement("button");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookReaded.textContent = book.readed ? "Yes" : "No";
    buttonDelete.textContent = "Delete Book";
    buttonReaded.textContent = "Change Status";

    buttonDelete.addEventListener("click", function(){
        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id === book.id) {
                myLibrary.splice(i, 1);
            }
        }
        sectionBooks.removeChild(divBook);  
    })

    buttonReaded.addEventListener("click", function(){
        book.toggleReaded();
        bookReaded.textContent = book.readed ? "Yes" : "No";
    })

    divBook.appendChild(bookTitle);
    divBook.appendChild(bookAuthor);
    divBook.appendChild(bookPages);
    divBook.appendChild(bookReaded);
    divBook.appendChild(buttonDelete);
    divBook.appendChild(buttonReaded);

    sectionBooks.appendChild(divBook);
}

function addBookToLibrary(event){
    event.preventDefault();
    
    if(verifyInputs()){
        bookCounter++;
        let readed = false;
        if(inputReadedYes.checked) readed = true;
        
        let book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readed);
        book.id = bookCounter;
        
        myLibrary.push(book);
        displayBook(book);
        clearInputs();
    } else {
        warning.textContent = "Please fill the empty places";
    }
}

buttonSubmit.addEventListener("click", addBookToLibrary);