"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminCreateTeacher({ token }: { token: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, bio, avatarUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Tạo giáo viên thành công!");
        setName(""); setEmail(""); setBio(""); setAvatarUrl("");
      } else {
        setError(data.message || "Tạo thất bại");
      }
    } catch (err: unknown) {
      setError("Lỗi: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Xử lý upload avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_URL}/teacher/upload-avatar`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl(API_URL + data.url);
      } else {
        setError(data.message || "Upload thất bại");
      }
    } catch (err: unknown) {
      setError("Lỗi upload: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Tạo giáo viên mới</h2>
      <input
        type="text"
        placeholder="Tên giáo viên"
        className="w-full mb-2 p-2 border rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bio"
        className="w-full mb-2 p-2 border rounded"
        value={bio}
        onChange={e => setBio(e.target.value)}
      />
      {/* Upload avatar */}
      <div className="mb-2">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="my-2">
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full" />
          </div>
        )}
        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-1"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Đang upload..." : "Upload avatar"}
        </button>
        {avatarUrl && (
          <div className="mt-2 text-xs break-all">{avatarUrl}</div>
        )}
      </div>
      <input
        type="text"
        placeholder="Avatar URL (nếu có)"
        className="w-full mb-2 p-2 border rounded"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
        readOnly
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded font-semibold mt-2"
        disabled={loading}
      >
        {loading ? "Đang tạo..." : "Tạo giáo viên"}
      </button>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}
