"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUserEmail(payload.email || null);
            } catch {
                setUserEmail(null);
            }
        } else {
            setUserEmail(null);
        }
    }, []);

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
                setSearchResults([]);
            }
        }
        if (showMenu || showSearch) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu, showSearch]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserEmail(null);
        setShowMenu(false);
        window.location.reload();
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchLoading(true);
        setSearchResults([]);
        if (searchName.trim()) {
            try {
                const res = await fetch(
                    `https://antoree-backend-40hj.onrender.com/api/v1/teacher?name=${encodeURIComponent(searchName.trim())}`
                );
                const data = await res.json();
                setSearchResults(Array.isArray(data) ? data : data.data || []);
            } catch {
                setSearchResults([]);
            }
        }
        setSearchLoading(false);
    };

    return (
        <header className="w-full bg-blue-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-2xl font-bold tracking-tight text-white">
                    Antoree
                </Link>
                <nav className="flex gap-6 text-sm font-medium items-center">
                    <button
                        className="hover:underline bg-transparent border-none outline-none cursor-pointer"
                        onClick={() => setShowSearch((v) => !v)}
                        type="button"
                    >
                        Tìm giáo viên
                    </button>
                    <Link href="/booking" className="hover:underline">Đặt lịch học</Link>
                    <Link href="/about" className="hover:underline">Giới thiệu</Link>
                    <Link href="/contact" className="hover:underline">Liên hệ</Link>
                </nav>
                {showSearch && (
                    <div
                        ref={searchRef}
                        className="absolute left-1/2 top-16 -translate-x-1/2 bg-white text-blue-900 rounded shadow-lg z-50 border px-4 py-3 flex flex-col gap-2 min-w-[320px]"
                    >
                        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Nhập tên giáo viên..."
                                value={searchName}
                                onChange={e => setSearchName(e.target.value)}
                                className="border p-2 rounded text-blue-900"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                            >
                                Tìm
                            </button>
                        </form>
                        {searchLoading && <div>Đang tìm kiếm...</div>}
                        {!searchLoading && searchResults.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {searchResults.map((teacher: any) => (
                                    <div key={teacher._id} className="border rounded p-2 flex items-center gap-3 bg-blue-50">
                                        {teacher.avatar ? (
                                            <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 object-cover rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                ?
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-semibold">{teacher.name}</div>
                                            {teacher.languages && teacher.languages.length > 0 && (
                                                <div className="text-xs text-gray-600">
                                                    Ngôn ngữ: {teacher.languages.join(", ")}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!searchLoading && searchResults.length === 0 && searchName.trim() && (
                            <div className="text-gray-500 italic">Không tìm thấy giáo viên phù hợp.</div>
                        )}
                    </div>
                )}
                {userEmail ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100 transition font-semibold min-w-[120px]"
                            onClick={() => setShowMenu((v) => !v)}
                        >
                            {userEmail}
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-44 bg-white text-blue-900 rounded shadow-lg z-50 border">
                                <Link href="/profile" className="block px-4 py-2 hover:bg-blue-50">Thông tin cá nhân</Link>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-blue-50"
                                    onClick={handleLogout}
                                >Đăng xuất</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100 transition">Đăng nhập</Link>
                        <Link href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Đăng ký</Link>
                    </div>
                )}
            </div>
        </header>
    );
}