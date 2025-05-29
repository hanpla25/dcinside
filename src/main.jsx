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
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import Writer from "./pages/Writer";
import Post from "./pages/Post";
import GalleryLayout from "./layout/GalleryLayout";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Nav />
      <Routes>
        <Route
          element={
            <GalleryProvider>
              <GalleryLayout />
            </GalleryProvider>
          }
        >
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/gallery/:category/:view" element={<Post />} />
          <Route path="/category" element={<Category />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/writer/:category" element={<Writer />} />
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
