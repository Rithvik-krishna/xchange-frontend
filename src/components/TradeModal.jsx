import React, { useState } from "react";
import { proposeTrade } from "../utils/api";

const TradeModal = ({
  open,
  onClose,
  requestedListing,
  requestedListingOwner,
  userListings = [],
}) => {
  const [selectedListing, setSelectedListing] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTradeRequest = async () => {
    if (!selectedListing) return alert("Select an item to offer!");
    setLoading(true);
    try {
      await proposeTrade({
        requestedListing,
        offeredListing: selectedListing,
        offeredTo: requestedListingOwner,
        message: "Let's trade!",
      });
      alert("Trade request sent!");
      onClose();
    } catch (error) {
      alert(
        error?.response?.data?.error ||
        "Failed to send trade request"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Choose an Item to Offer</h2>
          <button onClick={onClose}>×</button>
        </div>
        <select
          className="w-full border px-2 py-1 mb-4"
          value={selectedListing}
          onChange={e => setSelectedListing(e.target.value)}
          disabled={userListings.length === 0}
        >
          <option value="">
            {userListings.length === 0 ? "No items to offer" : "-- Select your item --"}
          </option>
          {userListings.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleTradeRequest}
          disabled={loading || userListings.length === 0}
        >
          {loading ? "Sending..." : "Send Trade Request"}
        </button>
      </div>
    </div>
  );
};

export default TradeModal;
