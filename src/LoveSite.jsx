import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">{children}</div>
);

const Button = ({ children, onClick }) => (
  <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClick}>
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder }) => (
  <input
    type="password"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border p-2 rounded-md w-full"
  />
);

export default function LoveSite() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "love2024";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/music.mp3"));

  const handleAccess = () => {
    if (password === correctPassword) {
      setAccessGranted(true);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100 p-6">
        <Card className="p-6 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Введи пароль</h2>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль..." />
          <Button onClick={handleAccess} className="mt-4">Войти</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400 text-gray-800 p-6 flex flex-col items-center text-center">
      {/* Музыкальный плеер с красивым дизайном */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-3xl shadow-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 text-white px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />} {isPlaying ? "Пауза" : "Включить музыку"}
        </button>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold my-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Наш День Всех Влюбленных ❤️
      </motion.h1>

      {/* Галерея фото с текстом между ними */}
      <motion.div className="mt-10 flex flex-col gap-6 items-center">
        {["Наш первый совместный день", "/photo1.jpg", "Наша первая поездка", "/photo2.jpg", "Особенный момент", "/photo3.jpg", "Любимый вечер", "/photo4.jpg", "Навсегда вместе", "/our-photo.jpg"].map((item, index) =>
          item.startsWith("/") ? (
            <motion.img
              key={index}
              src={item}
              alt={`Фото ${index + 1}`}
              className="rounded-xl shadow-lg w-56 h-56 object-cover mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            />
          ) : (
            <motion.h2 key={index} className="text-2xl font-semibold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>{item}</motion.h2>
          )
        )}
      </motion.div>

      {/* Видео (загрузка собственного видео) */}
      <motion.div className="mt-10 flex justify-center">
        <video controls className="rounded-xl shadow-xl w-full max-w-lg">
          <source src="/video.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </motion.div>
    </div>
  );
}
