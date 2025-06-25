// public/js/product.js
import { db } from "../js/firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

async function loadProducts(filters = {}) {
  if (!productList) {
    console.error("Product list element not found.");
    return;
  }
  productList.innerHTML = "";
  let baseQuery = collection(db, "products");
  let productQuery = query(baseQuery, orderBy("createdAt", "desc"));

  if (filters.shopId) {
    productQuery = query(baseQuery, where("shopId", "==", filters.shopId));
  }

  try {
    const snapshot = await getDocs(productQuery);
    if (snapshot.empty) {
      productList.innerHTML = "<li>No products available.</li>";
    } else {
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        if (
          filters.productName &&
          !d.name.toLowerCase().includes(filters.productName.toLowerCase())
        ) {
          return;
        }

        const li = document.createElement("li");
        li.textContent = `${d.name} (Shop: ${d.shopId}) - ₹${d.price} - ${d.features}`;
        productList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error loading products:", error);
    productList.innerHTML = `<li style="color: red;">Error loading products.</li>`;
  }
}

// Attach event listeners and call loadProducts only if elements exist
if (productForm && productList) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const shopId = document.getElementById("shopId").value.trim();
    const name = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const features = document.getElementById("features").value.trim();

    if (!shopId || !name || isNaN(price) || !features) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        shopId,
        name,
        price,
        features,
        createdAt: new Date(),
      });
      alert("Product added!");
      productForm.reset();
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  });

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const filterShopId = document.getElementById("filterShopId");
      const filterProductName = document.getElementById("filterProductName");

      const shopId = filterShopId ? filterShopId.value.trim() : "";
      const productName = filterProductName
        ? filterProductName.value.trim()
        : "";

      loadProducts({ shopId, productName });
    });
  } else {
    console.warn("Filter button not found.");
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const filterShopId = document.getElementById("filterShopId");
      const filterProductName = document.getElementById("filterProductName");

      if (filterShopId) filterShopId.value = "";
      if (filterProductName) filterProductName.value = "";
      loadProducts();
    });
  } else {
    console.warn("Reset button not found.");
  }

  // Initial load of products when the script runs
  loadProducts();
} else {
  console.error(
    "Product form or product list not found. Check product.html structure."
  );
}
