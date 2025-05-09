import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

import "./index.css";
import Header from "./ui/Header";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Signup from "./pages/Signup";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/category" element={<Category />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
