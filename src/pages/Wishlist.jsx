import React, { useEffect, useState } from "react";
import { getWishlist } from "../utils/api";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = () => {
    setLoading(true);
    getWishlist()
      .then((res) => setWishlist(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {loading ? (
        <div>Loading...</div>
      ) : wishlist.length === 0 ? (
        <div>No items in wishlist yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              isWished={true}
              onWishChange={fetchWishlist}
              onClick={() => navigate(`/listing/${listing._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
