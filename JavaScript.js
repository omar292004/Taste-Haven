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

