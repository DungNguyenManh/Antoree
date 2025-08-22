import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <img src="/vercel.svg" alt="Antoree Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Chào mừng đến với Antoree</h1>
        <p className="text-gray-600 mb-6 text-center">
          Nền tảng học trực tuyến kết nối học viên và giáo viên chất lượng cao. Đăng ký tài khoản để trải nghiệm các khoá học, đặt lịch học, quản lý thông tin cá nhân và nhiều tiện ích khác.
        </p>
        <div className="flex gap-4 mb-6">
          <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Đăng nhập</a>
          <a href="/register" className="bg-gray-200 text-blue-700 px-6 py-2 rounded hover:bg-gray-300 transition">Đăng ký</a>
        </div>
        <div className="w-full border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Tính năng nổi bật</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Đặt lịch học với giáo viên phù hợp</li>
            <li>Quản lý khoá học, lịch sử học tập</li>
            <li>Giao diện thân thiện, dễ sử dụng</li>
            <li>Hỗ trợ nhiều phương thức thanh toán</li>
            <li>Bảo mật thông tin người dùng</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
