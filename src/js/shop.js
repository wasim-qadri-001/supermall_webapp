// shop.js
import { db } from "../firebase/firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const shopContainer = document.getElementById("shops");
async function displayShops() {
  const querySnapshot = await getDocs(collection(db, "shops"));
  querySnapshot.forEach((doc) => {
    const shop = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<h3>${shop.name}</h3><p>${shop.location}</p>`;
    shopContainer.appendChild(div);
  });
}

displayShops();
