const shopForm = document.getElementById("shopForm");
const shopContainer = document.getElementById("shopList");
let editShopId = null;

function renderShop(docSnap) {
  const shop = docSnap.data();
  const li = document.createElement("li");
  li.innerHTML = `
      <strong>${shop.name}</strong> - Floor: ${shop.floor}, Category: ${shop.category}
      <button onclick="editShop('${docSnap.id}', '${shop.name}', '${shop.floor}', '${shop.category}')">Edit</button>
      <button onclick="deleteShop('${docSnap.id}')">Delete</button>
    `;
  shopContainer.appendChild(li);
}

async function loadShops() {
  console.log("🔄 Loading shops...");
  shopContainer.innerHTML = "";
  try {
    const snapshot = await firebase.firestore().collection("shops").get();
    if (snapshot.empty) {
      console.log("⚠️ No shops found in Firestore.");
      shopContainer.innerHTML = "<li>No shops available.</li>";
    } else {
      snapshot.forEach((doc) => {
        console.log("📄 Shop doc:", doc.id, doc.data());
        renderShop(doc);
      });
    }
  } catch (err) {
    console.error("❌ Error fetching shops:", err);
    shopContainer.innerHTML = `<li style="color: red;">Error loading shops.</li>`;
  }
}

// Initialize the shop functionality directly when the script runs
if (shopForm && shopContainer) {
  // Ensure elements exist before attaching listeners
  shopForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("shopName").value.trim();
    const floor = document.getElementById("floor").value.trim();
    const category = document.getElementById("category").value.trim();

    if (!name || !floor || !category) {
      alert("Please fill all fields.");
      return;
    }

    if (editShopId) {
      await firebase
        .firestore()
        .collection("shops")
        .doc(editShopId)
        .update({ name, floor, category });
      alert("Shop updated!");
      editShopId = null;
    } else {
      await firebase
        .firestore()
        .collection("shops")
        .add({ name, floor, category });
      alert("Shop added!");
    }

    shopForm.reset();
    loadShops();
  });

  window.editShop = (id, name, floor, category) => {
    document.getElementById("shopName").value = name;
    document.getElementById("floor").value = floor;
    document.getElementById("category").value = category;
    editShopId = id;
  };

  window.deleteShop = async (id) => {
    if (confirm("Are you sure you want to delete this shop?")) {
      await firebase.firestore().collection("shops").doc(id).delete();
      alert("Shop deleted");
      loadShops();
    }
  };

  loadShops(); // Call loadShops immediately
} else {
  console.error("Shop form or container not found. Check shop.html structure.");
}
