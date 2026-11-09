
import { motion } from "motion/react";
import {
    Heart,
    Sparkles,
    CalendarDays,
    Moon,
    Sun,
    Activity,
} from "lucide-react";

import {
    getDaysTogether,
    getFullMoonDaysTogether,
    getHeartbeatsTogether,
    getSeasonsTogether,
    getWeekendsTogether,
    useAnimatedNumber,
} from "../../utils/date";

import { SideRibbon } from "../SideRibbon/SideRibbon";
import { Orbits } from "../Orbits/Orbits";
import { StoryHeader } from "./StoryHeader";

type NumberItemProps = {
    quantity: number;
    description: string;
    icon: React.ReactNode;
    index: number;
};

const stars = [
    { x: "8%", y: "12%", size: 2 },
    { x: "24%", y: "7%", size: 3 },
    { x: "47%", y: "10%", size: 2 },
    { x: "72%", y: "8%", size: 2 },
    { x: "88%", y: "19%", size: 3 },
    { x: "93%", y: "38%", size: 2 },
    { x: "6%", y: "44%", size: 2 },
    { x: "12%", y: "68%", size: 3 },
    { x: "91%", y: "72%", size: 2 },
    { x: "80%", y: "88%", size: 3 },
    { x: "27%", y: "91%", size: 2 },
    { x: "5%", y: "87%", size: 2 },
    { x: "63%", y: "31%", size: 2 },
    { x: "85%", y: "53%", size: 2 },
    { x: "19%", y: "34%", size: 2 },
    { x: "57%", y: "82%", size: 2 },
];

function formatQuantity(quantity: number) {
    const value = Math.floor(quantity);

    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
        })} bi`;
    }

    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
        })} mi`;
    }

    return value.toLocaleString("pt-BR");
}

function NumberItem({
    quantity,
    description,
    icon,
    index,
}: NumberItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.25 + index * 0.09,
                duration: 0.4,
                ease: "easeOut",
            }}
            className="relative"
        >
            <div className="flex items-center gap-3 py-3">
                {/* ÍCONE */}

                <div
                    className="
                        relative flex h-10 w-10 shrink-0
                        items-center justify-center rounded-full
                        border border-[#9DABFF]/30
                        bg-[#8B9DFF]/10 text-[#B9C7FF]
                    "
                >
                    {icon}

                    <span
                        className="
                            absolute -right-0.5 -top-0.5
                            h-2 w-2 rounded-full
                            border border-[#111632] bg-[#79F0E2]
                        "
                    />
                </div>

                {/* NÚMERO */}

                <div
                    className="
                        relative flex min-w-[104px] shrink-0
                        items-center justify-center overflow-hidden
                        rounded-xl border border-[#9DABFF]/25
                        bg-[#20294D] px-3 py-2.5
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none absolute inset-0
                            bg-gradient-to-br
                            from-white/[0.05] to-transparent
                        "
                    />

                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3 + index * 0.09,
                            duration: 0.3,
                        }}
                        className="
                            relative block whitespace-nowrap
                            text-xl font-black leading-none
                            tracking-tight text-[#F1F4FF]
                        "
                        style={{
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {formatQuantity(quantity)}
                    </motion.span>

                    <span
                        className="
                            absolute bottom-0 left-3 right-3
                            h-px bg-[#79F0E2]/40
                        "
                    />
                </div>

                {/* DESCRIÇÃO */}

                <motion.p
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.35 + index * 0.09,
                        duration: 0.3,
                    }}
                    className="
                        min-w-0 flex-1 text-xs font-medium
                        leading-snug text-[#D5DCFF]/75 sm:text-sm
                    "
                >
                    {description}
                </motion.p>
            </div>

            {/* SEPARADOR */}

            <div
                className="
                    h-px origin-left
                    bg-gradient-to-r
                    from-[#8B9DFF]/30 via-[#8B9DFF]/10 to-transparent
                "
            />
        </motion.div>
    );
}

export function WeInNumbersStory() {
    const animatedDays = useAnimatedNumber(getDaysTogether());
    const animatedWeekends = useAnimatedNumber(getWeekendsTogether());
    const animatedFullMoonDays = useAnimatedNumber(
        getFullMoonDaysTogether(),
    );
    const animatedSeasons = useAnimatedNumber(getSeasonsTogether());
    const animatedHeartbeats = useAnimatedNumber(getHeartbeatsTogether());

    const numbers = [
        {
            quantity: animatedDays,
            description: "dias juntos",
            icon: <CalendarDays size={17} strokeWidth={2.2} />,
        },
        {
            quantity: animatedWeekends,
            description: "fins de semana juntos",
            icon: <Heart size={17} fill="currentColor" />,
        },
        {
            quantity: animatedFullMoonDays,
            description: "luas cheias juntos",
            icon: <Moon size={17} fill="currentColor" />,
        },
        {
            quantity: animatedSeasons,
            description: "estações juntos",
            icon: <Sun size={17} fill="currentColor" />,
        },
        {
            quantity: animatedHeartbeats,
            description: "batidas do coração enquanto isso",
            icon: <Activity size={17} strokeWidth={2.2} />,
        },
    ];

    return (
        <motion.div
            key="numbers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
                relative h-full w-full overflow-hidden
                bg-[#080D24] text-[#F1F4FF]
            "
        >
            {/* FUNDO CÓSMICO ESTÁTICO */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(
                            ellipse at 15% 12%,
                            rgba(93, 91, 190, 0.22),
                            transparent 45%
                        ),
                        radial-gradient(
                            ellipse at 90% 65%,
                            rgba(43, 133, 164, 0.13),
                            transparent 40%
                        ),
                        linear-gradient(
                            160deg,
                            #080D24 0%,
                            #101532 55%,
                            #090D25 100%
                        )
                    `,
                }}
            />

            {/* ESTRELAS ESTÁTICAS */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
            >
                {stars.map((star, index) => (
                    <span
                        key={index}
                        className="absolute rounded-full bg-[#E4EAFF]"
                        style={{
                            left: star.x,
                            top: star.y,
                            width: star.size,
                            height: star.size,
                            opacity: index % 3 === 0 ? 0.85 : 0.55,
                            boxShadow:
                                star.size === 3
                                    ? "0 0 4px rgba(185,199,255,0.45)"
                                    : undefined,
                        }}
                    />
                ))}
            </div>

            {/* BRILHO CENTRAL ESTÁTICO */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    left-[48%] top-[37%]
                    h-56 w-56 -translate-x-1/2 -translate-y-1/2
                    rounded-full
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(103,104,216,0.08) 0%, rgba(103,104,216,0.025) 45%, transparent 72%)",
                }}
            />

            {/* ÓRBITAS EXISTENTES */}

            <div className="pointer-events-none absolute right-0 top-[10%]">
                <Orbits />
            </div>

            {/* BRILHO SUPERIOR */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    right-20 top-14 text-[#79F0E2]/70
                "
            >
                <Sparkles size={19} />
            </div>

            {/* BRILHO INFERIOR ESTÁTICO */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    bottom-28 left-5 text-[#9DABFF]/55
                "
            >
                <Sparkles size={17} />
            </div>

            {/* FAIXA LATERAL */}

            <SideRibbon
                text="Nós em números"
                bg_color="bg-[#8B9DFF]/15"
            />

            {/* CONTEÚDO PRINCIPAL */}

            <div
                className="
                    relative z-10 flex h-full flex-col
                    px-7 pb-7 pr-14 pt-8
                "
            >
                {/* CABEÇALHO */}

                <StoryHeader text="Nossa história" />

                <h1
                    className="
                        max-w-xs text-4xl font-black
                        uppercase leading-[0.9] tracking-tight
                    "
                >
                    O nosso amor,
                    <br />
                    em números.
                </h1>

                <p
                    className="
                        mt-4 max-w-xs text-sm font-medium
                        leading-relaxed text-[#D5DCFF]/60
                    "
                >
                    Porque algumas histórias também podem ser
                    contadas através de números.
                </p>

                {/* PAINEL DE ESTATÍSTICAS */}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="
                        relative mt-auto overflow-hidden
                        rounded-[26px] border border-[#9DABFF]/20
                        bg-[#111A39] px-4 py-2
                        shadow-[0_10px_30px_rgba(0,0,0,0.16)]
                    "
                >
                    {/* REFLEXO ESTÁTICO */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none absolute inset-0
                            bg-gradient-to-br
                            from-[#9DABFF]/[0.06]
                            via-transparent
                            to-[#79F0E2]/[0.025]
                        "
                    />

                    {/* CABEÇALHO DO PAINEL */}

                    <div
                        className="
                            relative mb-1 flex items-center
                            justify-between border-b
                            border-[#9DABFF]/15 pb-3 pt-2
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[9px] font-black uppercase
                                    tracking-[0.23em] text-[#79F0E2]/80
                                "
                            >
                                Nossa história
                            </p>

                            <p
                                className="
                                    mt-1 font-serif text-lg italic
                                    text-[#F1F4FF]
                                "
                            >
                                Cada momento conta.
                            </p>
                        </div>
                    </div>

                    {numbers.map((item, index) => (
                        <NumberItem
                            key={item.description}
                            quantity={item.quantity}
                            description={item.description}
                            icon={item.icon}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* RODAPÉ */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="
                        flex items-center justify-center gap-2 pt-4
                    "
                >
                    <span className="h-px w-5 bg-[#9DABFF]/30" />

                    <Heart
                        size={10}
                        fill="currentColor"
                        className="text-[#79F0E2]"
                    />

                    <p
                        className="
                            text-[9px] font-bold uppercase
                            tracking-[0.2em] text-[#D5DCFF]/45
                        "
                    >
                        E contando...
                    </p>

                    <span className="h-px w-5 bg-[#9DABFF]/30" />
                </motion.div>
            </div>
        </motion.div>
    );
}
