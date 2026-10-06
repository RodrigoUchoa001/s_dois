import { motion } from "motion/react";
import { couple } from "../../data/couple";
import { SeasonIllustration } from "./SeasonIlustration";

type Season = "spring" | "summer" | "autumn" | "winter";

type SeasonData = {
    name: string;
    shortName: string;
    description: string;
    background: string;
    accent: string;
};

const seasons: Record<Season, SeasonData> = {
    spring: {
        name: "PRIMAVERA",
        shortName: "primavera",
        description:
            "Vocês começaram na primavera e, desde então, já viram muitas estações passarem juntos.",
        background: "#e6f4e8",
        accent: "#7d5cff",
    },

    summer: {
        name: "VERÃO",
        shortName: "verão",
        description:
            "Vocês começaram no verão e, desde então, já viram muitas estações passarem juntos.",
        background: "#fff0c9",
        accent: "#ff7a3d",
    },

    autumn: {
        name: "OUTONO",
        shortName: "outono",
        description:
            "Vocês começaram no outono e, desde então, já viram muitas estações passarem juntos.",
        background: "#f4dfc5",
        accent: "#d46b32",
    },

    winter: {
        name: "INVERNO",
        shortName: "inverno",
        description:
            "Vocês começaram no inverno e, desde então, já viram muitas estações passarem juntos.",
        background: "#dce9ff",
        accent: "#7251e8",
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
            className="relative flex h-full w-full flex-col overflow-hidden px-6 pb-5 pt-16"
            style={{
                backgroundColor: data.background,
            }}
        >
            {/* Conteúdo */}
            <div className="relative z-10 flex h-full flex-col">

                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm font-bold tracking-[0.2em] text-[#0b1535]">
                        E ERA
                    </p>

                    <h1
                        className="mt-3 text-[4.5rem] font-black leading-[0.8] tracking-[-0.05em] text-[#0b1535]"
                    >
                        {data.name}
                    </h1>

                    <p className="mt-7 max-w-[350px] text-xl font-medium leading-tight text-[#0b1535]">
                        Vocês começaram no{" "}
                        <span className="font-bold">
                            {data.shortName}
                        </span>{" "}
                        e, desde então, já viram{" "}
                        <span className="font-bold">
                            {seasonsTogether} estações
                        </span>{" "}
                        passarem juntos.
                    </p>
                </motion.div>

                {/* Ilustração */}
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.7,
                        type: "spring",
                        stiffness: 80,
                    }}
                    className="flex flex-1 items-center justify-center"
                >
                    <SeasonIllustration season={season} />
                </motion.div>

                {/* Card inferior */}
                {/* <RelationshipCard /> */}
            </div>

            {/* Pequenas partículas */}
            <SeasonParticles season={season} />
        </motion.div>
    );
}

function getSeason(
    day: number,
    month: number
): Season {
    /*
     * Hemisfério Sul / Brasil
     */

    // Verão
    if (month === 12 && day >= 21) {
        return "summer";
    }

    if (month >= 1 && month <= 2) {
        return "summer";
    }

    if (month === 3 && day < 20) {
        return "summer";
    }

    // Outono
    if (month === 3 && day >= 20) {
        return "autumn";
    }

    if (month >= 4 && month <= 5) {
        return "autumn";
    }

    if (month === 6 && day < 21) {
        return "autumn";
    }

    // Inverno
    if (month === 6 && day >= 21) {
        return "winter";
    }

    if (month >= 7 && month <= 8) {
        return "winter";
    }

    if (month === 9 && day < 23) {
        return "winter";
    }

    // Primavera
    if (month === 9 && day >= 23) {
        return "spring";
    }

    if (month >= 10 && month <= 11) {
        return "spring";
    }

    if (month === 12 && day < 21) {
        return "spring";
    }

    return "spring";
}

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

    console.log(startSeason);

    const currentSeason = getSeason(
        now.getDate(),
        now.getMonth() + 1
    );

    console.log(currentSeason);

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

    return (currentIndex - startIndex + 1) * -1;
}

// function RelationshipCard() {
//     const zodiac = getZodiacSign(
//         couple.startDay,
//         couple.startMonth
//     );

//     return (
//         <motion.div
//             initial={{
//                 opacity: 0,
//                 y: 30,
//             }}
//             animate={{
//                 opacity: 1,
//                 y: 0,
//             }}
//             transition={{
//                 delay: 0.7,
//                 duration: 0.5,
//             }}
//             className="rounded-[2rem] bg-[#111111] p-7 text-white shadow-[10px_10px_0_rgba(20,30,50,0.25)]"
//         >
//             <p className="text-xs font-bold tracking-[0.2em] text-white/60">
//                 SIGNO DO RELACIONAMENTO
//             </p>

//             <h2 className="mt-4 text-5xl font-black text-[#a779ff]">
//                 {zodiac.name}
//             </h2>

//             <div className="mt-2 flex items-center gap-2">
//                 <span className="text-xl">
//                     {zodiac.symbol}
//                 </span>

//                 <span className="text-sm font-bold tracking-[0.15em]">
//                     {zodiac.element}
//                 </span>
//             </div>

//             <p className="mt-6 text-base font-semibold leading-relaxed text-white/80">
//                 {zodiac.description}
//             </p>
//         </motion.div>
//     );
// }

// function getZodiacSign(
//     day: number,
//     month: number
// ) {
//     if (
//         (month === 3 && day >= 21) ||
//         (month === 4 && day <= 19)
//     ) {
//         return {
//             name: "ÁRIES",
//             symbol: "♈",
//             element: "FOGO",
//             description:
//                 "Intensos e cheios de energia — sempre prontos para viver algo novo juntos.",
//         };
//     }

//     if (
//         (month === 4 && day >= 20) ||
//         (month === 5 && day <= 20)
//     ) {
//         return {
//             name: "TOURO",
//             symbol: "♉",
//             element: "TERRA",
//             description:
//                 "Presentes nos pequenos detalhes — especialmente nos que fazem o outro sorrir.",
//         };
//     }

//     if (
//         (month === 5 && day >= 21) ||
//         (month === 6 && day <= 20)
//     ) {
//         return {
//             name: "GÊMEOS",
//             symbol: "♊",
//             element: "AR",
//             description:
//                 "Uma história construída entre conversas, risadas e muitas descobertas.",
//         };
//     }

//     if (
//         (month === 6 && day >= 21) ||
//         (month === 7 && day <= 22)
//     ) {
//         return {
//             name: "CÂNCER",
//             symbol: "♋",
//             element: "ÁGUA",
//             description:
//                 "Um relacionamento cheio de carinho, cuidado e memórias especiais.",
//         };
//     }

//     if (
//         (month === 7 && day >= 23) ||
//         (month === 8 && day <= 22)
//     ) {
//         return {
//             name: "LEÃO",
//             symbol: "♌",
//             element: "FOGO",
//             description:
//                 "Uma história que gosta de ser vivida com intensidade e muito coração.",
//         };
//     }

//     if (
//         (month === 8 && day >= 23) ||
//         (month === 9 && day <= 22)
//     ) {
//         return {
//             name: "VIRGEM",
//             symbol: "♍",
//             element: "TERRA",
//             description:
//                 "Atentos aos detalhes — principalmente aos que fazem o outro sorrir.",
//         };
//     }

//     if (
//         (month === 9 && day >= 23) ||
//         (month === 10 && day <= 22)
//     ) {
//         return {
//             name: "LIBRA",
//             symbol: "♎",
//             element: "AR",
//             description:
//                 "Uma história construída lado a lado, buscando equilíbrio e parceria.",
//         };
//     }

//     if (
//         (month === 10 && day >= 23) ||
//         (month === 11 && day <= 21)
//     ) {
//         return {
//             name: "ESCORPIÃO",
//             symbol: "♏",
//             element: "ÁGUA",
//             description:
//                 "Intensos, profundos e completamente envolvidos nessa história.",
//         };
//     }

//     if (
//         (month === 11 && day >= 22) ||
//         (month === 12 && day <= 21)
//     ) {
//         return {
//             name: "SAGITÁRIO",
//             symbol: "♐",
//             element: "FOGO",
//             description:
//                 "Uma aventura compartilhada, cheia de histórias que ainda estão por vir.",
//         };
//     }

//     if (
//         (month === 12 && day >= 22) ||
//         (month === 1 && day <= 19)
//     ) {
//         return {
//             name: "CAPRICÓRNIO",
//             symbol: "♑",
//             element: "TERRA",
//             description:
//                 "Construindo algo sólido, um momento especial de cada vez.",
//         };
//     }

//     if (
//         (month === 1 && day >= 20) ||
//         (month === 2 && day <= 18)
//     ) {
//         return {
//             name: "AQUÁRIO",
//             symbol: "♒",
//             element: "AR",
//             description:
//                 "Uma história única, diferente de qualquer outra.",
//         };
//     }

//     return {
//         name: "PEIXES",
//         symbol: "♓",
//         element: "ÁGUA",
//         description:
//             "Uma história feita de sentimentos, carinho e momentos inesquecíveis.",
//     };
// }

function SeasonParticles({
    season,
}: {
    season: Season;
}) {
    const particles = {
        spring: ["🌸", "🌸", "✿"],
        summer: ["☀", "✦", "·"],
        autumn: ["🍂", "🍁", "·"],
        winter: ["❄", "❄", "✦"],
    };

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles[season].map(
                (particle, index) => (
                    <motion.span
                        key={index}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: [
                                0,
                                0.7,
                                0,
                            ],
                            y: [
                                0,
                                -20,
                                -40,
                            ],
                        }}
                        transition={{
                            duration:
                                3 + index,
                            repeat: Infinity,
                            delay: index * 0.8,
                        }}
                        className="absolute text-2xl text-[#0b1535]/30"
                        style={{
                            left: `${15 + index * 25}%`,
                            top: `${25 + index * 15}%`,
                        }}
                    >
                        {particle}
                    </motion.span>
                )
            )}
        </div>
    );
}

