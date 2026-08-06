// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
getDatabase,
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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
const db = getDatabase(app);

// Register
window.register = function () {

const email = document.getElementById("newEmail").value;
const password = document.getElementById("newPassword").value;
if (password.length < 8) {
  alert("Password must be at least 8 characters.");
  return;
}
if (!email.includes("@")) {
  alert("Please enter a valid email address.");
  return;
}
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
    .then(async (userCredential) => {

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        alert("Email not verified. A new verification email has been sent.");
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
