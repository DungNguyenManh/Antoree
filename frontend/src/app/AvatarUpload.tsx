"use client";
import { useState } from "react";

export default function AvatarUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [error, setError] = useState("");

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
      const res = await fetch("https://antoree-backend-40hj.onrender.com/teacher/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl("https://antoree-backend-40hj.onrender.com" + data.url);
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
    <div className="max-w-md mx-auto p-4 border rounded mt-8">
      <h2 className="font-bold mb-2">Upload avatar giáo viên</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="my-2">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Đang upload..." : "Upload"}
      </button>
      {avatarUrl && (
        <div className="mt-4">
          <div>Ảnh đã upload:</div>
          <img src={avatarUrl} alt="Avatar" className="w-32 h-32 object-cover rounded-full" />
          <div className="text-xs break-all mt-1">{avatarUrl}</div>
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
