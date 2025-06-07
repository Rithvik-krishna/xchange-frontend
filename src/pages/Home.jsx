import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/listings")
      .then((res) => setListings(res.data))
      .catch(() => setListings([]));
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Browse Listings</h2>
      {listings.length === 0 ? (
        <div>No items available</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="p-4 transition bg-white rounded shadow cursor-pointer hover:bg-blue-50"
              onClick={() => navigate(`/listing/${listing._id}`)}
            >
              <img
                src={listing.images && listing.images[0] ? listing.images[0] : "https://via.placeholder.com/150"}
                alt={listing.title}
                className="object-cover w-full h-32 mb-2 rounded"
              />
              <h3 className="font-bold">{listing.title}</h3>
              <p>{listing.description}</p>
              <p className="text-sm text-gray-600">{listing.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
