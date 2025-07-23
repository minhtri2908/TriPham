import { useEffect, useState } from "react";
import api from "../../api";

export default function Photo() {
  type ImageType = {
    _id: string;
    title: string;
    url: string;
  };

  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    api.get("/image")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Lỗi tải ảnh:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        📸 Sở thích: Nhiếp ảnh
      </h1>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">Đang tải ảnh...</p>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">

          {images.map((img) => (
            <div
              key={img._id}
              className="break-inside-avoid overflow-hidden rounded shadow hover:shadow-md transition"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-auto object-cover rounded"
              />
              {/* Hiện title nếu có */}
              {/* {img.title && (
                <p className="text-sm text-gray-700 text-center mt-1 px-2 pb-2">
                  {img.title}
                </p>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
