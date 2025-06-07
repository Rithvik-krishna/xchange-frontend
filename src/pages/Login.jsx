import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      // No need to call setApiToken; token is set in localStorage and picked up by api.js
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-2 border rounded"
        />
        <button className="py-2 text-white bg-green-600 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
