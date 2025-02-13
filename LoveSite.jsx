import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";

export default function LoveSite() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "love2024";

  const handleAccess = () => {
    if (password === correctPassword) {
      setAccessGranted(true);
    }
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-200 p-6">
        <Card className="p-6 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Введи пароль</h2>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль..."
            className="mb-4"
          />
          <Button onClick={handleAccess}>Войти</Button>
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

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Button className="flex items-center gap-2 bg-white text-red-500 px-4 py-2 rounded-full shadow-lg">
          <Play size={20} /> Включить музыку
        </Button>
      </motion.div>
    </div>
  );
}
