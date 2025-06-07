// src/components/ListingCard.jsx

import React, { useState } from "react";
import { addToWishlist } from "../utils/api";

const ListingCard = ({ listing, onClick }) => {
  const [wished, setWished] = useState(false);

  const handleWish = async (e) => {
    e.stopPropagation();
    try {
      await addToWishlist(listing._id);
      setWished(true);
    } catch {
      alert("Error saving to wishlist");
    }
  };

  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow p-4 hover:shadow-lg cursor-pointer relative">
      <button
        className={`absolute top-3 right-3 text-2xl ${wished ? "text-pink-500" : "text-gray-400"}`}
        title={wished ? "Wished" : "Save to wishlist"}
        onClick={handleWish}
      >
        {wished ? "♥" : "♡"}
      </button>
      <img
        src={listing.images && listing.images[0] ? listing.images[0] : "https://via.placeholder.com/300"}
        alt={listing.title}
        className="h-32 w-full object-cover rounded-lg mb-2"
      />
      <div className="text-lg font-semibold">{listing.title}</div>
      <div className="text-sm text-gray-600">{listing.category}</div>
      <div className="text-sm text-gray-500">{listing.location}</div>
      <div className="mt-1 text-blue-600 font-bold">{listing.type}</div>
    </div>
  );
};

export default ListingCard;
