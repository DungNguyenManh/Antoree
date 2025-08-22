"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                setError("Sai email hoặc mật khẩu");
                setLoading(false);
                return;
            }
            const data = await res.json();
            if (!data.token || !data.data?.role) {
                setError("Đăng nhập thất bại. Vui lòng thử lại.");
                setLoading(false);
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.data.role);
            localStorage.setItem("email", data.data.email);
            alert("Đăng nhập thành công!");
            if (data.data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm
            email={email}
            password={password}
            error={error}
            loading={loading}
            onEmailChange={e => setEmail(e.target.value)}
            onPasswordChange={e => setPassword(e.target.value)}
            onSubmit={handleSubmit}
        />
    );
}
