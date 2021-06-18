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

buttonAddBook.addEventListener("click", function(){
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

    this.info = function(){
        return (`${this.title} by ${this.author}, ${this.pages}${typeof this.pages === "number" ? this.pages === 1  ? " page": " pages" : ""}, ${this.readed? "readed": "not readed yet"}`);
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

function displayBook(book, bookNumber){
    let divBook = document.createElement("div");
    let bookTitle = document.createElement("span");
    let bookAuthor = document.createElement("span");
    let bookPages = document.createElement("span");
    let bookReaded = document.createElement("span");
    let buttonDelete = document.createElement("button");
    let buttonReaded = document.createElement("button");

    divBook.setAttribute("data-bookNumber", bookNumber);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookReaded.textContent = book.readed ? "Yes" : "No";
    buttonDelete.textContent = "Delete Book";
    buttonReaded.textContent = "Change Status";

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
    let readed;
    if(inputReadedYes.checked) readed = true;
    let book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readed);
    if(verifyInputs()){
        myLibrary.push(book);
        bookCounter++;
        displayBook(book, bookCounter);
        clearInputs();
    } else {
        warning.textContent = "Please fill the empty places";
    }
}

buttonSubmit.addEventListener("click", addBookToLibrary);