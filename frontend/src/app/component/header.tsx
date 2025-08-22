"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Header() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Lấy email từ localStorage nếu đã đăng nhập
        const token = localStorage.getItem("token");
        if (token) {
            // Giải mã token để lấy email (giả sử payload là { email })
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
        }
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserEmail(null);
        setShowMenu(false);
        window.location.reload();
    };

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
