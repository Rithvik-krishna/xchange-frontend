import React from "react";

const ListingCard = ({ listing, onClick }) => (
  <div
    className="bg-white rounded-xl shadow p-4 hover:shadow-lg cursor-pointer transition"
    onClick={onClick}
  >
    <img
      src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://via.placeholder.com/300"}
      alt={listing.title}
      className="h-40 w-full object-cover rounded-lg mb-2"
    />
    <div className="text-lg font-semibold">{listing.title}</div>
    <div className="text-sm text-gray-600">{listing.category}</div>
    <div className="text-sm text-gray-500">{listing.location}</div>
    <div className="mt-1 text-blue-600 font-bold">{listing.type}</div>
  </div>
);

export default ListingCard;
