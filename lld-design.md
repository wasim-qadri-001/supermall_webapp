## lld-design.md

### 🧩 Low Level Design (LLD)

#### 🔐 Login Flow:

- Capture email/password
- Validate via `<span>signInWithEmailAndPassword()</span>`
- Redirect to admin.html

#### 🏪 Add Shop:

- Input shop name + location
- Validate input using `<span>utils.js</span>`
- Use Firestore `<span>addDoc()</span>`

#### 🎁 Add Offer:

- Input title + description + discount
- Validate offer via `<span>utils.js</span>`
- Use Firestore `<span>addDoc()</span>`

#### 📄 Display Data:

- `<span>shop.js</span>`: Read from `<span>shops</span>` collection
- `<span>offers.js</span>`: Read from `<span>offers</span>` collection
