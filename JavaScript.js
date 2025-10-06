// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-eE_Edm7gd_nFmBQfP2V7OqBIJntZ4IQ",
  authDomain: "taste-haven-6c92d.firebaseapp.com",
  projectId: "taste-haven-6c92d",
  storageBucket: "taste-haven-6c92d.firebasestorage.app",
  messagingSenderId: "999156594491",
  appId: "1:999156594491:web:345947308aeac9ab77291e",
  measurementId: "G-YLE10M2H9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
window.db = db;

document.addEventListener("DOMContentLoaded", () => {
    const menuList = document.getElementById("menu-list");
    const addForm = document.getElementById("addForm");
    const searchInput = document.getElementById("search");

    // Load existing dishes
   import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.getElementById("addDishForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("dishName").value;
  const price = document.getElementById("dishPrice").value;
  const ingredients = document.getElementById("dishIngredients").value;
  const category = document.getElementById("dishCategory").value;

  try {
    await addDoc(collection(db, "dishes"), {
      name,
      price,
      ingredients,
      category
    });
    alert("Dish added successfully!");
    e.target.reset();
  } catch (error) {
    console.error("Error adding dish: ", error);
  }
});


    // Category filtering
    document.querySelectorAll(".buttons button")?.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".buttons button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");
            if (category === "all") {
                displayDishes();
            } else {
                displayDishes(dishes.filter(d => d.category === category));
            }
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = dishes.filter(d => d.name.toLowerCase().includes(searchTerm));
            displayDishes(filtered);
        });
    }

    // Add form
    import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function loadMenu() {
  const querySnapshot = await getDocs(collection(db, "dishes"));
  const menuContainer = document.getElementById("menuContainer");
  menuContainer.innerHTML = ""; // clear previous
  querySnapshot.forEach((doc) => {
    const dish = doc.data();
    const item = document.createElement("div");
    item.classList.add("menu-item");
    item.innerHTML = `
      <h3>${dish.name}</h3>
      <p>${dish.ingredients}</p>
      <span>${dish.price} EGP</span>
    `;
    menuContainer.appendChild(item);
  });
}

loadMenu();

// Owner login
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const id = document.getElementById("ownerId").value.trim();
        const pass = document.getElementById("ownerPass").value.trim();

        // You can change these to any ID and password you want
        const correctId = "admin123";
        const correctPass = "omar2025";

        if (id === correctId && pass === correctPass) {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("add-section").style.display = "block";
        } else {
            alert("Invalid ID or Password. Please try again.");
        }
    });
}

