"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [failCount, setFailCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        // Kiểm tra role admin
        if (data.user && data.user.role === "admin") {
          onLogin(data.access_token);
          router.push("/admin");
        } else {
          setError("Bạn không có quyền truy cập admin!");
          setFailCount(failCount + 1);
        }
      } else {
        setError(data.message || "Đăng nhập thất bại");
        setFailCount(failCount + 1);
      }
    } catch (err: unknown) {
      setError("Lỗi: " + (err instanceof Error ? err.message : String(err)));
      setFailCount(failCount + 1);
    } finally {
      setLoading(false);
    }
  };

  // Nếu sai 3 lần thì chuyển về trang chủ
  if (failCount >= 3) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đăng nhập Admin</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}
