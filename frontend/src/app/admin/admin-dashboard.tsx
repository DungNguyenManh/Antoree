
"use client";
import { useState, useEffect } from "react";

interface User {
    _id?: string;
    id?: string;
    email: string;
    name?: string;
    role: string;
}

export default function AdminDashboard({ token }: { token: string }) {
    const [tab, setTab] = useState("teacher");

    // State cho danh sách user
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState("");

    useEffect(() => {
        if (tab === "user") {
            setLoadingUsers(true);
            setErrorUsers("");
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setUsers(data);
                    else if (data.data) setUsers(data.data);
                    else setUsers([]);
                })
                .catch(err => setErrorUsers("Lỗi tải user: " + err))
                .finally(() => setLoadingUsers(false));
        }
    }, [tab, token]);

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="flex gap-2 mb-6">
                <button className={`px-4 py-2 rounded ${tab === "teacher" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("teacher")}>Thêm giáo viên</button>
                <button className={`px-4 py-2 rounded ${tab === "user" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("user")}>Xem user</button>
                <button className={`px-4 py-2 rounded ${tab === "booking" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("booking")}>Xem booking</button>
                <button className={`px-4 py-2 rounded ${tab === "package" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("package")}>Xem package</button>
            </div>
            <div>
                {tab === "teacher" && <div>Tính năng thêm giáo viên</div>}
                {tab === "user" && (
                    <div>
                        <h3 className="font-bold mb-2">Danh sách user</h3>
                        {loadingUsers && <div>Đang tải...</div>}
                        {errorUsers && <div className="text-red-500">{errorUsers}</div>}
                        <table className="w-full border mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-2 py-1">Email</th>
                                    <th className="border px-2 py-1">Tên</th>
                                    <th className="border px-2 py-1">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u: User, i: number) => (
                                    <tr key={u._id || u.id || i}>
                                        <td className="border px-2 py-1">{u.email}</td>
                                        <td className="border px-2 py-1">{u.name || ""}</td>
                                        <td className="border px-2 py-1">{u.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {tab === "booking" && <div>Tính năng xem booking</div>}
                {tab === "package" && <div>Tính năng xem package</div>}
            </div>
        </div>
    );
}
