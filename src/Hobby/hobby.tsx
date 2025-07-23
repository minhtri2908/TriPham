import { Link } from "react-router-dom";

export default function HobbyIndex() {
  const hobbies = [
    { title: "📸 Nhiếp ảnh", path: "/hobby/photo", color: "bg-pink-100" },
    { title: "🏃‍♂️ Thể thao", path: "/hobby/sport", color: "bg-blue-100" },
    { title: "🌍 Du lịch", path: "/hobby/travel", color: "bg-green-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">🎯 Sở thích cá nhân</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {hobbies.map((hobby) => (
          <Link
            to={hobby.path}
            key={hobby.path}
            className={`${hobby.color} rounded-lg p-6 shadow hover:shadow-md transition block text-center text-xl font-medium text-gray-700`}
          >
            {hobby.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
