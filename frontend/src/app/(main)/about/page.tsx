export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Về Antoree</h1>
            <p className="text-gray-700 mb-4">
                Antoree là nền tảng kết nối học viên và giáo viên tiếng Anh 1-1 hàng đầu tại Việt Nam. Chúng tôi mang đến giải pháp học tập cá nhân hóa, linh hoạt về thời gian, giúp học viên tiến bộ nhanh chóng với sự đồng hành của đội ngũ giáo viên chất lượng cao.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Sứ mệnh</h2>
            <p className="text-gray-700 mb-4">
                Giúp mọi người Việt Nam có cơ hội tiếp cận phương pháp học tiếng Anh hiệu quả, tiết kiệm thời gian và chi phí, nâng cao năng lực hội nhập quốc tế.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Giá trị cốt lõi</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Lấy học viên làm trung tâm</li>
                <li>Chất lượng giáo viên là ưu tiên hàng đầu</li>
                <li>Đổi mới công nghệ và phương pháp giảng dạy</li>
                <li>Minh bạch, tận tâm, đồng hành cùng học viên</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Liên hệ</h2>
            <p className="text-gray-700">
                Hotline: 0123 456 789<br />
                Email: support@antoree.com
            </p>
        </main>
    );
}