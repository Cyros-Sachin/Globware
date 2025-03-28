import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
