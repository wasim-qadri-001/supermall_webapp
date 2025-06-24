// src/js/utils.js
import { db } from "../js/firebase-config.js";
export function validateShopForm(name, location) {
  if (!name || name.trim().length < 3) {
    return {
      valid: false,
      message: "Shop name must be at least 3 characters.",
    };
  }
  if (!location || location.trim().length < 3) {
    return { valid: false, message: "Location must be at least 3 characters." };
  }
  return { valid: true };
}

export function validateOfferForm(title, description, discount) {
  if (!title || title.trim() === "")
    return { valid: false, message: "Title is required." };
  if (!description || description.trim() === "")
    return { valid: false, message: "Description is required." };
  if (isNaN(discount) || discount <= 0 || discount > 100)
    return { valid: false, message: "Discount must be between 1 and 100." };
  return { valid: true };
}
