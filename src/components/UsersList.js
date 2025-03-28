import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ State for filtered users
  const [search, setSearch] = useState(""); // ✅ Search query state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // ✅ Check localStorage first
    const savedUsers = JSON.parse(localStorage.getItem("users"));

    if (savedUsers && savedUsers.length > 0) {
      console.log("Loading users from localStorage:", savedUsers);
      setUsers(savedUsers);
      setLoading(false);
    } else {
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched users from API:", data.data);
          setUsers(data.data);
          localStorage.setItem("users", JSON.stringify(data.data)); // ✅ Save users to localStorage
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });
    }
  }, [page]);


  // ✅ Search Functionality
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search users by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="users-container">
        {loading ? (
          <p className="loading-text">Loading users...</p>
        ) : (
          filteredUsers.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <div className="buttons">
                <button
                  onClick={() => {
                    console.log("Editing User:", user); // Debugging Log
                    localStorage.setItem("editUser", JSON.stringify(user)); // ✅ Save user in localStorage
                    navigate(`/edit/${user.id}`); // ✅ Navigate to edit page
                  }}
                >
                  Edit
                </button>

                <button className="delete-button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
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
