"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminCreateTeacher({ token }: { token: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, bio }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Tạo giáo viên thành công!");
        setName(""); setEmail(""); setBio("");
      } else {
        setError(data.message || "Tạo thất bại");
      }
    } catch (err: unknown) {
      setError("Lỗi: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Tạo giáo viên mới</h2>
      <input
        type="text"
        placeholder="Tên giáo viên"
        className="w-full mb-2 p-2 border rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bio"
        className="w-full mb-2 p-2 border rounded"
        value={bio}
        onChange={e => setBio(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded font-semibold mt-2"
        disabled={loading}
      >
        {loading ? "Đang tạo..." : "Tạo giáo viên"}
      </button>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}
