import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";
import { getMonthName } from "../../utils/date";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";

export function MinutesTogetherStory({
    animatedMinutes,
}: {
    animatedMinutes: number;
}) {
    return (
        <motion.div
            key="minutes"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.5,
            }}
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
                    opacity: 0.2,
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

            {/* Estrelas */}
            <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute left-[12%] top-[14%]"
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
                className="absolute right-[25%] top-[12%]"
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
                className="absolute bottom-[25%] left-[15%]"
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

            <SideRibbon text="MINUTOS JUNTOS" />

            {/* =====================================================
                CONTEÚDO PRINCIPAL
            ====================================================== */}

            <div className="relative z-10 flex h-full w-full flex-col px-7 pb-10 pr-14 pt-8">
                {/* Pequeno cabeçalho */}
                <StoryHeader text="Nosso tempo" />

                {/* =================================================
                    TEXTO
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
                        delay: 0.3,
                        duration: 0.6,
                    }}
                    className="mt-12"
                >
                    <p className="max-w-xs text-base font-medium leading-relaxed text-[#fff3c7]/65">
                        Desde{" "}
                        <span className="font-bold text-[#fff3c7]">
                            {couple.startDay} de{" "}
                            {getMonthName(couple.startMonth + 1)} de{" "}
                            {couple.startYear}
                        </span>
                        , nós já dividimos
                    </p>
                </motion.div>

                {/* =================================================
                    NÚMERO PRINCIPAL
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
                    className="mt-5"
                >
                    <motion.div
                        animate={{
                            rotate: [-1, 1, -1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="origin-left"
                    >
                        <span className="block text-[clamp(4.5rem,19vw,4rem)] font-black leading-[0.8] tracking-[-0.07em] text-[#fff3c7]">
                            {animatedMinutes.toLocaleString("pt-BR")}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -15,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.9,
                        }}
                        className="mt-5 flex items-center gap-3"
                    >
                        <div className="h-[3px] w-10 bg-[#a875ff]" />

                        <span className="text-xl font-black uppercase tracking-[0.12em] text-[#a875ff]">
                            minutos juntos
                        </span>
                    </motion.div>
                </motion.div>

                {/* =================================================
                    MENSAGEM
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
                        delay: 1.1,
                        duration: 0.5,
                    }}
                    className="mt-auto"
                >
                    <div className="relative max-w-sm rounded-[28px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                        {/* coração decorativo */}
                        <Heart
                            size={16}
                            fill="#a875ff"
                            className="absolute -right-2 -top-2 rotate-12 text-[#a875ff]"
                        />

                        <p className="text-sm font-medium leading-relaxed text-[#fff3c7]/65">
                            {couple.wrapped.minutesTogether.message}
                        </p>
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
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    delay: 0.7,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute bottom-[13%] right-[13%] z-0"
            >
                <div className="relative h-20 w-20 rotate-12 rounded-[24px] border-2 border-[#a875ff]/40">
                    <div className="absolute inset-3 rounded-[16px] bg-[#a875ff]/10" />

                    <Heart
                        size={30}
                        fill="#a875ff"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#a875ff]"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}