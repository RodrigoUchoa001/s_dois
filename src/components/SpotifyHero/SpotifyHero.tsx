import {
    ChevronDown,
    EllipsisVertical,
    Heart,
    Music2,
    Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { couple } from "../../data/couple";
import { CoupleCounter } from "./CoupleCounter";
import { CoupleMessage } from "./CoupleMessage";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";
import { WrappedBox } from "./WrappedBox";

export function SpotifyHero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isliked, setIsLiked] = useState(false);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0b0b2b] px-5 py-8 text-[#fff3c7]">
            {/* ========================================
                FUNDO
            ======================================== */}

            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl"
                style={{
                    backgroundImage: `url(${couple.song.cover})`,
                }}
            />

            <div className="absolute inset-0 bg-[#0b0b2b]/80" />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#8064ff] blur-[120px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.2 }}
                className="absolute -bottom-40 right-[-80px] h-96 w-96 rounded-full bg-[#a875ff] blur-[120px]"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pointer-events-none absolute left-[10%] top-[15%]"
            >
                <Sparkles
                    size={18}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="pointer-events-none absolute right-[12%] top-[25%]"
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
                className="pointer-events-none absolute bottom-[15%] left-[8%]"
            >
                <Sparkles
                    size={11}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            {/* ========================================
                CONTEÚDO
            ======================================== */}

            <div className="relative z-10 mx-auto w-full max-w-md">
                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-7 flex items-center justify-between"
                >
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-white/[0.04] text-[#fff3c7]/70 backdrop-blur-sm transition hover:bg-white/[0.08] hover:text-[#fff3c7]"
                        aria-label="Voltar"
                    >
                        <ChevronDown size={21} />
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                            tocando agora
                        </span>

                        <span className="mt-1 text-sm font-bold text-[#fff3c7]/80">
                            Para o meu grande amor
                        </span>
                    </div>

                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-white/[0.04] text-[#fff3c7]/70 backdrop-blur-sm transition hover:bg-white/[0.08] hover:text-[#fff3c7]"
                        aria-label="Mais opções"
                    >
                        <EllipsisVertical size={19} />
                    </button>
                </motion.div>

                {/* ========================================
                    PLAYER
                ======================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.7,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                    }}
                    className="relative overflow-hidden rounded-[32px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
                >
                    {/* Glow da capa */}
                    <div className="absolute -inset-10 -z-10 bg-[#8064ff]/20 blur-3xl" />

                    {/* Capa */}
                    <motion.div
                        animate={
                            isPlaying
                                ? {
                                      rotate: [0, 1, -1, 0],
                                  }
                                : {
                                      rotate: 0,
                                  }
                        }
                        transition={{
                            duration: 6,
                            repeat: isPlaying ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                        className="relative overflow-hidden rounded-[24px]"
                    >
                        <img
                            src={couple.song.cover}
                            alt={`Capa da música ${couple.song.title}`}
                            className="aspect-square w-full object-cover"
                        />

                        {/* Gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b2b]/60 via-transparent to-transparent" />

                        {/* Badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#fff3c7]/10 bg-[#0b0b2b]/65 px-3 py-1.5 backdrop-blur-md">
                            <Music2
                                size={14}
                                className="text-[#a875ff]"
                            />

                            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fff3c7]/80">
                                nossa música
                            </span>
                        </div>
                    </motion.div>

                    {/* Informações */}
                    <div className="mt-5 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="truncate text-2xl font-black tracking-[-0.03em] text-[#fff3c7]">
                                {couple.song.title}
                            </h1>

                            <p className="mt-1 truncate text-sm font-medium text-[#fff3c7]/50">
                                {couple.song.artist}
                            </p>
                        </div>

                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.08 }}
                            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-white/[0.04]"
                            aria-label="Adicionar aos favoritos"
                            onClick={() =>
                                setIsLiked((previous) => !previous)
                            }
                        >
                            <Heart
                                size={19}
                                fill={
                                    isliked
                                        ? "#a875ff"
                                        : "transparent"
                                }
                                className={
                                    isliked
                                        ? "text-[#a875ff]"
                                        : "text-[#fff3c7]/60"
                                }
                            />
                        </motion.button>
                    </div>

                    {/* Linha decorativa */}
                    <div className="mt-5 flex items-center gap-2">
                        <div className="h-[2px] w-8 bg-[#a875ff]" />

                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#a875ff]">
                            uma música para nós
                        </span>
                    </div>

                    {/* Player original */}
                    <MusicPlayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </motion.div>

                {/* ========================================
                    SOBRE O CASAL
                ======================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative mt-6 overflow-hidden rounded-[32px] border-2 border-[#fff3c7]/10 bg-white/[0.04] backdrop-blur-md"
                >
                    {/* Imagem */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={couple.song.cover}
                            alt={`Capa da música ${couple.song.title}`}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b2b] via-[#0b0b2b]/20 to-transparent" />

                        <div className="absolute bottom-4 left-5">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="h-[2px] w-6 bg-[#a875ff]" />

                                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a875ff]">
                                    nossa história
                                </span>
                            </div>

                            <h2 className="text-2xl font-black tracking-[-0.03em] text-[#fff3c7]">
                                Sobre o casal
                            </h2>
                        </div>
                    </div>

                    <div className="p-1">
                        <CoupleCounter />
                    </div>
                </motion.div>

                {/* ========================================
                    MENSAGEM
                ======================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-5 overflow-hidden rounded-[32px] border-2 border-[#fff3c7]/10 bg-white/[0.04] backdrop-blur-md"
                >
                    <CoupleMessage />
                </motion.div>

                {/* ========================================
                    WRAPPED
                ======================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-5 overflow-hidden rounded-[32px] border-2 border-[#fff3c7]/10 bg-white/[0.04] backdrop-blur-md"
                >
                    <WrappedBox />
                </motion.div>

                {/* Espaço final */}
                <div className="h-8" />
            </div>

            {/* Elemento decorativo */}
            <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{
                    delay: 1,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute bottom-[8%] right-[5%] hidden sm:block"
            >
                <div className="relative h-20 w-20 rounded-[24px] border-2 border-[#a875ff]/30">
                    <div className="absolute inset-3 rounded-[16px] bg-[#a875ff]/10" />

                    <Heart
                        size={28}
                        fill="#a875ff"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#a875ff]"
                    />
                </div>
            </motion.div>
        </section>
    );
}