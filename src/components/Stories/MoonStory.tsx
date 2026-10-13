
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { couple } from "../../data/couple";
import { getMoonPhase, getMoonPhaseName } from "../../utils/date";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";

export function MoonStory() {
    const moon = getMoonPhase(
        couple.startDay,
        couple.startMonth,
        couple.startYear
    );

    const phaseName = getMoonPhaseName(moon.phase);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex h-full w-full flex-col overflow-hidden bg-[#080D24] px-7 pb-8 pr-14 pt-8 text-[#F1F2FF]"
        >
            {/* Céu noturno */}
            <Stars />

            <motion.div
                className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#8064ff]/15 blur-3xl"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="pointer-events-none absolute -left-28 bottom-10 h-64 w-64 rounded-full bg-[#5147C9]/15 blur-[90px]"
                animate={{
                    opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Paisagem ao fundo */}
            <MountainLandscape />

            {/* Faixa lateral */}
            <SideRibbon
                text="Nossa lua"
                bg_color="bg-[#8B9DFF]/15"
            />

            {/* Conteúdo principal */}
            <div className="relative z-10 flex h-full flex-col pr-6">
                {/* Header */}
                <StoryHeader text="Naquela noite" />

                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <h1 className="mt-5 max-w-[330px] text-4xl font-black uppercase leading-[0.9] tracking-tight">
                        A lua estava
                        <span className="block text-[#A99EFF]">
                            assim.
                        </span>
                    </h1>
                </motion.div>

                {/* Lua */}
                <div className="relative flex flex-1 items-center justify-center">
                    {/* Halo astronômico */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#8B7CFF]/[0.07] blur-3xl"
                    />

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.6,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 80,
                        }}
                        className="relative z-10"
                    >
                        {/* Órbita decorativa */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 80,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="pointer-events-none absolute -inset-5 rounded-full border border-[#A99EFF]/10"
                        >
                            <span className="absolute left-[18%] top-[9%] h-1.5 w-1.5 rounded-full bg-[#79F0E2]/80 shadow-[0_0_9px_#79F0E2]" />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotate: [0, 10, 0],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -left-5 top-8 text-[#A99EFF]"
                        >
                            <Sparkles size={22} />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotate: [0, -10, 0],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -right-4 bottom-12 text-[#F1F2FF]"
                        >
                            <Sparkles size={16} />
                        </motion.div>

                        <Moon phase={moon.phase} />
                    </motion.div>
                </div>

                {/* Informações */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.6,
                        duration: 0.5,
                    }}
                    className="relative z-20"
                >
                    {/* Card da fase */}
                    <div className="rounded-3xl border border-[#A6A8FF]/20 bg-[#101631]/95 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                        <div className="flex items-end justify-between gap-3">
                            <div className="min-w-0">
                                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#A99EFF]">
                                    Fase da lua
                                </p>

                                <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-[#F1F2FF]">
                                    {phaseName}
                                </h2>
                            </div>

                            <div className="shrink-0 rounded-2xl border border-[#B9B5FF]/30 bg-[#766BFF]/20 px-3 py-2 text-center">
                                <span className="block text-xl font-black leading-none text-[#F1F2FF]">
                                    {Math.round(
                                        moon.illumination * 100
                                    )}
                                    %
                                </span>

                                <span className="text-[8px] font-black uppercase tracking-wider text-[#C5C9FF]">
                                    iluminada
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-medium text-[#C3C8EA]/65">
                            <span>Vista do hemisfério sul</span>

                            <span className="text-[#A99EFF]">✦</span>

                            <span>
                                {String(couple.startDay).padStart(2, "0")}/
                                {String(couple.startMonth).padStart(2, "0")}/
                                {couple.startYear}
                            </span>
                        </div>
                    </div>

                    {/* Fases */}
                    <MoonPhases currentPhase={moon.phase} />
                </motion.div>
            </div>
        </motion.div>
    );
}

/* =========================================================
   PAISAGEM: MONTANHAS E TELESCÓPIO
   ========================================================= */

function MountainLandscape() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
            {/* Brilho distante no horizonte */}
            <div className="absolute -bottom-2 left-[10%] h-40 w-[80%] rounded-full bg-[#6255CB]/10 blur-[65px]" />

            {/* Estrelas próximas às montanhas */}
            <div className="absolute bottom-[30%] left-[12%] h-1 w-1 rounded-full bg-[#C5C9FF]/70 shadow-[0_0_7px_#A99EFF]" />
            <div className="absolute bottom-[26%] right-[13%] h-1 w-1 rounded-full bg-[#79F0E2]/60 shadow-[0_0_7px_#79F0E2]" />

            {/* Montanhas distantes */}
            <svg
                viewBox="0 0 400 230"
                preserveAspectRatio="none"
                className="absolute bottom-[16%] left-0 h-[28%] w-full opacity-65"
            >
                <defs>
                    <linearGradient
                        id="distantMountain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#30386B" />
                        <stop offset="100%" stopColor="#151C3B" />
                    </linearGradient>
                </defs>

                <path
                    d="M0 150 L38 112 L67 132 L111 65 L145 115 L181 91 L220 136 L264 72 L302 119 L339 89 L400 140 L400 230 L0 230 Z"
                    fill="url(#distantMountain)"
                />

                <path
                    d="M80 99 L111 65 L133 97 L118 89 L109 94 L101 85 Z"
                    fill="#9295D5"
                    opacity="0.13"
                />

                <path
                    d="M237 105 L264 72 L286 101 L271 91 L261 96 L254 87 Z"
                    fill="#A99EFF"
                    opacity="0.12"
                />
            </svg>

            {/* Montanhas intermediárias */}
            <svg
                viewBox="0 0 400 200"
                preserveAspectRatio="none"
                className="absolute bottom-[10%] left-0 h-[23%] w-full"
            >
                <defs>
                    <linearGradient
                        id="middleMountain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#20294E" />
                        <stop offset="100%" stopColor="#111831" />
                    </linearGradient>
                </defs>

                <path
                    d="M0 112 L40 78 L77 95 L123 40 L160 85 L201 59 L244 103 L290 48 L329 89 L367 61 L400 83 L400 200 L0 200 Z"
                    fill="url(#middleMountain)"
                />

                <path
                    d="M99 66 L123 40 L143 65"
                    fill="none"
                    stroke="#8188C7"
                    strokeWidth="1"
                    opacity="0.2"
                />

                <path
                    d="M269 72 L290 48 L310 70"
                    fill="none"
                    stroke="#A99EFF"
                    strokeWidth="1"
                    opacity="0.18"
                />
            </svg>

            {/* Montanha em primeiro plano */}
            <svg
                viewBox="0 0 400 150"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 h-[17%] w-full"
            >
                <defs>
                    <linearGradient
                        id="foregroundMountain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#151C39" />
                        <stop offset="100%" stopColor="#080D20" />
                    </linearGradient>
                </defs>

                <path
                    d="M0 77 L45 52 L86 76 L129 39 L173 71 L212 57 L260 82 L306 43 L353 72 L400 48 L400 150 L0 150 Z"
                    fill="url(#foregroundMountain)"
                />

                <path
                    d="M0 77 L45 52 L86 76 M129 39 L173 71 M306 43 L353 72 L400 48"
                    fill="none"
                    stroke="#7079B4"
                    strokeWidth="1.2"
                    opacity="0.16"
                />
            </svg>

            {/* Pequeno brilho no céu */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[29%] left-[39%] text-[#A99EFF]/70"
            >
                <Sparkles size={12} />
            </motion.div>
        </div>
    );
}

/* =========================================================
   LUA PRINCIPAL
   ========================================================= */

function Moon({ phase }: { phase: number }) {
    /*
     * phase:
     * 0.00 = Lua nova
     * 0.25 = quarto crescente
     * 0.50 = Lua cheia
     * 0.75 = quarto minguante
     */

    const illumination =
        (1 - Math.cos(phase * Math.PI * 2)) / 2;

    const shadowOffset = 112 - illumination * 224;

    return (
        <div className="relative h-56 w-56 sm:h-64 sm:w-64">
            {/* Glow externo */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-[-30px] rounded-full bg-[#B9B5FF]/10 blur-3xl"
            />

            <svg
                viewBox="0 0 256 256"
                className="relative h-full w-full drop-shadow-[0_0_25px_rgba(185,181,255,0.22)]"
            >
                <defs>
                    <radialGradient
                        id="moonGradient"
                        cx="35%"
                        cy="30%"
                    >
                        <stop offset="0%" stopColor="#FFFDF5" />
                        <stop offset="60%" stopColor="#F3EAD0" />
                        <stop offset="100%" stopColor="#D8D0B8" />
                    </radialGradient>

                    <clipPath id="moonClip">
                        <circle cx="128" cy="128" r="112" />
                    </clipPath>
                </defs>

                {/* Corpo da Lua */}
                <circle
                    cx="128"
                    cy="128"
                    r="112"
                    fill="url(#moonGradient)"
                />

                {/* Crateras e detalhes */}
                <g clipPath="url(#moonClip)">
                    <circle
                        cx="85"
                        cy="80"
                        r="23"
                        fill="#C6BFA8"
                        opacity="0.45"
                    />

                    <circle
                        cx="78"
                        cy="75"
                        r="15"
                        fill="#E3DAC0"
                        opacity="0.6"
                    />

                    <circle
                        cx="160"
                        cy="70"
                        r="15"
                        fill="#D0C7AD"
                        opacity="0.5"
                    />

                    <circle
                        cx="176"
                        cy="145"
                        r="31"
                        fill="#C6BFA8"
                        opacity="0.45"
                    />

                    <circle
                        cx="168"
                        cy="138"
                        r="20"
                        fill="#E5DCC2"
                        opacity="0.4"
                    />

                    <circle
                        cx="91"
                        cy="161"
                        r="17"
                        fill="#C6BFA8"
                        opacity="0.45"
                    />

                    <circle
                        cx="135"
                        cy="190"
                        r="13"
                        fill="#C6BFA8"
                        opacity="0.5"
                    />

                    <circle
                        cx="119"
                        cy="119"
                        r="8"
                        fill="#C6BFA8"
                        opacity="0.35"
                    />

                    {/* Sombra da fase */}
                    {phase > 0.02 && phase < 0.98 && (
                        <ellipse
                            cx={128 + shadowOffset}
                            cy="128"
                            rx="112"
                            ry="112"
                            fill="#10152C"
                            opacity="0.96"
                        />
                    )}
                </g>

                {/* Contorno delicado */}
                <circle
                    cx="128"
                    cy="128"
                    r="112"
                    fill="none"
                    stroke="#FFF9E8"
                    strokeWidth="1"
                    opacity="0.5"
                />
            </svg>
        </div>
    );
}

/* =========================================================
   MINIATURAS DAS FASES
   ========================================================= */

function MoonPhases({
    currentPhase,
}: {
    currentPhase: number;
}) {
    const phases = [
        0,
        0.125,
        0.25,
        0.375,
        0.5,
        0.625,
        0.75,
        0.875,
    ];

    return (
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#A6A8FF]/15 bg-[#101631]/95 px-2 py-2.5 backdrop-blur-xl">
            {phases.map((phase, index) => {
                const distance = Math.abs(phase - currentPhase);
                const circularDistance = Math.min(
                    distance,
                    1 - distance
                );

                const isCurrent = circularDistance < 0.0625;

                return (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.75 + index * 0.05,
                        }}
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                            isCurrent
                                ? "bg-[#766BFF]/30 ring-1 ring-[#A99EFF]/70 shadow-[0_0_12px_rgba(139,124,255,0.22)]"
                                : ""
                        }`}
                    >
                        <MiniMoon phase={phase} />
                    </motion.div>
                );
            })}
        </div>
    );
}

function MiniMoon({
    phase,
}: {
    phase: number;
}) {
    const illumination =
        (1 - Math.cos(phase * Math.PI * 2)) / 2;

    const isFull =
        phase >= 0.47 && phase <= 0.53;

    if (isFull) {
        return (
            <div className="h-5 w-5 rounded-full bg-[#F3EAD0] shadow-[0_0_8px_rgba(243,234,208,0.35)]" />
        );
    }

    if (phase < 0.03 || phase > 0.97) {
        return (
            <div className="h-5 w-5 rounded-full border border-[#7C83B0]/30 bg-[#252A46]" />
        );
    }

    return (
        <div className="relative h-5 w-5 overflow-hidden rounded-full bg-[#252A46]">
            <div
                className="absolute inset-y-0 bg-[#F3EAD0]"
                style={{
                    width: `${illumination * 100}%`,
                    left: phase < 0.5 ? 0 : undefined,
                    right: phase >= 0.5 ? 0 : undefined,
                }}
            />
        </div>
    );
}

/* =========================================================
   ESTRELAS
   ========================================================= */

function Stars() {
    const stars = [
        { left: "8%", top: "18%", size: 3 },
        { left: "88%", top: "22%", size: 4 },
        { left: "15%", top: "58%", size: 2 },
        { left: "92%", top: "53%", size: 5 },
        { left: "80%", top: "75%", size: 3 },
        { left: "6%", top: "82%", size: 2 },
        { left: "58%", top: "12%", size: 2 },
        { left: "47%", top: "37%", size: 2 },
        { left: "72%", top: "43%", size: 2 },
        { left: "33%", top: "25%", size: 2 },
        { left: "67%", top: "65%", size: 3 },
    ];

    return (
        <div className="pointer-events-none absolute inset-0 z-0">
            {stars.map((star, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0.2,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                        duration: 2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-[#C5C9FF]"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        boxShadow: `0 0 ${star.size * 2}px rgba(169,158,255,0.35)`,
                    }}
                />
            ))}
        </div>
    );
}
