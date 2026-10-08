import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { couple } from "../../../data/couple";
import { SideRibbon } from "../../SideRibbon/SideRibbon";
import { StoryHeader } from "../StoryHeader";
import { SeasonIllustration } from "./SeasonIlustration";

type Season = "spring" | "summer" | "autumn" | "winter";

type SeasonData = {
    name: string;
    shortName: string;
    description: string;
    accent: string;
};

const seasons: Record<Season, SeasonData> = {
    spring: {
        name: "PRIMAVERA",
        shortName: "primavera",
        description:
            "Vocês começaram na primavera e, desde então, já viram muitas estações passarem juntos.",
        accent: "#a875ff",
    },
    summer: {
        name: "VERÃO",
        shortName: "verão",
        description:
            "Vocês começaram no verão e, desde então, já viram muitas estações passarem juntos.",
        accent: "#ff9d5c",
    },
    autumn: {
        name: "OUTONO",
        shortName: "outono",
        description:
            "Vocês começaram no outono e, desde então, já viram muitas estações passarem juntos.",
        accent: "#d98255",
    },
    winter: {
        name: "INVERNO",
        shortName: "inverno",
        description:
            "Vocês começaram no inverno e, desde então, já viram muitas estações passarem juntos.",
        accent: "#7d8cff",
    },
};

export function SeasonStory() {
    const season = getSeason(
        couple.startDay,
        couple.startMonth
    );

    const data = seasons[season];

    const seasonsTogether = getSeasonsTogether(
        couple.startDay,
        couple.startMonth,
        couple.startYear
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
                    opacity: 0.2,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                className="absolute -left-32 -top-32 h-72 w-72 rounded-full blur-[100px]"
                style={{
                    backgroundColor: data.accent,
                }}
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
                className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-[110px]"
                style={{
                    backgroundColor: data.accent,
                }}
            />

            {/* Glow lateral */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.1,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.4,
                }}
                className="absolute -right-24 top-1/3 h-64 w-64 rounded-full blur-[100px]"
                style={{
                    backgroundColor: data.accent,
                }}
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
                className="absolute right-[25%] top-[12%]"
            >
                <Sparkles
                    size={11}
                    fill={data.accent}
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
                    fill={data.accent}
                    className="text-[#a875ff]"
                />
            </motion.div>

            {/* =====================================================
                FAIXA LATERAL
            ====================================================== */}

            <SideRibbon text={data.name} />

            {/* =====================================================
                CONTEÚDO PRINCIPAL
            ====================================================== */}

            <div className="relative z-10 flex h-full w-full flex-col px-7 pb-10 pr-14 pt-8">
                {/* Cabeçalho */}
                <StoryHeader text="A nossa estação" />

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
                    className="mt-10"
                >
                    <p className="max-w-xs text-base font-medium leading-relaxed text-[#fff3c7]/65">
                        Quando tudo começou, era{" "}
                    </p>
                </motion.div>

                {/* =================================================
                    ESTAÇÃO PRINCIPAL
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
                        <span
                            className="block text-[clamp(4rem,18vw,4rem)] font-black leading-[0.8] tracking-[-0.07em]"
                            style={{
                                color: data.accent,
                            }}
                        >
                            {data.name}
                        </span>
                    </motion.div>

                    {/* Linha + contador */}
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
                        <div
                            className="h-[3px] w-10"
                            style={{
                                backgroundColor: data.accent,
                            }}
                        />

                        <span
                            className="text-xl font-black uppercase tracking-[0.12em]"
                            style={{
                                color: data.accent,
                            }}
                        >
                            {seasonsTogether*-1} estações juntos
                        </span>
                    </motion.div>
                </motion.div>

                {/* =================================================
                    ILUSTRAÇÃO
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.65,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 80,
                        damping: 14,
                    }}
                    className="pointer-events-none absolute bottom-[22%] right-[9%] z-0"
                >
                    <motion.div
                        animate={{
                            rotate: [-2, 2, -2],
                            y: [0, -4, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative"
                    >
                        <SeasonIllustration season={season} />
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
                        <Heart
                            size={16}
                            fill={data.accent}
                            className="absolute -right-2 -top-2 rotate-12"
                            style={{
                                color: data.accent,
                            }}
                        />

                        <p className="text-sm font-medium leading-relaxed text-[#fff3c7]/65">
                            {data.description}
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
                <div
                    className="relative h-20 w-20 rotate-12 rounded-[24px] border-2"
                    style={{
                        borderColor: `${data.accent}66`,
                    }}
                >
                    <div
                        className="absolute inset-3 rounded-[16px]"
                        style={{
                            backgroundColor: `${data.accent}1A`,
                        }}
                    />

                    <Heart
                        size={30}
                        fill={data.accent}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            color: data.accent,
                        }}
                    />
                </div>
            </motion.div>

            {/* =====================================================
                PARTÍCULAS
            ====================================================== */}

            <SeasonParticles season={season} accent={data.accent} />
        </motion.div>
    );
}

/* ================================================================
   ESTAÇÃO
================================================================ */

function getSeason(
    day: number,
    month: number
): Season {
    // Verão
    if (month === 12 && day >= 21) return "summer";
    if (month >= 1 && month <= 2) return "summer";
    if (month === 3 && day < 20) return "summer";

    // Outono
    if (month === 3 && day >= 20) return "autumn";
    if (month >= 4 && month <= 5) return "autumn";
    if (month === 6 && day < 21) return "autumn";

    // Inverno
    if (month === 6 && day >= 21) return "winter";
    if (month >= 7 && month <= 8) return "winter";
    if (month === 9 && day < 23) return "winter";

    // Primavera
    if (month === 9 && day >= 23) return "spring";
    if (month >= 10 && month <= 11) return "spring";
    if (month === 12 && day < 21) return "spring";

    return "spring";
}

/* ================================================================
   ESTAÇÕES JUNTOS
================================================================ */

function getSeasonsTogether(
    startDay: number,
    startMonth: number,
    startYear: number
) {
    const now = new Date();

    const startSeason = getSeason(
        startDay,
        startMonth
    );

    const currentSeason = getSeason(
        now.getDate(),
        now.getMonth() + 1
    );

    const seasonOrder: Record<Season, number> = {
        spring: 0,
        summer: 1,
        autumn: 2,
        winter: 3,
    };

    const startIndex =
        startYear * 4 +
        seasonOrder[startSeason];

    const currentIndex =
        now.getFullYear() * 4 +
        seasonOrder[currentSeason];

    return currentIndex - startIndex + 1;
}

/* ================================================================
   PARTÍCULAS
================================================================ */

function SeasonParticles({
    season,
    accent,
}: {
    season: Season;
    accent: string;
}) {
    const particles = {
        spring: ["✿", "✦", "·"],
        summer: ["✦", "·", "✧"],
        autumn: ["✦", "·", "✧"],
        winter: ["✦", "·", "✧"],
    };

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles[season].map(
                (particle, index) => (
                    <motion.span
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: [
                                0,
                                0.5,
                                0,
                            ],
                            scale: [
                                0.8,
                                1,
                                0.8,
                            ],
                            y: [
                                10,
                                -10,
                                -30,
                            ],
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            delay: index * 0.8,
                        }}
                        className="absolute text-xl"
                        style={{
                            left: `${15 + index * 25}%`,
                            top: `${25 + index * 15}%`,
                            color: accent,
                        }}
                    >
                        {particle}
                    </motion.span>
                )
            )}
        </div>
    );
}