export default function AdminFooter() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-4 mt-8 border-t border-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
        <div className="text-sm">Antoree Admin &copy; {new Date().getFullYear()}</div>
        <div className="text-xs text-gray-400">Chỉ dành cho quản trị viên hệ thống</div>
      </div>
    </footer>
  );
}