import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getListingById,
  addToWishlist,
  removeFromWishlist,
  getUserListings,
  proposeTrade
} from "../utils/api";
import TradeModal from "../components/TradeModal";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    getListingById(id)
      .then((res) => setListing(res.data))
      .catch(() => setListing(null));
    // Optionally update isWished based on wishlist API here
  }, [id]);

  const handleAddToWishlist = async () => {
    await addToWishlist(listing._id);
    setIsWished(true);
  };

  const handleRemoveFromWishlist = async () => {
    await removeFromWishlist(listing._id);
    setIsWished(false);
  };

  const handleOpenTradeModal = async () => {
    const response = await getUserListings();
    setUserListings(response.data);
    setShowTradeModal(true);
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <img
        src={listing.images && listing.images[0] ? listing.images[0] : "https://via.placeholder.com/300"}
        alt={listing.title}
        className="object-cover w-full mb-6 rounded-lg max-h-80"
      />
      <h1 className="mb-2 text-2xl font-bold">{listing.title}</h1>
      <div className="mb-4 text-gray-600">{listing.description}</div>
      <div className="mb-1">
        <strong>Category:</strong> {listing.category}
      </div>
      <div className="mb-1">
        <strong>Location:</strong> {listing.location}
      </div>
      <div className="mb-1">
        <strong>Type:</strong> {listing.type}
      </div>
      <div className="flex gap-3 mt-6">
        {isWished ? (
          <button
            className="px-4 py-2 text-white bg-pink-600 rounded"
            onClick={handleRemoveFromWishlist}
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            className="px-4 py-2 text-white bg-pink-600 rounded"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </button>
        )}
        <button
          className="px-4 py-2 text-white bg-green-700 rounded"
          onClick={handleOpenTradeModal}
        >
          Propose Trade
        </button>
      </div>
      <TradeModal
        open={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        requestedListing={listing._id}
        requestedListingOwner={listing.owner?._id || listing.owner}
        userListings={userListings}
      />
    </div>
  );
};

export default ListingDetail;
