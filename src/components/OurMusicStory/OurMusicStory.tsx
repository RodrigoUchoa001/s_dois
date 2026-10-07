import { motion } from "motion/react";
import { Heart, Music2, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";
import {
    getMusicPlayedTimes,
    useAnimatedNumber,
} from "../../utils/date";
import { OdometerCounter } from "../OdometerCounter/OdometerCounter";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "../StoryHeader/StoryHeader";

export function OurMusicStory() {
    const playedTimes = useAnimatedNumber(
        getMusicPlayedTimes(),
        2000
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            {/* =====================================================
                DECORAÇÃO DE FUNDO
            ====================================================== */}

            {/* Glow superior esquerdo */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.22,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#8064ff] blur-[100px]"
            />

            {/* Glow inferior */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.15,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.2,
                }}
                className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#8064ff] blur-[110px]"
            />

            {/* Glow da capa */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.12,
                    scale: 1,
                }}
                transition={{
                    duration: 1.4,
                    delay: 0.3,
                }}
                className="absolute right-[-80px] top-[25%] h-72 w-72 rounded-full bg-[#a875ff] blur-[100px]"
            />

            {/* =====================================================
                ESTRELAS
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    rotate: -20,
                }}
                animate={{
                    opacity: 1,
                    rotate: 0,
                }}
                transition={{
                    delay: 0.8,
                }}
                className="absolute left-[12%] top-[14%]"
            >
                <Sparkles
                    size={18}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    delay: 1,
                }}
                className="absolute right-[20%] top-[12%]"
            >
                <Sparkles
                    size={11}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-[28%] left-[15%]"
            >
                <Sparkles
                    size={12}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            {/* =====================================================
                FAIXA LATERAL
            ====================================================== */}

            <SideRibbon text="NOSSA MÚSICA" />

            {/* =====================================================
                CONTEÚDO
            ====================================================== */}

            <div className="relative z-10 flex h-full w-full flex-col px-7 pb-10 pr-14 pt-8">
                <StoryHeader text="Uma música nossa" />

                {/* =================================================
                    INTRODUÇÃO
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6,
                    }}
                    className="mt-9"
                >
                    <p className="max-w-xs text-base font-medium leading-relaxed text-[#fff3c7]/65">
                        Se nossa história tivesse uma trilha sonora,
                        provavelmente seria essa.
                    </p>
                </motion.div>

                {/* =================================================
                    CAPA + MÚSICA
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.75,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.45,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 14,
                    }}
                    className="mt-6 flex items-center gap-5"
                >
                    {/* Moldura da capa */}
                    <motion.div
                        animate={{
                            rotate: [-2, 2, -2],
                            y: [0, -3, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative shrink-0"
                    >
                        {/* Glow atrás da capa */}
                        <div className="absolute inset-2 rounded-[24px] bg-[#a875ff]/25 blur-xl" />

                        <div className="relative rounded-[24px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-2 backdrop-blur-sm">
                            <img
                                src={couple.song.cover}
                                alt={couple.song.title}
                                className="h-32 w-32 rounded-[18px] object-cover"
                            />

                            {/* Ícone de música */}
                            <div className="absolute -bottom-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0b0b2b] bg-[#a875ff]">
                                <Music2
                                    size={17}
                                    className="text-[#fff3c7]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Informações */}
                    <div className="min-w-0">
                        <motion.h2
                            initial={{
                                opacity: 0,
                                x: 15,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.65,
                            }}
                            className="text-xl font-black leading-tight tracking-[-0.02em] text-[#fff3c7]"
                        >
                            {couple.song.title}
                        </motion.h2>

                        <motion.p
                            initial={{
                                opacity: 0,
                                x: 15,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.8,
                            }}
                            className="mt-1 text-sm font-medium text-[#fff3c7]/55"
                        >
                            {couple.song.artist}
                        </motion.p>

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 15,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.95,
                            }}
                            className="mt-4 flex items-center gap-2"
                        >
                            <div className="h-[2px] w-7 bg-[#a875ff]" />

                            <span className="text-xs font-black uppercase tracking-[0.15em] text-[#a875ff]">
                                nossa música
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* =================================================
                    CONTADOR
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1.05,
                        duration: 0.6,
                    }}
                    className="mt-auto"
                >
                    <div className="relative rounded-[28px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                        <Heart
                            size={16}
                            fill="#a875ff"
                            className="absolute -right-2 -top-2 rotate-12 text-[#a875ff]"
                        />

                        <p className="text-sm font-medium leading-relaxed text-[#fff3c7]/60">
                            Se tocasse no repeat desde o primeiro
                            dia, já teria tocado
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <OdometerCounter
                                value={playedTimes}
                            />

                            <span className="text-xl font-black uppercase tracking-[0.08em] text-[#a875ff]">
                                vezes
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* =====================================================
                ELEMENTO DECORATIVO GRANDE
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: -20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 12,
                }}
                transition={{
                    delay: 0.7,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute bottom-[15%] right-[8%] z-0"
            >
                <div className="relative h-20 w-20 rounded-[24px] border-2 border-[#a875ff]/40">
                    <div className="absolute inset-3 rounded-[16px] bg-[#a875ff]/10" />

                    <Music2
                        size={30}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#a875ff]"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}