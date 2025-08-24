"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Teacher = {
  _id: string;
  name: string;
  bio?: string;
  languages?: string[];
  avatar?: string;
};

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://antoree-backend-40hj.onrender.com/api/v1/teacher")
      .then(res => {
        if (!res.ok) throw new Error("Không thể tải danh sách giáo viên");
        return res.json();
      })
      .then(data => {
        setTeachers(Array.isArray(data) ? data : data.data || []);
      })
      .catch(() => setError("Không thể tải danh sách giáo viên"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">Danh sách giáo viên</h2>
        {loading && <div>Đang tải danh sách giáo viên...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4">
            {teachers.map(teacher => (
              <div key={teacher._id} className="border rounded p-4 shadow flex flex-col gap-2 items-center">
                {teacher.avatar ? (
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-2">
                    Không có ảnh
                  </div>
                )}
                <div className="font-bold text-lg text-blue-800">{teacher.name}</div>
                {teacher.bio && <div className="text-gray-700">{teacher.bio}</div>}
                {teacher.languages && teacher.languages.length > 0 && (
                  <div className="text-sm text-gray-500">
                    Ngôn ngữ: {teacher.languages.join(", ")}
                  </div>
                )}
                <Link
                  href={`/register?teacherId=${teacher._id}`}
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-center"
                >
                  Đăng ký học với giáo viên này
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}