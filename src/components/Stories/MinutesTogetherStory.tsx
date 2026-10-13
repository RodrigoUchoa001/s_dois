import { motion } from "motion/react";
import { Heart, Sparkles, Orbit, Clock3 } from "lucide-react";
import { couple } from "../../data/couple";
import { getMonthName } from "../../utils/date";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";
import { Orbits } from "../Orbits/Orbits";

export function MinutesTogetherStory({
    animatedMinutes,
}: {
    animatedMinutes: number;
}) {
    return (
        <motion.div
            key="minutes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="
                relative h-full w-full overflow-hidden
                bg-[#080B24] text-[#F4F0FF] pr-3
            "
        >
            {/* ==================================================
                FUNDO CÓSMICO
            ================================================== */}

            <div className="absolute inset-0 bg-gradient-to-b from-[#101437] via-[#11102F] to-[#080B24]" />

            {/* Nebulosa violeta */}

            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="
                    pointer-events-none absolute
                    -left-32 -top-24 h-80 w-80
                    rounded-full bg-[#7658FF]/20
                    blur-[100px]
                "
            />

            {/* Luz dourada */}

            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.65, scale: 1 }}
                transition={{ duration: 1.8, delay: 0.2 }}
                className="
                    pointer-events-none absolute
                    -bottom-24 -right-24 h-80 w-80
                    rounded-full bg-[#E6B96A]/10
                    blur-[100px]
                "
            />

            {/* Luz central */}

            <div className="
                pointer-events-none absolute left-1/2 top-[43%]
                h-64 w-64 -translate-x-1/2 -translate-y-1/2
                rounded-full bg-[#7864FF]/10 blur-[80px]
            " />

            {/* ==================================================
                ESTRELAS
            ================================================== */}

            {[
                { x: "12%", y: "17%", s: 2, d: 0.2 },
                { x: "78%", y: "14%", s: 3, d: 0.7 },
                { x: "24%", y: "30%", s: 2, d: 1.1 },
                { x: "86%", y: "34%", s: 2, d: 0.5 },
                { x: "16%", y: "52%", s: 3, d: 1.4 },
                { x: "81%", y: "61%", s: 2, d: 0.9 },
                { x: "30%", y: "70%", s: 2, d: 1.6 },
                { x: "67%", y: "22%", s: 2, d: 1.2 },
                { x: "91%", y: "47%", s: 3, d: 0.4 },
                { x: "9%", y: "76%", s: 2, d: 1.8 },
            ].map((star, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.2, 0.85, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        delay: star.d,
                        duration: 3 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        pointer-events-none absolute z-[1]
                        rounded-full bg-[#DCD4FF]
                        shadow-[0_0_8px_rgba(190,175,255,0.7)]
                    "
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.s,
                        height: star.s,
                    }}
                />
            ))}

            <Orbits />

            {/* ==================================================
                FAIXA LATERAL
            ================================================== */}

            <SideRibbon
                text="MINUTOS JUNTOS"
                bg_color="bg-[#7864FF]/15"
            />

            {/* ==================================================
                CONTEÚDO
            ================================================== */}

            <div className="
                relative z-10 flex h-full w-full
                flex-col px-7 pb-8 pr-14 pt-8
            ">
                {/* Cabeçalho */}

                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <StoryHeader text="Nosso tempo" />
                </motion.div>

                {/* ==================================================
                    DATA DE INÍCIO
                ================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.7 }}
                    className="mt-7"
                >
                    <div className="flex items-center gap-2">
                        <Clock3
                            size={13}
                            className="text-[#C2B5FF]"
                        />

                        <span className="
                            text-[10px] font-bold uppercase
                            tracking-[0.25em] text-[#C2B5FF]/75
                        ">
                            Tudo começou em
                        </span>
                    </div>

                    <p className="
                        mt-2 text-sm font-medium
                        tracking-wide text-[#F4F0FF]/75
                    ">
                        {couple.startDay} de{" "}
                        {getMonthName(couple.startMonth + 1)} de{" "}
                        {couple.startYear}
                    </p>
                </motion.div>

                {/* ==================================================
                    CONTADOR CENTRAL
                ================================================== */}

                <div className="
                    relative flex min-h-0 flex-1
                    flex-col items-center justify-center
                ">
                    {/* Ícone orbital */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            type: "spring",
                        }}
                        className="
                            mb-5 flex h-11 w-11 items-center
                            justify-center rounded-full
                            border border-[#A99AFF]/25
                            bg-[#7864FF]/10
                            shadow-[0_0_30px_rgba(120,100,255,0.12)]
                        "
                    >
                        <Orbit
                            size={20}
                            strokeWidth={1.5}
                            className="text-[#C2B5FF]"
                        />
                    </motion.div>

                    {/* Número */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.45,
                            duration: 0.9,
                            type: "spring",
                            stiffness: 90,
                            damping: 15,
                        }}
                        className="relative w-full text-center"
                    >
                        {/* Halo atrás dos números */}

                        <div className="
                            pointer-events-none absolute left-1/2 top-1/2
                            h-40 w-[90%] -translate-x-1/2
                            -translate-y-1/2 rounded-full
                            bg-[#7864FF]/10 blur-[55px]
                        " />

                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 15px rgba(194,181,255,0.08)",
                                    "0 0 30px rgba(194,181,255,0.22)",
                                    "0 0 15px rgba(194,181,255,0.08)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                relative block whitespace-nowrap
                                text-[clamp(2.7rem,12vw,4.2rem)]
                                font-black leading-none
                                tracking-[-0.075em]
                                text-[#F4F0FF]
                            "
                        >
                            {animatedMinutes.toLocaleString("pt-BR")}
                        </motion.span>
                    </motion.div>

                    {/* Unidade */}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-4 flex items-center gap-3"
                    >
                        <div className="
                            h-px w-7 bg-gradient-to-r
                            from-transparent to-[#A99AFF]/70
                        " />

                        <span className="
                            text-xs font-black uppercase
                            tracking-[0.3em] text-[#BDAFFF]
                        ">
                            minutos juntos
                        </span>

                        <div className="
                            h-px w-7 bg-gradient-to-l
                            from-transparent to-[#A99AFF]/70
                        " />
                    </motion.div>

                    {/* Mensagem curta */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-6 flex items-center gap-2"
                    >
                        <Sparkles
                            size={13}
                            className="text-[#E6C889]"
                        />

                        <p className="
                            text-center text-[10px]
                            font-medium tracking-[0.08em]
                            text-[#F4F0FF]/55
                        ">
                            Cada minuto faz parte da nossa história.
                        </p>

                        <Sparkles
                            size={13}
                            className="text-[#E6C889]"
                        />
                    </motion.div>
                </div>

                {/* ==================================================
                    MENSAGEM FINAL
                ================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.7 }}
                    className="relative shrink-0"
                >
                    <div className="
                        relative overflow-hidden rounded-[24px]
                        border border-[#A99AFF]/15
                        bg-[#151633]/75 px-5 py-4
                        shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                        backdrop-blur-xl
                    ">
                        {/* Reflexo violeta */}

                        <div className="
                            pointer-events-none absolute
                            -right-8 -top-10 h-24 w-24
                            rounded-full bg-[#7864FF]/15 blur-2xl
                        " />

                        <Heart
                            size={16}
                            fill="#BDAFFF"
                            className="
                                absolute -right-1 -top-1
                                rotate-12 text-[#BDAFFF]
                            "
                        />

                        <p className="
                            relative text-sm font-medium
                            leading-relaxed text-[#F4F0FF]/75
                        ">
                            {couple.wrapped.minutesTogether.message}
                        </p>
                    </div>

                    <p className="
                        mt-3 text-center text-[9px]
                        font-bold uppercase tracking-[0.23em]
                        text-[#BDAFFF]/40
                    ">
                        Dois caminhos, um tempo compartilhado
                    </p>
                </motion.div>
            </div>

            {/* ==================================================
                ELEMENTO DECORATIVO INFERIOR
            ================================================== */}

            <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                    delay: 0.7,
                    duration: 0.8,
                    type: "spring",
                }}
                className="
                    pointer-events-none absolute
                    bottom-[24%] right-[7%] z-[2]
                "
            >
                <div className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full border border-[#E6C889]/20
                    bg-[#E6C889]/[0.06]
                ">
                    <Heart
                        size={15}
                        fill="#E6C889"
                        className="text-[#E6C889]/80"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}