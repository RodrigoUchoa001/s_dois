
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
            "Começamos na primavera e, desde então, já vimos muitas estações passarem juntos.",
        accent: "#B779C9",
    },
    summer: {
        name: "VERÃO",
        shortName: "verão",
        description:
            "Começamos no verão e, desde então, já vimos muitas estações passarem juntos.",
        accent: "#D17A35",
    },
    autumn: {
        name: "OUTONO",
        shortName: "outono",
        description:
            "Começamos no outono e, desde então, já vimos muitas estações passarem juntos.",
        accent: "#B9633F",
    },
    winter: {
        name: "INVERNO",
        shortName: "inverno",
        description:
            "Começamos no inverno e, desde então, já vimos muitas estações passarem juntos.",
        accent: "#628BBE",
    },
};

const skyBackgrounds: Record<Season, string> = {
    spring:
        "linear-gradient(180deg, #F5E8F7 0%, #F8EEF3 48%, #DCECDF 100%)",
    summer:
        "linear-gradient(180deg, #A9DDF5 0%, #D5EDFA 48%, #FBE0B2 100%)",
    autumn:
        "linear-gradient(180deg, #F4D7BB 0%, #F6E1CB 48%, #EAC5A5 100%)",
    winter:
        "linear-gradient(180deg, #D5E7F8 0%, #EAF2FA 52%, #D1E0F0 100%)",
};

const textColors: Record<Season, string> = {
    spring: "#493650",
    summer: "#49372C",
    autumn: "#50372D",
    winter: "#2D4059",
};

export function SeasonStory() {
    const season = getSeason(
        couple.startDay,
        couple.startMonth,
    );

    const data = seasons[season];
    const textColor = textColors[season];

    const seasonsTogether = getSeasonsTogether(
        couple.startDay,
        couple.startMonth,
        couple.startYear,
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex h-full w-full flex-col overflow-hidden"
            style={{
                background: skyBackgrounds[season],
                color: textColor,
            }}
        >
            {/* =====================================================
                CÉU E ILUMINAÇÃO
            ====================================================== */}

            {/* Luzes sazonais com gradientes estáticos */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(
                            ellipse at 0% 0%,
                            ${data.accent}20,
                            transparent 42%
                        ),
                        radial-gradient(
                            ellipse at 70% 100%,
                            ${data.accent}16,
                            transparent 45%
                        )
                    `,
                }}
            />

            {/* Brilhos decorativos estáticos */}
            <div className="pointer-events-none absolute right-[12%] top-[12%] text-[#D9D7FF]/70">
                <Sparkles size={16} />
            </div>

            <div className="pointer-events-none absolute left-[12%] top-[27%] text-[#D9D7FF]/70">
                <Sparkles size={13} />
            </div>

            <SideRibbon text={data.name} />

            {/* =====================================================
                CONTEÚDO
            ====================================================== */}

            <div className="relative z-10 flex h-full min-h-0 flex-col px-7 pb-7 pr-14 pt-8">
                <StoryHeader text="A nossa estação" />

                {/* Título e contador */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    className="relative z-20 mt-7 shrink-0"
                >
                    <p className="text-sm font-medium text-[#493650]/60">
                        E era
                    </p>

                    <motion.h1
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18, duration: 0.35 }}
                        className="mt-2 text-[clamp(2.8rem,12vw,4rem)] font-black leading-[0.85] tracking-[-0.07em]"
                        style={{
                            color: data.accent,
                            textShadow: `0 0 20px ${data.accent}18`,
                        }}
                    >
                        {data.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.28, duration: 0.35 }}
                        className="mt-4 flex items-center gap-2.5"
                    >
                        <div
                            className="h-[3px] w-8 shrink-0 rounded-full"
                            style={{ backgroundColor: data.accent }}
                        />

                        <p
                            className="text-xs font-black uppercase tracking-[0.1em] sm:text-sm"
                            style={{ color: data.accent }}
                        >
                            {seasonsTogether}{" "}
                            {seasonsTogether === 1
                                ? "estação juntos"
                                : "estações juntos"}
                        </p>
                    </motion.div>
                </motion.div>

                {/* =================================================
                    PAISAGEM NATURAL
                ================================================= */}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.25,
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    className="relative z-0 min-h-0 flex-1"
                >
                    <div className="absolute inset-x-[-12px] bottom-[-1%] top-[-2%]">
                        <SeasonIllustration season={season} />
                    </div>
                </motion.div>

                {/* =================================================
                    MENSAGEM
                ================================================= */}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="relative z-20 mt-2 shrink-0"
                >
                    <div
                        className="relative rounded-[25px] border bg-[#111831]/95 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                        style={{
                            borderColor: `${data.accent}35`,
                        }}
                    >
                        {/* Pequeno detalhe de luz */}
                        <div
                            className="absolute left-5 top-0 h-px w-12 -translate-y-px"
                            style={{
                                backgroundColor: data.accent,
                            }}
                        />

                        <Heart
                            size={17}
                            fill={data.accent}
                            strokeWidth={1.5}
                            className="absolute -right-1.5 -top-2 rotate-12"
                            style={{ color: data.accent }}
                        />

                        <p className="text-[13px] font-medium leading-relaxed text-[#D5DCFF]/75">
                            {data.description}
                        </p>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-2 opacity-50">
                        <span
                            className="h-px w-5"
                            style={{ backgroundColor: data.accent }}
                        />

                        <Sparkles
                            size={11}
                            style={{ color: data.accent }}
                        />

                        <span
                            className="h-px w-5"
                            style={{ backgroundColor: data.accent }}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ================================================================
   IDENTIFICAÇÃO DA ESTAÇÃO
   Datas aproximadas das estações no hemisfério sul.
================================================================ */

function getSeason(day: number, month: number): Season {
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
   CONTAGEM DE ESTAÇÕES
   A sequência no hemisfério sul é:
   verão → outono → inverno → primavera.
================================================================ */

function getSeasonsTogether(
    startDay: number,
    startMonth: number,
    startYear: number,
) {
    const now = new Date();

    const startSeason = getSeason(startDay, startMonth);

    const currentSeason = getSeason(
        now.getDate(),
        now.getMonth() + 1,
    );

    const seasonOrder: Record<Season, number> = {
        summer: 0,
        autumn: 1,
        winter: 2,
        spring: 3,
    };

    const startIndex =
        startYear * 4 + seasonOrder[startSeason];

    const currentIndex =
        now.getFullYear() * 4 + seasonOrder[currentSeason];

    return Math.max(1, currentIndex - startIndex + 1);
}
