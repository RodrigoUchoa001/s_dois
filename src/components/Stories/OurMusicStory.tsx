
import { motion } from "motion/react";
import { Heart, Music2, Sparkles, Headphones } from "lucide-react";

import { couple } from "../../data/couple";
import {
    getMusicPlayedTimes,
    useAnimatedNumber,
} from "../../utils/date";
import { OdometerCounter } from "../OdometerCounter/OdometerCounter";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";

const COLORS = {
    cream: "#FFF0D5",
    gold: "#FFD99B",
    orange: "#FFAD70",
};

const STARS = [
    { x: "12%", y: "13%", delay: 0.2, size: 3 },
    { x: "29%", y: "19%", delay: 0.7, size: 2 },
    { x: "73%", y: "12%", delay: 0.4, size: 3 },
    { x: "85%", y: "23%", delay: 1.1, size: 2 },
    { x: "19%", y: "34%", delay: 1.3, size: 2 },
    { x: "91%", y: "38%", delay: 0.8, size: 3 },
    { x: "62%", y: "8%", delay: 1.5, size: 2 },
];

export function OurMusicStory() {
    const playedTimes = useAnimatedNumber(
        getMusicPlayedTimes(),
        2000,
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="
                relative isolate h-full w-full overflow-hidden
                bg-[#17152F] text-[#FFF0D5]
            "
        >
            {/* CÉU */}

            <div
                className="
                    pointer-events-none absolute inset-0 -z-30
                    bg-gradient-to-b
                    from-[#17152F] via-[#42223F] to-[#A54F49]
                "
            />

            {/* LUZ DO HORIZONTE — GRADIENTES ESTÁTICOS */}

            <div
                className="pointer-events-none absolute inset-0 -z-20"
                style={{
                    background: `
                        radial-gradient(
                            ellipse 70% 32% at 50% 32%,
                            rgba(255, 140, 98, 0.17),
                            transparent 100%
                        ),
                        radial-gradient(
                            ellipse 100% 28% at 50% 90%,
                            rgba(247, 160, 90, 0.15),
                            transparent 100%
                        )
                    `,
                }}
            />

            {/* ESTRELAS ESTÁTICAS */}

            {STARS.map((star, index) => (
                <div
                    key={index}
                    className="
                        pointer-events-none absolute z-0
                        rounded-full bg-[#FFE7B5]
                    "
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.size,
                        height: star.size,
                        opacity: 0.45 + (index % 3) * 0.18,
                        boxShadow:
                            star.size === 3
                                ? "0 0 5px rgba(255,217,155,0.4)"
                                : "none",
                    }}
                />
            ))}

            {/* BRILHOS DECORATIVOS */}

            <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 0.8, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="
                    pointer-events-none absolute left-[9%]
                    top-[25%] z-0
                "
            >
                <Sparkles
                    size={15}
                    className="text-[#FFD99B]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="
                    pointer-events-none absolute right-[12%]
                    top-[31%] z-0
                "
            >
                <Sparkles
                    size={12}
                    className="text-[#FFB875]"
                />
            </motion.div>

            {/* SOL POENTE */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 24,
                    scale: 0.9,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="
                    pointer-events-none absolute z-0
                    left-1/2 top-[57%] pr-6
                    -translate-x-1/2
                "
                aria-hidden="true"
            >
                <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                    {/* HALO SOLAR SEM BLUR PESADO */}

                    <div
                        className="
                            absolute -inset-8 rounded-full
                        "
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,153,102,0.16) 0%, rgba(255,153,102,0.06) 45%, transparent 72%)",
                        }}
                    />

                    <div
                        className="
                            absolute -inset-3 rounded-full
                        "
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,184,117,0.16) 0%, transparent 72%)",
                        }}
                    />

                    {/* DISCO SOLAR */}

                    <div
                        className="
                            absolute inset-0 overflow-hidden rounded-full
                            bg-gradient-to-b from-[#FFE8AE]
                            via-[#FFB66F] to-[#F16F5B]
                            shadow-[0_0_35px_rgba(255,154,82,0.18)]
                        "
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-[#B83C55]/20" />

                        <div className="absolute bottom-[17%] left-0 h-[2px] w-full bg-[#B94B52]/20" />
                        <div className="absolute bottom-[25%] left-0 h-[3px] w-full bg-[#B94B52]/25" />
                        <div className="absolute bottom-[34%] left-0 h-[2px] w-full bg-[#B94B52]/20" />
                        <div className="absolute bottom-[43%] left-0 h-[1px] w-full bg-[#FFF0D5]/30" />
                    </div>
                </div>
            </motion.div>

            {/* PAISAGEM / MONTANHAS */}

            <div
                className="
                    pointer-events-none absolute inset-x-0 bottom-0
                    z-[1] h-[43%]
                "
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 390 360"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* MONTANHAS DISTANTES */}

                    <path
                        d="M0 145 L45 111 L78 137 L125 75 L164 124 L209 94 L258 139 L302 91 L346 130 L390 100 L390 360 L0 360 Z"
                        fill="#70364A"
                        opacity="0.48"
                    />

                    {/* CAMADA INTERMEDIÁRIA */}

                    <path
                        d="M0 184 L43 154 L84 176 L137 126 L176 166 L222 141 L269 177 L321 133 L357 166 L390 146 L390 360 L0 360 Z"
                        fill="#542642"
                        opacity="0.85"
                    />

                    {/* MONTANHA FRONTAL */}

                    <path
                        d="M0 220 L52 181 L101 213 L151 174 L201 218 L247 183 L300 215 L347 179 L390 202 L390 360 L0 360 Z"
                        fill="#351D36"
                    />

                    {/* HORIZONTE ILUMINADO */}

                    <path
                        d="M0 218 Q90 200 195 216 T390 208"
                        stroke="#FFB875"
                        strokeOpacity="0.3"
                        strokeWidth="1.5"
                    />

                    {/* PRIMEIRO PLANO */}

                    <path
                        d="M0 270 Q90 239 162 267 T300 258 T390 267 L390 360 L0 360 Z"
                        fill="#24182F"
                    />
                </svg>

                {/* NÉVOA QUENTE SUBSTITUÍDA POR GRADIENTE */}

                <div
                    className="absolute inset-x-0 top-[12%] h-24"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,154,103,0.07), transparent)",
                    }}
                />

                {/* ESCURECIMENTO PARA LEITURA */}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#24182F]/10 to-[#17152F]/95" />
            </div>

            {/* FAIXA LATERAL */}

            <SideRibbon
                text="NOSSA MÚSICA"
                bg_color="bg-[#FFCB91]/10"
            />

            {/* CONTEÚDO PRINCIPAL */}

            <div
                className="
                    relative z-10 flex h-full w-full flex-col
                    px-7 pb-7 pr-14 pt-7
                    sm:px-9 sm:pr-16 sm:pt-8
                "
            >
                {/* CABEÇALHO */}

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StoryHeader text="Uma música nossa" />
                </motion.div>

                {/* TEXTO DA HISTÓRIA */}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.5 }}
                    className="mt-6 max-w-sm"
                >
                    <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFCB91]/80">
                        Uma lembrança ao entardecer
                    </span>

                    <p className="text-[15px] font-medium leading-[1.8] text-[#FFF0D5]/85 sm:text-base">
                        Entre o céu pintado pelo pôr do sol e o nosso{" "}
                        <span className="font-bold text-[#FFD99B]">
                            primeiro beijo
                        </span>
                        , essa música encontrou seu lugar na nossa história.
                    </p>
                </motion.div>

                {/* CAPA DA MÚSICA */}

                <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 28,
                            scale: 0.86,
                            rotate: -4,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{
                            delay: 0.35,
                            duration: 0.65,
                            type: "spring",
                            stiffness: 100,
                            damping: 17,
                        }}
                        className="relative"
                    >
                        {/* LUZ ATRÁS DA CAPA */}

                        <div
                            className="
                                pointer-events-none absolute -inset-6
                                rounded-[32px]
                            "
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(255,154,103,0.16), transparent 72%)",
                            }}
                        />

                        {/* MOLDURA */}

                        <div
                            className="
                                relative rounded-[27px]
                                border border-[#FFE1B1]/45
                                bg-[#FFE1B1]/10 p-2
                                shadow-[0_16px_42px_rgba(14,9,30,0.3)]
                            "
                        >
                            <img
                                src={couple.song.cover}
                                alt={`Capa de ${couple.song.title}`}
                                className="
                                    h-36 w-36 rounded-[20px]
                                    object-cover
                                    sm:h-40 sm:w-40
                                "
                            />

                            {/* SELO MUSICAL */}

                            <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#542642] bg-[#FFAD70] shadow-md">
                                <Music2
                                    size={18}
                                    className="text-[#542642]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* NOME DA MÚSICA */}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.45 }}
                        className="mt-3 text-center"
                    >
                        <h2 className="text-2xl font-black tracking-[-0.04em] text-[#111111] sm:text-3xl">
                            {couple.song.title}
                        </h2>

                        <p className="mt-1 text-sm font-medium tracking-wide text-[#111111]/65">
                            {couple.song.artist}
                        </p>
                    </motion.div>

                    {/* INDICADOR DECORATIVO */}

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-4 flex items-center gap-2"
                    >
                        <span className="h-1 w-1 rounded-full bg-[#FFD99B]/70" />

                        <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#FFD99B]/70 to-transparent" />

                        <Heart
                            size={11}
                            fill={COLORS.orange}
                            className="text-[#FFAD70]"
                        />

                        <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#FFD99B]/70 to-transparent" />

                        <span className="h-1 w-1 rounded-full bg-[#FFD99B]/70" />
                    </motion.div>
                </div>

                {/* CONTADOR DE REPRODUÇÕES */}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="relative shrink-0"
                >
                    <div
                        className="
                            relative overflow-hidden rounded-[24px]
                            border border-[#FFE1B1]/20
                            bg-[#21172F]/95 px-5 py-4
                            shadow-[0_10px_28px_rgba(10,8,25,0.18)]
                        "
                    >
                        {/* REFLEXO ESTÁTICO */}

                        <div
                            className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(255,154,103,0.09), transparent 72%)",
                            }}
                        />

                        <div className="relative flex flex-col items-center gap-3">
                            <div className="flex items-center gap-3">
                                {/* ÍCONE */}

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#FFD99B]/15 bg-[#FFAD70]/10">
                                    <Headphones
                                        size={18}
                                        className="text-[#FFD99B]"
                                    />
                                </div>

                                {/* TEXTO */}

                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFE1B1]/60">
                                        Se tocasse no repeat
                                    </p>

                                    <p className="mt-1 text-xs leading-relaxed text-[#FFF0D5]/75">
                                        desde o primeiro dia, já teria tocado...
                                    </p>
                                </div>
                            </div>

                            {/* CONTADOR ANIMADO */}

                            <div className="flex shrink-0 items-baseline gap-1.5">
                                <OdometerCounter value={playedTimes} />

                                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD99B]">
                                    vezes
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
