// src/js/offers.js
import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import log from "./logging.js";

const offerContainer = document.getElementById("offers");

export async function displayOffers() {
  try {
    const offersSnapshot = await getDocs(collection(db, "offers"));
    offersSnapshot.forEach((doc) => {
      const offer = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<h4>${offer.title}</h4><p>${offer.description}</p><strong>Discount: ${offer.discount}%</strong>`;
      offerContainer.appendChild(div);
    });
    log.info("Displayed all offers.");
  } catch (err) {
    log.error("Error loading offers:", err);
  }
}

export async function addOffer(title, description, discount) {
  try {
    await addDoc(collection(db, "offers"), {
      title,
      description,
      discount,
    });
    log.info("Offer added:", title);
    alert("Offer added successfully.");
  } catch (error) {
    log.error("Error adding offer:", error);
    alert("Failed to add offer.");
  }
}
