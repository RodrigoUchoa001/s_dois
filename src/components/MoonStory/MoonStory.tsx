import { motion } from "motion/react";
import { couple } from "../../data/couple";
import { getMoonPhase, getMoonPhaseName } from "../../utils/date";

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
            className="relative flex h-full w-full flex-col overflow-hidden bg-[#080923] px-6 pb-6 pt-16 text-white"
        >
            {/* Estrelas */}
            <Stars />

            {/* Conteúdo */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >

                    <h1 className="mt-5 max-w-[340px] text-4xl font-black leading-[0.95] tracking-tight">
                        Naquela noite, a lua estava
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
                    >
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
                    <h2 className="text-4xl font-black uppercase tracking-tight text-[#fff0bd]">
                        {phaseName}
                    </h2>

                    <p className="mt-2 text-base font-medium text-white/80">
                        {Math.round(moon.illumination * 100)}% iluminada
                        <span className="mx-2 text-white/30">·</span>
                        vista do hemisfério sul
                    </p>

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
            {/* Brilho ao redor da Lua */}
            <div className="absolute inset-[-25px] rounded-full bg-[#fff1bd]/10 blur-2xl" />

            <svg
                viewBox="0 0 256 256"
                className="relative h-full w-full"
            >
                <defs>
                    {/* Gradiente da Lua */}
                    <radialGradient
                        id="moonGradient"
                        cx="35%"
                        cy="30%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#fff9df"
                        />

                        <stop
                            offset="100%"
                            stopColor="#ffeeb3"
                        />
                    </radialGradient>

                    {/* 
                     * ESSA É A PARTE IMPORTANTE.
                     *
                     * Tudo que estiver dentro desse clipPath
                     * ficará limitado ao círculo da Lua.
                     */}
                    <clipPath id="moonClip">
                        <circle
                            cx="128"
                            cy="128"
                            r="112"
                        />
                    </clipPath>
                </defs>

                {/* Lua inteira */}
                <circle
                    cx="128"
                    cy="128"
                    r="112"
                    fill="url(#moonGradient)"
                />

                {/* Elementos da Lua + sombra */}
                <g clipPath="url(#moonClip)">
                    {/* Crateras */}
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
                    {phase > 0.02 &&
                        phase < 0.98 && (
                            <ellipse
                                cx={128 + shadowOffset}
                                cy="128"
                                rx="112"
                                ry="112"
                                fill="#080923"
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
        <div className="mt-5 flex items-center justify-between">
            {phases.map((phase, index) => {
                const distance = Math.abs(
                    phase - currentPhase
                );

                const isCurrent =
                    distance < 0.0625;

                return (
                    <div
                        key={index}
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full ${
                            isCurrent
                                ? "bg-[#fff0bd]/20 ring-2 ring-[#fff0bd]"
                                : ""
                        }`}
                    >
                        <MiniMoon phase={phase} />
                    </div>
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

    const isFull = phase >= 0.47 && phase <= 0.53;

    if (isFull) {
        return (
            <div className="h-7 w-7 rounded-full bg-[#fff0bd]" />
        );
    }

    if (phase < 0.03 || phase > 0.97) {
        return (
            <div className="h-7 w-7 rounded-full bg-[#272946]" />
        );
    }

    return (
        <div className="relative h-7 w-7 overflow-hidden rounded-full bg-[#272946]">
            <div
                className="absolute inset-y-0 bg-[#c6c6d4]"
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
                        duration:
                            2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-[#fff0bd]"
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