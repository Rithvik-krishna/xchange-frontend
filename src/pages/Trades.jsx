import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = () => {
    setLoading(true);
    api.get("/trades")
      .then(res => setTrades(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Get logged-in user ID from JWT
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1])).id;
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  // Handler for accept/reject
  const handleStatus = async (tradeId, status) => {
    try {
      await api.put(`/trades/${tradeId}/status`, { status });
      fetchTrades(); // refresh list
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to update trade status");
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Your Trades</h1>
      {loading ? (
        <div>Loading...</div>
      ) : trades.length === 0 ? (
        <div>No trade requests yet.</div>
      ) : (
        <table className="w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2">Offered</th>
              <th className="px-3 py-2">Requested</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">With</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => (
              <tr key={trade._id}>
                <td className="px-3 py-2">{trade.offeredListing?.title}</td>
                <td className="px-3 py-2">{trade.requestedListing?.title}</td>
                <td className="px-3 py-2 capitalize">{trade.status}</td>
                <td className="px-3 py-2">
                  {trade.offeredBy?._id === userId
                    ? trade.offeredTo?.name || "User"
                    : trade.offeredBy?.name || "User"}
                </td>
                <td className="px-3 py-2">
                  {trade.offeredTo?._id === userId && trade.status === "pending" ? (
                    <>
                      <button
                        className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                        onClick={() => handleStatus(trade._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="px-2 py-1 text-white bg-red-500 rounded"
                        onClick={() => handleStatus(trade._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Trades;
