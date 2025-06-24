// public/js/offer.js
import { db } from "/js/firebase-config.js";
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

document.addEventListener("DOMContentLoaded", () => {
  const offerForm = document.getElementById("offerForm");
  const offerList = document.getElementById("offerList");

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

  async function loadOffers() {
    offerList.innerHTML = "";
    const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
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

  loadOffers();
});
