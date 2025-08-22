export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
        <div className="text-lg font-semibold">Antoree &copy; {new Date().getFullYear()}</div>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:underline">Giới thiệu</a>
          <a href="/teachers" className="hover:underline">Tìm giáo viên</a>
          <a href="/packages" className="hover:underline">Gói học</a>
          <a href="/contact" className="hover:underline">Liên hệ</a>
        </div>
        <div className="text-xs text-gray-300">Hotline: 0123 456 789 | Email: support@antoree.com</div>
      </div>
    </footer>
  );
}
