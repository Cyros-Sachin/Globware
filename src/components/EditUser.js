import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("editUser"));
    if (storedUser && storedUser.id === parseInt(id)) {
      console.log("Fetched user for editing:", storedUser); // 🔍 Log the user fetched for editing
      setEditedUser(storedUser);
    }
  }, [id]);

  const handleChange = (e) => {
    const newUserData = { ...editedUser, [e.target.name]: e.target.value };
    console.log("Updated User Data (onChange):", newUserData); // 🔍 Log updated user data
    setEditedUser(newUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedUser) return;

    // ✅ Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Update the user in the list
    users = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );

    console.log("Final Updated Users List (onSubmit):", users); // 🔍 Log updated users list

    // ✅ Save updated users
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Navigate back to UsersList page
    navigate("/users");
  };

  if (!editedUser) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={editedUser.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          value={editedUser.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
