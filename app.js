// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //   create tr element
  const row = document.createElement("tr");
  //   insert cols
  row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td> <a href="#" class="delete">X</a></td>
`;
  list.appendChild(row);
};

// show alert
UI.prototype.showAlert = function (message, className) {
  // Creat Div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  //   Add Text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);

  //   TimeOut after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delte Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instantiate book
  const book = new Book(title, author, isbn);

  //   instantiate ui
  const ui = new UI();

  //   Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //   Add book to list
    ui.addBookToList(book);

    // Show Success
    ui.showAlert("Book Added!", "success");
    //   clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //   instantiate ui
  const ui = new UI();

  //   Delete Book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
