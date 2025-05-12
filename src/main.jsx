import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Header from "./ui/Header";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import { GalleryProvider } from "./context/GalleryContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GalleryProvider>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category" element={<Category />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </GalleryProvider>
  </BrowserRouter>
);
