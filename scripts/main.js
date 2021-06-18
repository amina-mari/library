let myLibrary = [];
let inputTitle = document.getElementById("title");
let inputAuthor = document.getElementById("author");
let inputPages = document.getElementById("pages");
let inputReadedYes = document.getElementById("readedYes");
let inputReadedNo = document.getElementById("readedNo");
let buttonSubmit = document.getElementById("buttonSubmit");
let warning = document.getElementById("warning");

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

function addBookToLibrary(event){
    event.preventDefault();
    let readed;
    if(inputReadedYes.checked) readed = true;
    let book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readed);
    if(verifyInputs()){
        myLibrary.push(book);
        console.log(myLibrary);
        clearInputs();
    } else {
        warning.textContent = "Please fill the empty places";
    }
}

buttonSubmit.addEventListener("click", addBookToLibrary);