"use client";

import { useEffect, useState } from "react";

type Teacher = {
    _id: string;
    name: string;
    bio?: string;
    languages?: string[];
    avatar?: string;
};

type User = {
    _id: string;
    name: string;
    email: string;
};

const TIME_SLOTS = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
];

export default function BookingPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [note, setNote] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Lấy danh sách giáo viên
    useEffect(() => {
        fetch("https://antoree-backend-40hj.onrender.com/api/v1/teacher")
            .then(res => res.json())
            .then(data => setTeachers(Array.isArray(data) ? data : data.data || []))
            .catch(() => setError("Không thể tải danh sách giáo viên"))
            .finally(() => setLoading(false));
    }, []);

    // Lấy thông tin user từ localStorage (giả lập)
    useEffect(() => {
        // Giả sử bạn lưu user trong localStorage khi đăng nhập
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!user) {
            setError("Bạn cần đăng nhập để đặt lịch.");
            return;
        }
        if (!selectedTeacher) {
            setError("Vui lòng chọn giáo viên.");
            return;
        }
        if (!selectedTime) {
            setError("Vui lòng chọn khung giờ.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://antoree-backend-40hj.onrender.com/api/v1/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    studentId: user._id,
                    teacherId: selectedTeacher._id,
                    time: selectedTime,
                    note,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Đặt lịch thất bại");
            }
            setSuccess("Đặt lịch thành công!");
            setSelectedTeacher(null);
            setSelectedTime("");
            setNote("");
        } catch (err: any) {
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <main className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Đặt lịch học với giáo viên</h1>
            {loading && <div>Đang tải danh sách giáo viên...</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">{success}</div>}

            {!selectedTeacher ? (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Chọn giáo viên:</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {teachers.map(teacher => (
                            <div
                                key={teacher._id}
                                className="border rounded p-4 shadow flex flex-col gap-2 cursor-pointer hover:bg-blue-50"
                                onClick={() => setSelectedTeacher(teacher)}
                            >
                                <div className="flex items-center gap-4">
                                    {teacher.avatar ? (
                                        <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 object-cover rounded-full" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            Không có ảnh
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-lg text-blue-800">{teacher.name}</div>
                                        {teacher.bio && <div className="text-gray-700">{teacher.bio}</div>}
                                        {teacher.languages && teacher.languages.length > 0 && (
                                            <div className="text-sm text-gray-500">
                                                Ngôn ngữ: {teacher.languages.join(", ")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleBooking} className="flex flex-col gap-4">
                    <button
                        type="button"
                        className="text-blue-600 underline w-fit"
                        onClick={() => setSelectedTeacher(null)}
                    >
                        ← Chọn giáo viên khác
                    </button>
                    <div className="flex items-center gap-4">
                        {selectedTeacher.avatar ? (
                            <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="w-16 h-16 object-cover rounded-full" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                Không có ảnh
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-lg text-blue-800">{selectedTeacher.name}</div>
                            {selectedTeacher.bio && <div className="text-gray-700">{selectedTeacher.bio}</div>}
                            {selectedTeacher.languages && selectedTeacher.languages.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    Ngôn ngữ: {selectedTeacher.languages.join(", ")}
                                </div>
                            )}
                        </div>
                    </div>
                    {user && (
                        <div>
                            <div className="font-semibold">Bạn:</div>
                            <div>{user.name} ({user.email})</div>
                        </div>
                    )}
                    <div>
                        <label className="font-semibold">Chọn khung giờ <span className="text-red-500">*</span>:</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={selectedTime}
                            onChange={e => setSelectedTime(e.target.value)}
                            required
                        >
                            <option value="">-- Chọn khung giờ --</option>
                            {TIME_SLOTS.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold">Ghi chú (không bắt buộc):</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            rows={3}
                            placeholder="Nhập ghi chú nếu có..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded font-semibold"
                    >
                        Đặt lịch
                    </button>
                </form>
            )}
        </main>
    );
}