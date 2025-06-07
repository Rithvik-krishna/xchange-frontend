import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostListing from "./pages/PostListing";
import Wishlist from "./pages/Wishlist";
import Trades from "./pages/Trades";
import ProtectedRoute from "./components/ProtectedRoute";
import EditListing from "./pages/EditListing";
import MyListings from "./pages/MyListings";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={
          <ProtectedRoute><PostListing /></ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute><Wishlist /></ProtectedRoute>
        } />
        <Route path="/trades" element={
          <ProtectedRoute><Trades /></ProtectedRoute>
        } />
        <Route path="/edit/:id" element={<ProtectedRoute><EditListing /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
