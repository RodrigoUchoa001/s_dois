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
            className="relative flex h-full w-full flex-col overflow-hidden bg-[#0b0b2b] px-7 pb-8 pr-14 pt-8 text-[#fff3c7]"
        >
            {/* Decoração */}
            <Stars />

            <motion.div
                className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#8064ff]/10 blur-3xl"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Faixa lateral */}
            <SideRibbon text="Nossa lua" />

            {/* Conteúdo */}
            <div className="relative z-10 flex h-full flex-col pr-6">
                {/* Header */}
                <StoryHeader text={"Naquela noite"} />

                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <h1 className="mt-5 max-w-[330px] text-4xl font-black uppercase leading-[0.9] tracking-tight">
                        A lua estava
                        <span className="block text-[#a875ff]">
                            assim.
                        </span>
                    </h1>
                </motion.div>

                {/* Lua */}
                <div className="flex flex-1 items-center justify-center">
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
                        className="relative"
                    >
                        {/* Estrelas decorativas próximas */}
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
                            className="absolute -left-5 top-8 text-[#a875ff]"
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
                            className="absolute -right-4 bottom-12 text-[#fff3c7]"
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
                >
                    {/* Card da fase */}
                    <div className="rounded-3xl border-2 border-[#fff3c7]/20 bg-[#151541] p-5 shadow-[6px_6px_0_#8064ff]">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                                    Fase da lua
                                </p>

                                <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#fff3c7]">
                                    {phaseName}
                                </h2>
                            </div>

                            <div className="shrink-0 rounded-2xl bg-[#8064ff] px-3 py-2 text-center shadow-[3px_3px_0_#5b45c7]">
                                <span className="block text-xl font-black leading-none">
                                    {Math.round(
                                        moon.illumination * 100
                                    )}
                                    %
                                </span>

                                <span className="text-[8px] font-black uppercase tracking-wider">
                                    iluminada
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#fff3c7]/60">
                            <span>Vista do hemisfério sul</span>

                            <span className="text-[#a875ff]">✦</span>

                            <span>
                                {couple.startDay}/
                                {String(
                                    couple.startMonth
                                ).padStart(2, "0")}
                                /{couple.startYear}
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

function Moon({ phase }: { phase: number }) {
    /*
     * phase:
     *
     * 0.00 = Lua nova
     * 0.25 = quarto crescente
     * 0.50 = Lua cheia
     * 0.75 = quarto minguante
     */

    const illumination =
        (1 - Math.cos(phase * Math.PI * 2)) / 2;

    const shadowOffset = 112 - illumination * 224;

    return (
        <div className="relative h-64 w-64">
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
                className="absolute inset-[-30px] rounded-full bg-[#fff3c7]/10 blur-3xl"
            />

            <svg
                viewBox="0 0 256 256"
                className="relative h-full w-full drop-shadow-[0_0_25px_rgba(255,243,199,0.25)]"
            >
                <defs>
                    <radialGradient
                        id="moonGradient"
                        cx="35%"
                        cy="30%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#fffbea"
                        />

                        <stop
                            offset="100%"
                            stopColor="#ffeeb3"
                        />
                    </radialGradient>

                    <clipPath id="moonClip">
                        <circle
                            cx="128"
                            cy="128"
                            r="112"
                        />
                    </clipPath>
                </defs>

                {/* Corpo da lua */}
                <circle
                    cx="128"
                    cy="128"
                    r="112"
                    fill="url(#moonGradient)"
                />

                {/* Crateras + sombra */}
                <g clipPath="url(#moonClip)">
                    <circle
                        cx="85"
                        cy="80"
                        r="23"
                        fill="#dfd5ad"
                        opacity="0.55"
                    />

                    <circle
                        cx="160"
                        cy="70"
                        r="15"
                        fill="#dfd5ad"
                        opacity="0.5"
                    />

                    <circle
                        cx="176"
                        cy="145"
                        r="31"
                        fill="#dfd5ad"
                        opacity="0.5"
                    />

                    <circle
                        cx="91"
                        cy="161"
                        r="17"
                        fill="#dfd5ad"
                        opacity="0.45"
                    />

                    <circle
                        cx="135"
                        cy="190"
                        r="13"
                        fill="#dfd5ad"
                        opacity="0.5"
                    />

                    {/* Sombra da fase */}
                    {phase > 0.02 && phase < 0.98 && (
                        <ellipse
                            cx={128 + shadowOffset}
                            cy="128"
                            rx="112"
                            ry="112"
                            fill="#0b0b2b"
                            opacity="0.96"
                        />
                    )}
                </g>
            </svg>
        </div>
    );
}

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
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#fff3c7]/10 bg-[#151541]/70 px-3 py-3">
            {phases.map((phase, index) => {
                const distance = Math.abs(
                    phase - currentPhase
                );

                const isCurrent =
                    distance < 0.0625;

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
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full ${
                            isCurrent
                                ? "bg-[#8064ff] shadow-[3px_3px_0_#5b45c7]"
                                : ""
                        }`}
                    >
                        <MiniMoon
                            phase={phase}
                        />
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
            <div className="h-6 w-6 rounded-full bg-[#fff3c7] shadow-[0_0_8px_rgba(255,243,199,0.4)]" />
        );
    }

    if (phase < 0.03 || phase > 0.97) {
        return (
            <div className="h-6 w-6 rounded-full bg-[#272746]" />
        );
    }

    return (
        <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#272746]">
            <div
                className="absolute inset-y-0 bg-[#fff3c7]"
                style={{
                    width: `${illumination * 100}%`,
                    left:
                        phase < 0.5
                            ? 0
                            : undefined,
                    right:
                        phase >= 0.5
                            ? 0
                            : undefined,
                }}
            />
        </div>
    );
}

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
    ];

    return (
        <div className="pointer-events-none absolute inset-0">
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
                    className="absolute rounded-full bg-[#fff3c7]"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                    }}
                />
            ))}
        </div>
    );
}