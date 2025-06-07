import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/listings")
      .then((res) => setListings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Browse Listings</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onClick={() => navigate(`/listing/${listing._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
