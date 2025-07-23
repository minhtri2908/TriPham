import { useState, useRef, useCallback } from "react";
import api from "../../api";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { memo } from "react";

type UploadImage = {
  file: File;
  title?: string;
};

type ImageItemProps = {
  image: UploadImage;
  index: number;
  onRemove: (index: number) => void;
  onChangeTitle: (index: number, title: string) => void;
};

const ImageItem = memo(
  ({ image, index, onRemove, onChangeTitle }: ImageItemProps) => {
    return (
      <div className="relative group">
        <img
          src={URL.createObjectURL(image.file)}
          alt={`img-${index}`}
          className="w-full h-32 object-cover rounded shadow mb-1"
        />
        <input
          type="text"
          placeholder="Tiêu đề ảnh (tùy chọn)"
          className="w-full text-sm p-1 border rounded transition-all focus:ring-1 ring-blue-500"
          value={image.title || ""}
          onChange={(e) => onChangeTitle(index, e.target.value)}
        />
        <button
          onClick={() => onRemove(index)}
          className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded hidden group-hover:block"
        >
          X
        </button>
      </div>
    );
  }
);

export default function AdminUploadImages() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newImages: UploadImage[] = Array.from(selectedFiles).map(
        (file) => ({ file })
      );
      setImages((prev) => [...prev, ...newImages]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleChangeTitle = useCallback((index: number, newTitle: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, title: newTitle } : img))
    );
  }, []);

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 ảnh.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach((img, i) => {
      formData.append("images", img.file);
      formData.append(`titles[${i}]`, img.title || "");
    });

    try {
      await api.post("/image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Tải ảnh thành công!");
      setImages([]);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "❌ Lỗi khi tải ảnh.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">🖼️ Tải bộ ảnh</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
        {images.map((img, index) => (
          <ImageItem
            key={index}
            image={img}
            index={index}
            onRemove={handleRemove}
            onChangeTitle={handleChangeTitle}
          />
        ))}

        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-blue-500 transition">
          <Plus className="w-8 h-8 text-gray-500" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddFile}
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Đang tải..." : "Đăng ảnh"}
      </button>
    </div>
  );
}
