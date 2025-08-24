import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/admin" className="text-2xl font-bold tracking-tight text-white">
          Antoree Admin
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/admin" className="hover:underline">Dashboard</Link>

          <Link href="/admin/manage-teacher" className="hover:underline">Giáo viên</Link>
          <Link href="/admin/manage-student" className="hover:underline">Học viên</Link>
          <Link href="/admin/package" className="hover:underline">Đặt lịch học</Link>
          <Link href="/admin/settings" className="hover:underline">Cài đặt</Link>
        </nav>
        <div className="flex gap-2">
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition">Đăng xuất</button>
        </div>
      </div>
    </header>
  );
}