// auth.js
import { db } from "../js/firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Success");
      window.location.href = "admin.html";
    })
    .catch((error) => {
      alert("Login Failed: " + error.message);
    });
};
