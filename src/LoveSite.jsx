import { useState } from "react";
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
  const audio = new Audio("/music.mp3");

  const handleAccess = () => {
    if (password === correctPassword) {
      setAccessGranted(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-200 p-6">
        <Card className="p-6 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Введи пароль</h2>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль..." />
          <Button onClick={handleAccess} className="mt-4">Войти</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-300 text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center my-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Наш День Всех Влюбленных ❤️
      </motion.h1>

      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-lg mb-4">Наша история, воспоминания и любовь в одном месте!</p>
        <motion.img
          src="/our-photo.jpg"
          alt="Наше фото"
          className="rounded-2xl shadow-xl w-64 h-64 object-cover"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      {/* Галерея фото */}
      <motion.div className="mt-10 grid grid-cols-2 gap-4">
        {["/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Фото ${index + 1}`}
            className="rounded-xl shadow-lg w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* Видео */}
      <motion.div className="mt-10 flex justify-center">
        <iframe
          className="rounded-xl shadow-xl w-full max-w-lg"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>

      {/* Музыка */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Button onClick={toggleMusic} className="flex items-center gap-2 bg-white text-red-500 px-4 py-2 rounded-full shadow-lg">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />} {isPlaying ? "Пауза" : "Включить музыку"}
        </Button>
      </motion.div>
    </div>
  );
}
