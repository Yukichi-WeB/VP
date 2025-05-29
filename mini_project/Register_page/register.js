import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDokN2beUXXZxfjdXhgc8ecP77Q8RfEgw",
  authDomain: "vpnwg-cf24c.firebaseapp.com",
  projectId: "vpnwg-cf24c",
  storageBucket: "vpnwg-cf24c.firebasestorage.app",
  messagingSenderId: "471790647486",
  appId: "1:471790647486:web:449ff23611c353985c86ef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const submit = document.getElementById('login-button');
submit.addEventListener("click", function(event){
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("Account created successfully for " + user.email);
    window.location.href = "../Main/dashboard.html";
  })
  .catch((error) => {
    alert("Error: " + error.message);
  });

})