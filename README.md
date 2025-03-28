# EmployWise Frontend Assignment  

A simple **React-based** user management application that allows users to view, edit, and delete users fetched from an API.  

---

## 🚀 Features  
✅ Fetch users from API  
✅ Edit user details  
✅ Delete users  
✅ Pagination (Next/Prev buttons)  
✅ Local storage for data persistence  

---

## 📂 Project Structure  
```
EmployWise-Frontend/
│── public/                # Public assets
│── src/                   # Source code
│   ├── components/        # React components
│   │   ├── UsersList.js   # Displays users, allows edit & delete
│   │   ├── EditUser.js    # Edit user form
│   ├── styles.css         # Global CSS styles
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│── package.json           # Project dependencies
│── README.md              # Project documentation
```

---

## 📌 Prerequisites  
Make sure you have **Node.js** installed. You can check by running:  
```sh
node -v
npm -v
```

---

## 🔧 Installation & Setup  
Follow these steps to set up the project:

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo-name.git
cd EmployWise-Frontend
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Run the Project  
```sh
npm start
```
This will start the development server at **http://localhost:3000/**.

---

## 🛠 Assumptions & Considerations  
- The project fetches users from `https://reqres.in/api/users`.  
- User edits and deletions are stored **locally** using `localStorage`.  
- Editing a user updates `localStorage`, so changes persist.  
- If users disappear, clear `localStorage` and refresh the page.  
- `Prev/Next` buttons handle pagination, fetching users dynamically.  

---

## ❓ Troubleshooting  
**Problem:** Users disappear after refreshing  
**Solution:** Open DevTools (`F12`) → **Application** → **Local Storage** → Clear it and refresh.  

**Problem:** Styling issues  
**Solution:** Ensure `styles.css` is properly linked in components.

---

## 💡 Future Enhancements  
🔹 Add backend support to persist user edits/deletes.  
🔹 Improve UI with animations & better responsiveness.  
🔹 Implement authentication for user management.  

---

## 📝 License  
This project is **open-source**. Feel free to modify and improve it! 🚀  
