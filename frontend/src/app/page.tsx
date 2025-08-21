import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold mb-4">
        Antoree - Nền tảng học tiếng Anh trực tuyến
      </h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
        >
          Đăng ký
        </Link>
      </div>
    </main>
  );
}
