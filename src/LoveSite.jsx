import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">{children}</div>
);

const Button = ({ children, onClick }) => (
  <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full" onClick={onClick}>
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
  const [revealedPhotos, setRevealedPhotos] = useState({});

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

  const revealPhoto = (index) => {
    setRevealedPhotos((prev) => ({ ...prev, [index]: true }));
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100 p-6">
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-center">Введи пароль</h2>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль..." />
          <Button onClick={handleAccess} className="mt-4">Войти</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-orange-200 to-red-300 text-gray-800 p-6 flex flex-col items-center text-center">
      {/* Музыкальный плеер */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full shadow-xl border border-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <button
          onClick={toggleMusic}
          className="flex items-center gap-3 text-white px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition shadow-lg"
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

      {/* Галерея фото с текстом и плавными анимациями */}
      <motion.div className="mt-10 flex flex-col gap-10 items-center w-full max-w-lg">
        {["Наш первый совместный день", "/photo1.jpg", "Наша первая поездка", "/photo2.jpg", "Особенный момент", "/photo3.jpg", "Любимый вечер", "/photo4.jpg", "Навсегда вместе", "/our-photo.jpg"].map((item, index) =>
          item.startsWith("/") ? (
            <motion.div
              key={index}
              className="rounded-xl shadow-lg w-72 h-72 object-cover mx-auto flex items-center justify-center cursor-pointer"
              style={{ background: revealedPhotos[index] ? "none" : "rgba(0,0,0,0.5)", filter: revealedPhotos[index] ? "none" : "blur(10px)" }}
              onClick={() => revealPhoto(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              {revealedPhotos[index] ? (
                <img src={item} alt={`Фото ${index + 1}`} className="rounded-xl w-72 h-72 object-cover" />
              ) : (
                <span className="text-white text-lg">Нажми, чтобы раскрыть</span>
              )}
            </motion.div>
          ) : (
            <motion.h2 key={index} className="text-2xl font-semibold text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>{item}</motion.h2>
          )
        )}
      </motion.div>

      {/* Видео */}
      <motion.div className="mt-10 flex justify-center w-full max-w-lg">
        <video controls className="rounded-xl shadow-xl w-full">
          <source src="/video.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </motion.div>
    </div>
  );
}
