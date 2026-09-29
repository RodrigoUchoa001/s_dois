import { motion } from "motion/react";
import { Music2 } from "lucide-react";

interface MusicIntroProps {
  onEnter: () => void;
}

export function MusicIntro({ onEnter }: MusicIntroProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-[#111111] text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <Music2 size={28} className="mb-6 mx-auto text-white/60" />
        </motion.div>

        <motion.h1
          className="text-3xl font-semibold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
        >
          Uma música para nós dois
        </motion.h1>

        <motion.p
          className="mt-3 text-sm text-white/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
        >
          Coloque os fones e entre na nossa história.
        </motion.p>

        <motion.button
          type="button"
          onClick={onEnter}
          className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:scale-105"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Entrar
        </motion.button>
      </div>
    </motion.div>
  );
}