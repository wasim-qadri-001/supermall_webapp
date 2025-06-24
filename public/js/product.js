// public/js/product.js
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");

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

  async function loadProducts(filters = {}) {
    productList.innerHTML = "";
    let baseQuery = collection(db, "products");
    let productQuery = query(baseQuery, orderBy("createdAt", "desc"));

    if (filters.shopId) {
      productQuery = query(baseQuery, where("shopId", "==", filters.shopId));
    }

    try {
      const snapshot = await getDocs(productQuery);
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
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Error loading products.");
    }
  }

  document.getElementById("filterBtn").addEventListener("click", () => {
    const shopId = document.getElementById("filterShopId").value.trim();
    const productName = document
      .getElementById("filterProductName")
      .value.trim();
    loadProducts({ shopId, productName });
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("filterShopId").value = "";
    document.getElementById("filterProductName").value = "";
    loadProducts();
  });

  loadProducts();
});
