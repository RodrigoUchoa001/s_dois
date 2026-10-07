import { Heart, Headphones, Music2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

interface MusicIntroProps {
    onEnter: () => void;
}

export function MusicIntro({ onEnter }: MusicIntroProps) {
    return createPortal(
        <motion.div
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            {/* Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.22, scale: 1 }}
                transition={{ duration: 1.4 }}
                className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#8064ff] blur-[130px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.16, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.15 }}
                className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#a875ff] blur-[130px]"
            />

            {/* Estrelas */}
            <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{
                    delay: 0.8,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute left-[12%] top-[18%]"
            >
                <Sparkles
                    size={20}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 1,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute right-[15%] top-[22%]"
            >
                <Sparkles
                    size={12}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pointer-events-none absolute bottom-[20%] left-[17%]"
            >
                <Sparkles
                    size={11}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotate: 20, scale: 0 }}
                animate={{ opacity: 1, rotate: -12, scale: 1 }}
                transition={{
                    delay: 0.9,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute bottom-[17%] right-[12%]"
            >
                <Heart
                    size={18}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            {/* Conteúdo */}
            <div className="relative z-10 flex w-full max-w-md flex-col items-center px-7 text-center">
                {/* Ícone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                    }}
                    className="relative"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.25, 0.45, 0.25],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-[-18px] rounded-[34px] bg-[#a875ff] blur-2xl"
                    />

                    <motion.div
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative flex h-24 w-24 rotate-3 items-center justify-center rounded-[30px] border-2 border-[#a875ff]/40 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md"
                    >
                        <div className="absolute inset-3 rounded-[22px] bg-[#a875ff]/10" />

                        <Music2
                            size={38}
                            strokeWidth={2}
                            className="relative text-[#a875ff]"
                        />
                    </motion.div>
                </motion.div>

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.45,
                    }}
                    className="mt-9 flex items-center gap-2"
                >
                    <div className="h-[2px] w-6 bg-[#a875ff]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                        nossa música
                    </span>

                    <div className="h-[2px] w-6 bg-[#a875ff]" />
                </motion.div>

                {/* Título */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.55,
                    }}
                    className="mt-4 max-w-sm text-[clamp(2.1rem,10vw,3.2rem)] font-black leading-[0.95] tracking-[-0.05em] text-[#fff3c7]"
                >
                    Uma música para nós dois
                </motion.h1>

                {/* Descrição */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.7,
                    }}
                    className="mt-5 max-w-xs text-sm font-medium leading-relaxed text-[#fff3c7]/55"
                >
                    Coloque os fones e entre na nossa história.
                </motion.p>

                {/* Botão */}
                <motion.button
                    type="button"
                    onClick={onEnter}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.85,
                    }}
                    whileTap={{ scale: 0.94 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative mt-9 flex items-center gap-3 overflow-hidden rounded-full border-2 border-[#a875ff]/30 bg-[#a875ff] px-7 py-3.5 text-sm font-black text-[#fff3c7] shadow-[0_10px_35px_rgba(168,117,255,0.3)]"
                >
                    <motion.div
                        className="absolute inset-0 bg-[#fff3c7]/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                    />

                    <Headphones
                        size={18}
                        className="relative"
                    />

                    <span className="relative">
                        Entrar na nossa história
                    </span>
                </motion.button>
            </div>
        </motion.div>,
        document.body
    );
}