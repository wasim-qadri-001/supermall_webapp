// public/js/filters.js (or public/js/utils.js)

// Assuming 'db' is globally available from admin.html's Firebase initialization.
// If you encounter 'db is not defined', you might need to add:
// import { db } from "./firebase-config.js"; // Adjust path if necessary

const filterForm = document.getElementById("filterForm");
const categorySelect = document.getElementById("categorySelect");
const floorSelect = document.getElementById("floorSelect");
const filteredList = document.getElementById("filteredList");
const noResults = document.getElementById("noResults");

/**
 * Populates the category and floor dropdowns with unique values from Firebase shops.
 */
async function populateDropdowns() {
  if (!categorySelect || !floorSelect) {
    console.error("Dropdown elements not found.");
    return;
  }

  const categories = new Set();
  const floors = new Set();

  try {
    const snapshot = await db.collection("shops").get();
    snapshot.forEach((doc) => {
      const shop = doc.data();
      if (shop.category) {
        categories.add(shop.category);
      }
      if (shop.floor) {
        floors.add(shop.floor);
      }
    });

    // Populate Category dropdown
    categorySelect.innerHTML = '<option value="">All Categories</option>'; // Keep default
    Array.from(categories)
      .sort()
      .forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
      });

    // Populate Floor dropdown
    floorSelect.innerHTML = '<option value="">All Floors</option>'; // Keep default
    Array.from(floors)
      .sort()
      .forEach((fl) => {
        const option = document.createElement("option");
        option.value = fl;
        option.textContent = fl;
        floorSelect.appendChild(option);
      });
  } catch (error) {
    console.error("Error populating dropdowns:", error);
  }
}

/**
 * Applies filters based on selected category and floor.
 */
async function applyFilters() {
  if (!filteredList || !noResults) {
    console.error("Filter result elements not found in the DOM.");
    return;
  }

  filteredList.innerHTML = "";
  noResults.textContent = "";

  const selectedCategory = categorySelect.value.trim().toLowerCase();
  const selectedFloor = floorSelect.value.trim().toLowerCase();

  // If no filters are selected, show a message or all shops
  if (!selectedCategory && !selectedFloor) {
    noResults.textContent = "Please select a category or floor to filter.";
    // Optionally, load all shops here if that's desired behavior
    // await loadAllShops(); // You'd need to implement this function
    return;
  }

  try {
    const snapshot = await db.collection("shops").get();
    let found = false;

    if (snapshot.empty) {
      noResults.textContent = "No shops found in Firestore.";
      return;
    }

    snapshot.forEach((doc) => {
      const shop = doc.data();
      const shopCategory = shop.category ? shop.category.toLowerCase() : "";
      const shopFloor = shop.floor ? shop.floor.toLowerCase() : "";

      const matchCategory = selectedCategory
        ? shopCategory === selectedCategory
        : true;
      const matchFloor = selectedFloor ? shopFloor === selectedFloor : true;

      if (matchCategory && matchFloor) {
        const li = document.createElement("li");
        li.textContent = `${shop.name} - Floor: ${shop.floor}, Category: ${shop.category}`;
        filteredList.appendChild(li);
        found = true;
      }
    });

    if (!found) {
      noResults.textContent = "No shops found with the given filters.";
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
    noResults.textContent = "Error fetching shops: " + error.message;
  }
}

// --- Initialization ---
// Attach event listener only if the form exists
if (filterForm) {
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
  });

  // Populate dropdowns when the script loads
  populateDropdowns();
} else {
  console.error("Filter form not found. Check filters.html structure.");
}
