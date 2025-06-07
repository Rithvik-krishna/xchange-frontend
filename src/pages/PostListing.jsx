import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const PostListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("item");
  const [location, setLocation] = useState("");
  // For simplicity, image upload is skipped; you can add later.
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setSuccess("");
    try {
      await api.post("/listings", {
        title, description, category, type, location
      });
      setSuccess("Listing created!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setErr("Failed to create listing.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <form className="bg-white shadow rounded p-8 max-w-lg w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Post a New Listing</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded mb-4 w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded mb-4 w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g. books, furniture)"
          className="border p-2 rounded mb-4 w-full"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <select
          className="border p-2 rounded mb-4 w-full"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="item">Item</option>
          <option value="service">Service</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded mb-4 w-full"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        {/* For images: add file upload here later */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">Post Listing</button>
      </form>
    </div>
  );
};

export default PostListing;
