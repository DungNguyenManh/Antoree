"use client";
import { useState } from "react";
import AdminLogin from "./admin-login";
import AdminCreateTeacher from "./admin-create-teacher";

export default function AdminPage() {
  const [token, setToken] = useState<string>("");

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return (
    <div>
      <div className="bg-gray-100 py-4 px-6 text-center font-bold text-lg">Admin: Tạo giáo viên</div>
      <AdminCreateTeacher token={token} />
    </div>
  );
}
