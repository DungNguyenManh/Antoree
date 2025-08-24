"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Teacher = {
    _id: string;
    name: string;
    bio?: string;
    languages?: string[];
    avatar?: string;
};

export default function ManageTeacherPage() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [languages, setLanguages] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Lấy danh sách giáo viên
    const fetchTeachers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://antoree-backend-40hj.onrender.com/api/v1/teacher", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Không thể tải danh sách giáo viên");
            const data = await res.json();
            setTeachers(Array.isArray(data) ? data : data.data || []);
        } catch {
            setTeachers([]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "admin") {
            setError("Bạn không có quyền truy cập admin!");
            setTimeout(() => router.push("/"), 1500);
            setLoading(false);
            return;
        }
        fetchTeachers().finally(() => setLoading(false));
    }, [router]);

    // Thêm hoặc cập nhật giáo viên
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Bạn chưa đăng nhập!");
                return;
            }
            const body = {
                name,
                ...(bio && { bio }),
                ...(languages && { languages: languages.split(",").map(s => s.trim()).filter(Boolean) }),
                ...(avatar && { avatar }),
            };
            let res;
            if (editId) {
                res = await fetch(`https://antoree-backend-40hj.onrender.com/api/v1/teacher/${editId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                });
            } else {
                res = await fetch("https://antoree-backend-40hj.onrender.com/api/v1/teacher", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                });
            }
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Lưu giáo viên thất bại");
            }
            setSuccess(editId ? "Cập nhật giáo viên thành công!" : "Tạo giáo viên thành công!");
            setName("");
            setBio("");
            setLanguages("");
            setAvatar("");
            setEditId(null);
            fetchTeachers();
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    // Xóa giáo viên
    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa giáo viên này?")) return;
        setError("");
        setSuccess("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://antoree-backend-40hj.onrender.com/api/v1/teacher/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Xóa giáo viên thất bại");
            }
            setSuccess("Xóa giáo viên thành công!");
            fetchTeachers();
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    // Chọn giáo viên để sửa
    const handleEdit = (teacher: Teacher) => {
        setEditId(teacher._id);
        setName(teacher.name);
        setBio(teacher.bio || "");
        setLanguages((teacher.languages || []).join(", "));
        setAvatar(teacher.avatar || "");
        setSuccess("");
        setError("");
    };

    if (loading) return <div>Đang kiểm tra quyền truy cập...</div>;
    if (error) return <div className="text-red-600 font-semibold mb-4">{error}</div>;

    return (
        <main className="max-w-3xl mx-auto p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
                {editId ? "Cập nhật giáo viên" : "Tạo giáo viên mới"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Tên giáo viên"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="border p-2 rounded text-gray-900"
                />
                <input
                    type="text"
                    placeholder="Tiểu sử (bio)"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="border p-2 rounded text-gray-900"
                />
                <input
                    type="text"
                    placeholder="Ngôn ngữ (cách nhau bởi dấu phẩy, ví dụ: English, Vietnamese)"
                    value={languages}
                    onChange={e => setLanguages(e.target.value)}
                    className="border p-2 rounded text-gray-900"
                />
                <input
                    type="text"
                    placeholder="Link ảnh đại diện (avatar)"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                    className="border p-2 rounded text-gray-900"
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded min-w-[120px]">
                        {editId ? "Cập nhật" : "Tạo giáo viên"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            className="bg-gray-400 text-white p-2 rounded min-w-[120px]"
                            onClick={() => {
                                setEditId(null);
                                setName("");
                                setBio("");
                                setLanguages("");
                                setAvatar("");
                                setSuccess("");
                                setError("");
                            }}
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </form>
            {success && <div className="text-green-600 mb-2">{success}</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}

            <h2 className="text-xl font-bold mb-2 text-gray-900">Danh sách giáo viên</h2>
            <table className="w-full border-collapse bg-white rounded shadow text-gray-900">
                <thead>
                    <tr>
                        <th className="border p-2 bg-blue-50 font-semibold">Ảnh</th>
                        <th className="border p-2 bg-blue-50 font-semibold">Tên</th>
                        <th className="border p-2 bg-blue-50 font-semibold">Bio</th>
                        <th className="border p-2 bg-blue-50 font-semibold">Ngôn ngữ</th>
                        <th className="border p-2 bg-blue-50 font-semibold">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((t) => (
                        <tr key={t._id} className="even:bg-gray-50">
                            <td className="border p-2">
                                {t.avatar ? (
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 object-cover rounded-full" />
                                ) : (
                                    <span className="text-gray-400 italic">Không có ảnh</span>
                                )}
                            </td>
                            <td className="border p-2">{t.name}</td>
                            <td className="border p-2">{t.bio}</td>
                            <td className="border p-2">{(t.languages || []).join(", ")}</td>
                            <td className="border p-2 flex gap-2">
                                <button
                                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                                    onClick={() => handleEdit(t)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(t._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}