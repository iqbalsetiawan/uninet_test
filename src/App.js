import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "./features/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Data from "./pages/Data";

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/employee"
          element={user ? <Employee /> : <Navigate to="/login" />}
        />
        <Route
          path="/data"
          element={user ? <Data /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
