import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-blue-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-2xl font-bold tracking-tight text-white">
                    Antoree
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/teachers" className="hover:underline">Tìm giáo viên</Link>
                    <Link href="/packages" className="hover:underline">Gói học</Link>
                    <Link href="/about" className="hover:underline">Giới thiệu</Link>
                    <Link href="/contact" className="hover:underline">Liên hệ</Link>
                </nav>
                <div className="flex gap-2">
                    <Link href="/login" className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100 transition">Đăng nhập</Link>
                    <Link href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Đăng ký</Link>
                </div>
            </div>
        </header>
    );
}
