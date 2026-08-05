// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
apiKey: "AIzaSyDSRk4vB_M65BtHjI6ZHC4hBj4qlpx9Iso",
authDomain: "allied-e2cfc.firebaseapp.com",
projectId: "allied-e2cfc",
storageBucket: "allied-e2cfc.firebasestorage.app",
messagingSenderId: "545754218254",
appId: "1:545754218254:web:23151b0aec305711aee15f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register
window.register = function () {

const email = document.getElementById("newEmail").value;
const password = document.getElementById("newPassword").value;

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {

sendEmailVerification(userCredential.user)  
    .then(() => {  
      alert("Verification email sent! Please check your Gmail.");  
      window.location.href = "login.html";  
    });  

})  
.catch((error) => {
  alert(error.code);
  alert(error.message);
  console.error(error);
});

};

// Login
window.login = function () {

const email = document.getElementById("username").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {

if (!userCredential.user.emailVerified) {  
    alert("Please verify your email before logging in.");  
    return;  
  }  

  alert("Login Successful!");  
  window.location.href = "books.html";  

})  
.catch((error) => {  
  alert(error.message);  
});

};

// Logout
window.logout = function () {

signOut(auth)
.then(() => {
alert("Logged out successfully!");
window.location.href = "login.html";
})
.catch((error) => {
alert(error.message);
});
};
