import React, { useEffect, useState } from "react";
import { getUserListings, deleteListing } from "../utils/api";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchMyListings = async () => {
    try {
      const res = await getUserListings();
      setListings(res.data);
    } catch {
      alert("Failed to load your listings");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteListing(id);
      fetchMyListings();
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">My Listings</h2>
      {listings.map((listing) => (
        <div key={listing._id} className="p-4 mb-4 bg-white rounded shadow">
          <h3 className="text-lg font-bold">{listing.title}</h3>
          <p>{listing.description}</p>
          <div className="flex gap-2 mt-3">
            <button
              className="px-4 py-1 text-white bg-blue-600 rounded"
              onClick={() => navigate(`/edit/${listing._id}`)}
            >
              Edit
            </button>
            <button
              className="px-4 py-1 text-white bg-red-600 rounded"
              onClick={() => handleDelete(listing._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
