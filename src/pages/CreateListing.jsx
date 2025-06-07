import React, { useState } from "react";
import api from "../utils/api"; // your backend API utility

const CreateListing = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/listings", form);
      alert("Listing created!");
      setForm({ title: "", description: "", category: "", location: "" });
    } catch (err) {
      alert("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Post a Listing</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-full p-2 mb-2" placeholder="Title" name="title" value={form.title} onChange={handleChange} required />
        <textarea className="w-full p-2 mb-2" placeholder="Description" name="description" value={form.description} onChange={handleChange} required />
        <input className="w-full p-2 mb-2" placeholder="Category" name="category" value={form.category} onChange={handleChange} required />
        <input className="w-full p-2 mb-2" placeholder="Location" name="location" value={form.location} onChange={handleChange} required />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          {loading ? "Posting..." : "Post Listing"}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
