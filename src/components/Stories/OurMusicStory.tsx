import { motion } from "motion/react";
import { Heart, Music2, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";
import {
    getMusicPlayedTimes,
    useAnimatedNumber,
} from "../../utils/date";
import { OdometerCounter } from "../OdometerCounter/OdometerCounter";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";

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
            className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#17152F] via-[#542642] to-[#9B493F] text-[#FFF0D5]"
        >
            {/* =====================================================
                DECORAÇÃO DE FUNDO
            ====================================================== */}

            {/* Luz quente no horizonte superior */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-[#C6534D] blur-[110px]"
            />

            {/* Reflexo alaranjado na parte inferior */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.32, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF9A52] blur-[110px]"
            />

            {/* Luz dourada atrás da capa */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3 }}
                className="absolute right-[-80px] top-[25%] h-72 w-72 rounded-full bg-[#FFD99B] blur-[100px]"
            />

            {/* =====================================================
                SOL POENTE
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 24,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    delay: 0.4,
                    duration: 1.2,
                    ease: "easeOut",
                }}
                className="pointer-events-none absolute right-[-30px] top-[24%] z-0"
                aria-hidden="true"
            >
                <motion.div
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative h-44 w-44"
                >
                    {/* Halo luminoso */}
                    <div className="absolute inset-[-35px] rounded-full bg-[#FF9A52]/15 blur-[35px]" />

                    {/* Brilho externo */}
                    <div className="absolute inset-[-12px] rounded-full bg-[#FFB875]/10 blur-[18px]" />

                    {/* Disco solar */}
                    <div className="absolute inset-4 overflow-hidden rounded-full bg-gradient-to-b from-[#FFE3A6] via-[#FFAD62] to-[#F16D54] shadow-[0_0_45px_rgba(255,154,82,0.25)]">
                        {/* Textura luminosa */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-[#D94D55]/20" />

                        {/* Faixas sutis no sol */}
                        <div className="absolute bottom-[24%] left-0 h-[2px] w-full bg-[#D85D55]/20" />
                        <div className="absolute bottom-[34%] left-0 h-[2px] w-full bg-[#D85D55]/15" />
                        <div className="absolute bottom-[44%] left-0 h-[1px] w-full bg-[#FFF0D5]/20" />
                    </div>

                    {/* Raios discretos */}
                    <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 -translate-y-3 bg-[#FFD99B]/70" />
                    <div className="absolute right-3 top-5 h-px w-2 rotate-45 bg-[#FFD99B]/70" />
                    <div className="absolute left-3 top-5 h-px w-2 -rotate-45 bg-[#FFD99B]/70" />

                    {/* Pequeno brilho */}
                    <motion.div
                        animate={{
                            opacity: [0.35, 0.8, 0.35],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute right-0 top-12 h-2 w-2 rounded-full bg-[#FFE3A6] shadow-[0_0_12px_#FFD99B]"
                    />
                </motion.div>
            </motion.div>

            {/* =====================================================
                BRILHOS
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
                transition={{ delay: 0.8 }}
                className="absolute left-[12%] top-[14%] z-[1]"
            >
                <Sparkles
                    size={18}
                    fill="#FFD99B"
                    className="text-[#FFD99B]"
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
                transition={{ delay: 1 }}
                className="absolute right-[20%] top-[12%] z-[1]"
            >
                <Sparkles
                    size={11}
                    fill="#FF9A52"
                    className="text-[#FF9A52]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-[28%] left-[15%] z-[1]"
            >
                <Sparkles
                    size={12}
                    fill="#FFB875"
                    className="text-[#FFB875]"
                />
            </motion.div>

            {/* =====================================================
                FAIXA LATERAL
            ====================================================== */}

            <SideRibbon text="NOSSA MÚSICA" bg_color="bg-[#17152f]" />

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
                    <p className="max-w-xs text-base font-medium leading-relaxed text-[#FFF0D5]/80">
                        Entre o céu pintado pelo pôr do sol e o nosso{" "}
                        <span className="font-semibold text-[#FFD99B]">
                            primeiro beijo
                        </span>
                        , essa música encontrou seu lugar na nossa história.
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
                        {/* Brilho quente atrás da capa */}
                        <div className="absolute inset-2 rounded-[24px] bg-[#FF9A52]/30 blur-xl" />

                        {/* Moldura dourada */}
                        <div className="relative rounded-[24px] border-2 border-[#FFD99B]/30 bg-[#FFF0D5]/[0.06] p-2 backdrop-blur-sm">
                            <img
                                src={couple.song.cover}
                                alt={couple.song.title}
                                className="h-32 w-32 rounded-[18px] object-cover"
                            />

                            {/* Ícone musical */}
                            <div className="absolute -bottom-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#542642] bg-[#FF9A52]">
                                <Music2
                                    size={17}
                                    className="text-[#FFF0D5]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Informações da música */}
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
                            transition={{ delay: 0.65 }}
                            className="text-xl font-black leading-tight tracking-[-0.02em] text-[#FFF0D5]"
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
                            transition={{ delay: 0.8 }}
                            className="mt-1 text-sm font-medium text-[#FFF0D5]/65"
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
                            transition={{ delay: 0.95 }}
                            className="mt-4 flex items-center gap-2"
                        >
                            <div className="h-[2px] w-7 bg-[#FF9A52]" />

                            <span className="text-xs font-black uppercase tracking-[0.15em] text-[#FFD99B]">
                                nossa música
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* =================================================
                    CONTADOR DE REPRODUÇÕES
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
                    <div className="relative rounded-[28px] border-2 border-[#FFD99B]/20 bg-[#351D36]/60 p-5 shadow-[0_0_35px_rgba(255,154,82,0.08)] backdrop-blur-md">
                        <Heart
                            size={16}
                            fill="#FF9A52"
                            className="absolute -right-2 -top-2 rotate-12 text-[#FF9A52]"
                        />

                        <p className="text-sm font-medium leading-relaxed text-[#FFF0D5]/70">
                            Se tocasse no repeat desde o primeiro
                            dia, já teria tocado
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <OdometerCounter value={playedTimes} />

                            <span className="text-xl font-black uppercase tracking-[0.08em] text-[#FFD99B]">
                                vezes
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* =====================================================
                ELEMENTO MUSICAL DECORATIVO
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
                <div className="relative h-20 w-20 rounded-[24px] border-2 border-[#FF9A52]/40">
                    <div className="absolute inset-3 rounded-[16px] bg-[#FF9A52]/10" />

                    <Music2
                        size={30}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFD99B]"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}