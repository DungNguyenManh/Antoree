"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ email?: string; role?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Lấy role và email từ localStorage (lưu khi đăng nhập)
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const email = localStorage.getItem("email");
        if (!token || role !== "admin") {
            setError("Bạn không có quyền truy cập admin!");
            setTimeout(() => router.push("/"), 1500);
            setLoading(false);
            return;
        }
        setUser({ email: email ?? undefined, role: role ?? undefined });
        setLoading(false);
    }, [router]);

    if (loading) {
        return <div>Đang kiểm tra quyền truy cập...</div>;
    }

    if (error) {
        return <div className="text-red-600 mb-4 font-semibold">{error}</div>;
    }

    // Nếu user là admin, render dashboard
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-2">Xin chào: <span className="font-semibold">{user?.email}</span> ({user?.role})</div>
            {/* Thêm nội dung dashboard quản trị ở đây */}
        </div>
    );
}