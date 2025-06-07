import React, { useEffect, useState } from "react";
import api from "../utils/api";

const MyTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/trades/mine")
      .then(res => setTrades(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Trades</h1>
      {trades.length === 0 ? (
        <div>No trades yet.</div>
      ) : (
        <div className="space-y-4">
          {trades.map(trade => (
            <div key={trade._id} className="p-4 bg-white rounded shadow">
              <div>
                <strong>Offered: </strong>
                {trade.offeredListing?.title || "Your item"}
                {" → "}
                <strong>Requested: </strong>
                {trade.requestedListing?.title || "Other's item"}
              </div>
              <div>Status: <b>{trade.status}</b></div>
              <div>
                {trade.status === "pending" && trade.offeredTo === trade.currentUserId && (
                  <>
                    <button
                      className="px-2 py-1 mr-2 text-white bg-green-600 rounded"
                      onClick={() => api.put(`/trades/${trade._id}`, { status: "accepted" }).then(() => window.location.reload())}
                    >
                      Accept
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded"
                      onClick={() => api.put(`/trades/${trade._id}`, { status: "rejected" }).then(() => window.location.reload())}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrades;
