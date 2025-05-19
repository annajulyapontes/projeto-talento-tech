import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import { auth } from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "pedidos.html"; // já logado? Vai direto para pedidos
  }
});

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      window.location.href = "pedidos.html";
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro realizado com sucesso!");
      window.location.href = "pedidos.html";
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  });
}
