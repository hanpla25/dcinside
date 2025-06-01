import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Header from "./ui/Header";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import GalleryLayout from "./pages/GalleryLayout";
import Gallery from "./pages/Gallery";
import Post from "./pages/Post";
import Create from "./pages/Create";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Category />} />
        <Route path="/create" element={<Create />} />

        <Route path="/gallery/:category" element={<GalleryLayout />}>
          <Route index element={<Gallery />} />
          <Route path=":postId" element={<Post />} />
        </Route>
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
