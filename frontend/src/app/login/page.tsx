"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Gọi API đăng nhập ở đây
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, ...)
            // Xử lý response
        } catch (err: unknown) {
            setError("Lỗi: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
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
            <div className="mt-4 text-center">
                <a href="/register" className="text-blue-600 hover:underline mr-4">Đăng ký</a>
                <a href="/forgot-password" className="text-blue-600 hover:underline">Quên mật khẩu?</a>
            </div>
        </form>
    );
}
