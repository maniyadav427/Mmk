function login() {

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

let savedUsername = localStorage.getItem("username");
let savedPassword = localStorage.getItem("password");

if(username === savedUsername && password === savedPassword){

alert("Login Successful!");

window.location.href = "books.html";

}else{

alert("Invalid Username or Password!");

}

}
function register() {

let username = document.getElementById("newUsername").value;
let email = document.getElementById("newEmail").value;
let password = document.getElementById("newPassword").value;

localStorage.setItem("username", username);
localStorage.setItem("email", email);
localStorage.setItem("password", password);

alert("Registration Successful!");

window.location.href = "login.html";

}
function searchBooks() {
    let input = document.getElementById("search").value.toLowerCase();
    let books = document.getElementById("bookList").getElementsByTagName("li");

    for (let i = 0; i < books.length; i++) {
        let text = books[i].textContent.toLowerCase();

        if (text.indexOf(input) > -1) {
            books[i].style.display = "";
        } else {
            books[i].style.display = "none";
        }
    }
}