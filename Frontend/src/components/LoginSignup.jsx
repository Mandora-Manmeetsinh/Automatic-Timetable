import React, { useState } from "react";

const API_URL = "http://localhost:3000/api";

export default function LoginSignup({ onAuth }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isSignup ? "/signup" : "/login";
      const body = isSignup
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* LEFT: Image */}
      <div className="w-1/2 flex items-center justify-center bg-black">
        <img
          src="/Luffy gear 5 Opening 25.jpg"
          alt="Luffy Gear 5"
          className="object-cover h-full w-full"
          style={{ maxHeight: "100vh" }}
        />
      </div>
      {/* RIGHT: Form */}
      <div className="w-1/2 flex flex-col items-center justify-center px-12 py-16 bg-white text-black">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
              required
            />
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              className="text-black underline"
              onClick={() => setIsSignup((v) => !v)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
