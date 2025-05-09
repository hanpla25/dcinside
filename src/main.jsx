import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

import "./index.css";
import Header from "./ui/Header";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
