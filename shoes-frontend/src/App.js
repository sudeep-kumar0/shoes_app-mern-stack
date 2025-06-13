import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
