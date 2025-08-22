export default function ContactPage() {
    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Liên hệ với Antoree</h1>
            <p className="text-gray-700 mb-6">
                Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua thông tin dưới đây hoặc gửi tin nhắn trực tiếp qua form.
            </p>
            <div className="mb-8">
                <div className="mb-2"><span className="font-semibold">Hotline:</span> 0123 456 789</div>
                <div className="mb-2"><span className="font-semibold">Email:</span> support@antoree.com</div>
                <div><span className="font-semibold">Địa chỉ:</span> Tầng 5, Tòa nhà ABC, Quận 1, TP.HCM</div>
            </div>
            <form className="bg-white rounded shadow p-6 flex flex-col gap-4 max-w-md">
                <input type="text" placeholder="Họ và tên" className="border p-2 rounded" required />
                <input type="email" placeholder="Email" className="border p-2 rounded" required />
                <textarea placeholder="Nội dung liên hệ" className="border p-2 rounded" rows={4} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Gửi liên hệ</button>
            </form>
        </main>
    );
}
