import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/auth/signup", { email, name, password });
      // Optionally, you can auto-login here, or redirect to login
      window.dispatchEvent(new Event("storage"));
      navigate("/login");
    } catch (error) {
      setErr("Error creating account.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <form className="bg-white shadow rounded p-8 max-w-md w-full" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4 font-bold">Signup</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded mb-4 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded mb-4 w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded mb-4 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
