
import { motion } from "motion/react";
import { Heart, Sparkles, Orbit, Clock3 } from "lucide-react";
import { couple } from "../../data/couple";
import { getMonthName } from "../../utils/date";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";
import { Orbits } from "../Orbits/Orbits";

const stars = [
    { x: "12%", y: "17%", s: 2 },
    { x: "78%", y: "14%", s: 3 },
    { x: "24%", y: "30%", s: 2 },
    { x: "86%", y: "34%", s: 2 },
    { x: "16%", y: "52%", s: 3 },
    { x: "81%", y: "61%", s: 2 },
    { x: "30%", y: "70%", s: 2 },
    { x: "67%", y: "22%", s: 2 },
    { x: "91%", y: "47%", s: 3 },
    { x: "9%", y: "76%", s: 2 },
];

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
            transition={{ duration: 0.4 }}
            className="
                relative h-full w-full overflow-hidden
                bg-[#080B24] text-[#F4F0FF] pr-3
            "
        >
            {/* FUNDO CÓSMICO */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(
                            ellipse at 8% 5%,
                            rgba(118, 88, 255, 0.20),
                            transparent 43%
                        ),
                        radial-gradient(
                            ellipse at 100% 95%,
                            rgba(230, 185, 106, 0.10),
                            transparent 40%
                        ),
                        linear-gradient(
                            180deg,
                            #101437 0%,
                            #11102F 48%,
                            #080B24 100%
                        )
                    `,
                }}
            />

            {/* LUZ CENTRAL ESTÁTICA */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    left-1/2 top-[43%]
                    h-64 w-64 -translate-x-1/2 -translate-y-1/2
                    rounded-full
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(120,100,255,0.12) 0%, rgba(120,100,255,0.04) 40%, transparent 72%)",
                }}
            />

            {/* ESTRELAS ESTÁTICAS */}

            {stars.map((star, index) => (
                <div
                    key={index}
                    aria-hidden="true"
                    className="
                        pointer-events-none absolute z-[1]
                        rounded-full bg-[#DCD4FF]
                    "
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.s,
                        height: star.s,
                        boxShadow:
                            "0 0 4px rgba(190,175,255,0.45)",
                        opacity: index % 3 === 0 ? 0.9 : 0.65,
                    }}
                />
            ))}

            {/* MANTIDO: ÓRBITAS DO PROJETO */}

            <Orbits />

            {/* FAIXA LATERAL */}

            <SideRibbon
                text="MINUTOS JUNTOS"
                bg_color="bg-[#7864FF]/15"
            />

            {/* CONTEÚDO */}

            <div
                className="
                    relative z-10 flex h-full w-full
                    flex-col px-7 pb-8 pr-14 pt-8
                "
            >
                {/* CABEÇALHO */}

                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StoryHeader text="Nosso tempo" />
                </motion.div>

                {/* DATA DE INÍCIO */}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mt-7"
                >
                    <div className="flex items-center gap-2">
                        <Clock3
                            size={13}
                            className="text-[#C2B5FF]"
                        />

                        <span
                            className="
                                text-[10px] font-bold uppercase
                                tracking-[0.25em] text-[#C2B5FF]/75
                            "
                        >
                            Tudo começou em
                        </span>
                    </div>

                    <p
                        className="
                            mt-2 text-sm font-medium
                            tracking-wide text-[#F4F0FF]/75
                        "
                    >
                        {couple.startDay} de{" "}
                        {getMonthName(couple.startMonth + 1)} de{" "}
                        {couple.startYear}
                    </p>
                </motion.div>

                {/* CONTADOR CENTRAL */}

                <div
                    className="
                        relative flex min-h-0 flex-1
                        flex-col items-center justify-center
                    "
                >
                    {/* ÍCONE ORBITAL */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                        }}
                        className="
                            mb-5 flex h-11 w-11 items-center
                            justify-center rounded-full
                            border border-[#A99AFF]/25
                            bg-[#7864FF]/10
                            shadow-[0_0_18px_rgba(120,100,255,0.10)]
                        "
                    >
                        <Orbit
                            size={20}
                            strokeWidth={1.5}
                            className="text-[#C2B5FF]"
                        />
                    </motion.div>

                    {/* NÚMERO */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.35,
                            duration: 0.6,
                        }}
                        className="relative w-full text-center"
                    >
                        {/* HALO ESTÁTICO */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none absolute
                                left-1/2 top-1/2
                                h-40 w-[90%]
                                -translate-x-1/2 -translate-y-1/2
                                rounded-full
                            "
                            style={{
                                background:
                                    "radial-gradient(ellipse, rgba(120,100,255,0.11) 0%, rgba(120,100,255,0.035) 42%, transparent 72%)",
                            }}
                        />

                        <span
                            className="
                                relative block whitespace-nowrap
                                text-[clamp(2.7rem,12vw,4.2rem)]
                                font-black leading-none
                                tracking-[-0.075em]
                                text-[#F4F0FF]
                            "
                            style={{
                                textShadow:
                                    "0 0 18px rgba(194,181,255,0.10)",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {animatedMinutes.toLocaleString("pt-BR")}
                        </span>
                    </motion.div>

                    {/* UNIDADE */}

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        className="mt-4 flex items-center gap-3"
                    >
                        <div
                            className="
                                h-px w-7 bg-gradient-to-r
                                from-transparent to-[#A99AFF]/70
                            "
                        />

                        <span
                            className="
                                text-xs font-black uppercase
                                tracking-[0.3em] text-[#BDAFFF]
                            "
                        >
                            minutos juntos
                        </span>

                        <div
                            className="
                                h-px w-7 bg-gradient-to-l
                                from-transparent to-[#A99AFF]/70
                            "
                        />
                    </motion.div>

                    {/* MENSAGEM CURTA */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-6 flex items-center gap-2"
                    >
                        <Sparkles
                            size={13}
                            className="text-[#E6C889]"
                        />

                        <p
                            className="
                                text-center text-[10px]
                                font-medium tracking-[0.08em]
                                text-[#F4F0FF]/55
                            "
                        >
                            Cada minuto faz parte da nossa história.
                        </p>

                        <Sparkles
                            size={13}
                            className="text-[#E6C889]"
                        />
                    </motion.div>
                </div>

                {/* MENSAGEM FINAL */}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="relative shrink-0"
                >
                    <div
                        className="
                            relative overflow-hidden rounded-[24px]
                            border border-[#A99AFF]/15
                            bg-[#151633] px-5 py-4
                            shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                        "
                    >
                        {/* REFLEXO ESTÁTICO */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none absolute
                                -right-8 -top-10 h-24 w-24
                                rounded-full
                            "
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(120,100,255,0.14), transparent 70%)",
                            }}
                        />

                        <Heart
                            size={16}
                            fill="#BDAFFF"
                            className="
                                absolute -right-1 -top-1
                                rotate-12 text-[#BDAFFF]
                            "
                        />

                        <p
                            className="
                                relative text-sm font-medium
                                leading-relaxed text-[#F4F0FF]/75
                            "
                        >
                            {couple.wrapped.minutesTogether.message}
                        </p>
                    </div>

                    <p
                        className="
                            mt-3 text-center text-[9px]
                            font-bold uppercase tracking-[0.23em]
                            text-[#BDAFFF]/40
                        "
                    >
                        Dois caminhos, um tempo compartilhado
                    </p>
                </motion.div>
            </div>

            {/* ELEMENTO DECORATIVO INFERIOR */}

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                    delay: 0.5,
                    duration: 0.5,
                }}
                className="
                    pointer-events-none absolute
                    bottom-[24%] right-[7%] z-[2]
                "
            >
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-full border border-[#E6C889]/20
                        bg-[#E6C889]/[0.06]
                    "
                >
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
