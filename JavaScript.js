document.addEventListener("DOMContentLoaded", () => {
    const menuList = document.getElementById("menu-list");
    const addForm = document.getElementById("addForm");
    const searchInput = document.getElementById("search");

    // Load existing dishes
    let dishes = JSON.parse(localStorage.getItem("dishes")) || [];

    // Display dishes
    function displayDishes(list = dishes) {
        if (!menuList) return;
        menuList.innerHTML = "";
        list.forEach(dish => {
            const div = document.createElement("div");
            div.classList.add("dish");
            div.innerHTML = `
        <h3>${dish.name}</h3>
        <p><b>Price:</b> ${dish.price} EGP</p>
        <p><b>Ingredients:</b> ${dish.ingredients}</p>
        <p><b>Category:</b> ${dish.category}</p>
      `;
            menuList.appendChild(div);
        });
    }

    displayDishes();

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
    if (addForm) {
        addForm.addEventListener("submit", e => {
            e.preventDefault();
            const newDish = {
                name: document.getElementById("dishName").value,
                price: document.getElementById("dishPrice").value,
                ingredients: document.getElementById("dishIngredients").value,
                category: document.getElementById("dishCategory").value
            };
            dishes.push(newDish);
            localStorage.setItem("dishes", JSON.stringify(dishes));
            alert("Dish added successfully!");
            addForm.reset();
        });
    }
});
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
