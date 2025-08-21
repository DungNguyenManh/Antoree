"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            // Gọi API quên mật khẩu ở đây
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, ...)
            // Xử lý response
        } catch (err: unknown) {
            setError("Lỗi: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Quên mật khẩu</h2>
            <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 border rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
                disabled={loading}
            >
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-600 mt-2">{success}</div>}
            <div className="mt-4 text-center">
                <a href="/login" className="text-blue-600 hover:underline">Quay lại đăng nhập</a>
            </div>
        </form>
    );
}
