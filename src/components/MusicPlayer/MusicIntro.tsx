
import { Headphones, Music2 } from "lucide-react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

interface MusicIntroProps {
    onEnter: () => void;
    isEnded: boolean;
}

export function MusicIntro({ onEnter, isEnded }: MusicIntroProps) {
    const colors = {
        background: "#0b0b2b",
        text: "#fff3c7",
        accent: "#a875ff",
        secondary: "#8064ff",
    };

    return createPortal(
        <motion.div
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            {/* Fundo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(
                            ellipse at 15% 15%,
                            rgba(128, 100, 255, 0.18),
                            transparent 48%
                        ),
                        radial-gradient(
                            ellipse at 85% 85%,
                            rgba(168, 117, 255, 0.14),
                            transparent 45%
                        ),
                        #0b0b2b
                    `,
                }}
            />

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
                    <div
                        className="absolute inset-[-10px] rounded-[34px]"
                        style={{
                            backgroundColor: "rgba(168, 117, 255, 0.2)",
                        }}
                    />

                    <div
                        className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border-2 bg-white/[0.02]"
                        style={{
                            borderColor: `${colors.accent}66`,
                            boxShadow: "0 8px 30px rgba(168, 117, 255, 0.08)",
                        }}
                    >
                        <div
                            className="absolute inset-3 rounded-[22px]"
                            style={{
                                backgroundColor: `${colors.accent}12`,
                            }}
                        />

                        <Music2
                            size={38}
                            strokeWidth={1.8}
                            className="relative"
                            style={{ color: colors.accent }}
                        />
                    </div>
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
                    <div
                        className="h-[2px] w-6"
                        style={{ backgroundColor: colors.accent }}
                    />

                    <span
                        className="text-[10px] font-black uppercase tracking-[0.2em]"
                        style={{ color: colors.accent }}
                    >
                        {isEnded ? "uma lembrança musical" : "nossa música"}
                    </span>

                    <div
                        className="h-[2px] w-6"
                        style={{ backgroundColor: colors.accent }}
                    />
                </motion.div>

                {/* Título */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.55,
                    }}
                    className="mt-4 max-w-sm text-[clamp(2.1rem,10vw,3.2rem)] font-black leading-[0.95] tracking-[-0.05em]"
                    style={{ color: colors.text }}
                >
                    {isEnded
                        ? "Uma música que ficou"
                        : "Uma música para nós dois"}
                </motion.h1>

                {/* Descrição */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.7,
                    }}
                    className="mt-5 max-w-xs text-sm font-medium leading-relaxed"
                    style={{
                        color: `${colors.text}88`,
                    }}
                >
                    {isEnded
                        ? "Algumas músicas continuam carregando lembranças, mesmo quando os momentos já passaram."
                        : "Coloque os fones e entre na nossa história."}
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
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.03 }}
                    className="group relative mt-9 flex items-center gap-3 overflow-hidden rounded-full border px-7 py-3.5 text-sm font-black transition-colors"
                    style={{
                        borderColor: `${colors.accent}55`,
                        backgroundColor: colors.secondary,
                        color: colors.text,
                        boxShadow: "0 10px 35px rgba(168, 117, 255, 0.3)",
                    }}
                >
                    <Headphones
                        size={18}
                        className="relative"
                    />

                    <span className="relative">
                        {isEnded ? "Ouvir música" : "Entrar na nossa história"}
                    </span>
                </motion.button>
            </div>
        </motion.div>,
        document.body
    );
}
