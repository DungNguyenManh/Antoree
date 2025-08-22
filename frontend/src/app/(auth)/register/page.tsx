"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Đăng ký thất bại");
                setLoading(false);
                return;
            }
            setSuccess("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            setError("Đã xảy ra lỗi, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-blue-700">Đăng ký tài khoản</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="border p-2 rounded bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="border p-2 rounded bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>
                {error && <div className="text-red-600 mt-4 text-center w-full">{error}</div>}
                {success && <div className="text-green-600 mt-4 text-center w-full">{success}</div>}
            </div>
        </main>
    );
}
