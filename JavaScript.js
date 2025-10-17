document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const buttons = document.querySelectorAll(".buttons button");
  const dishCards = document.querySelectorAll(".dish-card");

  // 🔍 Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const searchTerm = e.target.value.toLowerCase();
      dishCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 🍽️ Category filtering
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      dishCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
