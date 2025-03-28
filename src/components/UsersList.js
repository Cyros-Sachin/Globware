import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // ✅ Check if updated users exist in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers && storedUsers.length > 0) {
      console.log("🔹 Using users from localStorage:", storedUsers);
      setUsers(storedUsers);
      setLoading(false);
    } else {
      // If no localStorage data, fetch from API
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🔹 Fetched users from API:", data.data);
          setUsers(data.data);
          localStorage.setItem("users", JSON.stringify(data.data)); // ✅ Save API data
          setLoading(false);
        })
        .catch((error) => {
          console.error("❌ Error fetching users:", error);
          setLoading(false);
        });
    }
  }, [page]);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // ✅ Save updated data
    }
  };

  return (
    <div>
      <h2>Users List</h2>

      <div className="users-container">
        {loading ? (
          <p className="loading-text">Loading users...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <div className="buttons">
                <button onClick={() => navigate(`/edit/${user.id}`)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-users-text">⚠️ No users available. Try reloading the page.</p>
        )}
      </div>

      <div className="pagination-container">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersList;
