"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    // Thêm các trường khác nếu cần
};

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "admin") {
            setError("Bạn không có quyền truy cập admin!");
            setTimeout(() => router.push("/"), 1500);
            setLoading(false);
            return;
        }
        fetch("https://antoree-backend-40hj.onrender.com/api/v1/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Lỗi khi lấy danh sách học viên");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) setStudents(data.data);
                else if (Array.isArray(data)) setStudents(data);
                else setStudents([]);
            })
            .catch(() => setError("Không thể tải danh sách học viên"))
            .finally(() => setLoading(false));
    }, [router]);

    return (
        <main className="max-w-4xl mx-auto p-8 bg-white min-h-screen rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-blue-900">Danh sách học viên</h1>
            {loading && <div>Đang tải...</div>}
            {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
            {!loading && !error && (
                <table className="w-full border-collapse bg-white rounded shadow text-gray-900">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-blue-50 font-semibold text-gray-900">Tên</th>
                            <th className="border p-2 bg-blue-50 font-semibold text-gray-900">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id || s._id} className="even:bg-gray-50">
                                <td className="border p-2 text-gray-900">{s.name}</td>
                                <td className="border p-2 text-gray-900">{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}