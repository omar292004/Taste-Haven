<script>
  // ===== Import Firebase SDKs =====
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  // ===== Firebase Configuration =====
  const firebaseConfig = {
    apiKey: "AIzaSyB-eE_Edm7gd_nFmBQfP2V7OqBIJntZ4IQ",
    authDomain: "taste-haven-6c92d.firebaseapp.com",
    projectId: "taste-haven-6c92d",
    storageBucket: "taste-haven-6c92d.firebasestorage.app",
    messagingSenderId: "999156594491",
    appId: "1:999156594491:web:345947308aeac9ab77291e",
    measurementId: "G-YLE10M2H9S"
  };

  // ===== Initialize Firebase =====
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  window.db = db;

  // ===== Add Dish Form =====
  const addDishForm = document.getElementById("addDishForm");
  if (addDishForm) {
    addDishForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("dishName").value.trim();
      const price = document.getElementById("dishPrice").value.trim();
      const ingredients = document.getElementById("dishIngredients").value.trim();
      const category = document.getElementById("dishCategory").value.trim();

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
  }

  // ===== Load Menu =====
  async function loadMenu() {
    const menuContainer = document.getElementById("menuContainer");
    if (!menuContainer) return;

    menuContainer.innerHTML = "<p>Loading...</p>";
    const querySnapshot = await getDocs(collection(db, "dishes"));
    menuContainer.innerHTML = "";

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

  // ===== Owner Login =====
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const id = document.getElementById("ownerId").value.trim();
      const pass = document.getElementById("ownerPass").value.trim();

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
</script>

