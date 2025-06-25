// public/js/offer.js
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

let editOfferId = null;

// Get references to the form and list elements
const offerForm = document.getElementById("offerForm");
const offerList = document.getElementById("offerList");

// Function to load and display offers
async function loadOffers() {
  if (!offerList) {
    console.error("Offer list element not found.");
    return;
  }
  offerList.innerHTML = "";
  try {
    const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      offerList.innerHTML = "<li>No offers available.</li>";
    } else {
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${data.title}</strong> (Shop: ${data.shopId}) - ${data.discount}% off until ${data.expiryDate}
          <button onclick="editOffer('${docSnap.id}', '${data.shopId}', '${data.title}', '${data.discount}', '${data.expiryDate}')">Edit</button>
          <button onclick="deleteOffer('${docSnap.id}')">Delete</button>
        `;
        offerList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error loading offers:", error);
    offerList.innerHTML = `<li style="color: red;">Error loading offers.</li>`;
  }
}

// Attach event listeners and call loadOffers only if elements exist
if (offerForm && offerList) {
  offerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const shopId = document.getElementById("shopId").value;
    const title = document.getElementById("offerTitle").value;
    const discount = document.getElementById("discount").value;
    const expiry = document.getElementById("expiryDate").value;

    if (editOfferId) {
      await updateDoc(doc(db, "offers", editOfferId), {
        shopId,
        title,
        discount,
        expiryDate: expiry,
      });
      alert("Offer updated!");
      editOfferId = null;
    } else {
      await addDoc(collection(db, "offers"), {
        shopId,
        title,
        discount,
        expiryDate: expiry,
        createdAt: new Date(),
      });
      alert("Offer added!");
    }

    offerForm.reset();
    loadOffers();
  });

  // Expose functions globally for onclick attributes
  window.editOffer = (id, shopId, title, discount, expiryDate) => {
    document.getElementById("shopId").value = shopId;
    document.getElementById("offerTitle").value = title;
    document.getElementById("discount").value = discount;
    document.getElementById("expiryDate").value = expiryDate;
    editOfferId = id;
  };

  window.deleteOffer = async (id) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      await deleteDoc(doc(db, "offers", id));
      alert("Offer deleted");
      loadOffers();
    }
  };

  // Initial load of offers when the script runs
  loadOffers();
} else {
  console.error(
    "Offer form or offer list not found. Check offer.html structure."
  );
}
