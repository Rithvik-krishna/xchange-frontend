import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, updateListing } from "../utils/api";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: ""
  });

  useEffect(() => {
    getListingById(id).then((res) => {
      const { title, description, category, location } = res.data;
      setForm({ title, description, category, location });
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateListing(id, form);
    alert("Listing updated!");
    navigate("/my-listings");
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-8 bg-white rounded shadow">
      <h2 className="mb-4 text-xl font-bold">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="p-2 border rounded" />
        <button className="py-2 text-white bg-green-600 rounded" type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditListing;
