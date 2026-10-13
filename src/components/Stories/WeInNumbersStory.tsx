import { motion } from "motion/react";
import {
    Heart,
    Sparkles,
    CalendarDays,
    Moon,
    Sun,
    Activity,
    Orbit,
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

type NumberItemProps = {
    quantity: number;
    description: string;
    icon: React.ReactNode;
    index: number;
};

const stars = [
    { x: "8%", y: "12%", size: 2, delay: 0.2 },
    { x: "24%", y: "7%", size: 3, delay: 1.1 },
    { x: "47%", y: "10%", size: 2, delay: 0.6 },
    { x: "72%", y: "8%", size: 2, delay: 1.5 },
    { x: "88%", y: "19%", size: 3, delay: 0.8 },
    { x: "93%", y: "38%", size: 2, delay: 1.7 },
    { x: "6%", y: "44%", size: 2, delay: 0.9 },
    { x: "12%", y: "68%", size: 3, delay: 1.3 },
    { x: "91%", y: "72%", size: 2, delay: 0.4 },
    { x: "80%", y: "88%", size: 3, delay: 1.8 },
    { x: "27%", y: "91%", size: 2, delay: 0.7 },
    { x: "5%", y: "87%", size: 2, delay: 1.4 },
    { x: "63%", y: "31%", size: 2, delay: 1.2 },
    { x: "85%", y: "53%", size: 2, delay: 0.3 },
    { x: "19%", y: "34%", size: 2, delay: 1.6 },
    { x: "57%", y: "82%", size: 2, delay: 0.5 },
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.4 + index * 0.13,
                duration: 0.5,
                ease: "easeOut",
            }}
            className="group relative"
        >
            <div className="flex items-center gap-3 py-3">
                {/* Ícone */}
                <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.45 + index * 0.13,
                        type: "spring",
                        stiffness: 220,
                        damping: 15,
                    }}
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#9DABFF]/30 bg-[#8B9DFF]/10 text-[#B9C7FF] shadow-[0_0_18px_rgba(139,157,255,0.12)]"
                >
                    {icon}

                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#111632] bg-[#79F0E2]" />
                </motion.div>

                {/* Número */}
                <motion.div
                    whileHover={{
                        scale: 1.035,
                        borderColor: "rgba(121,240,226,0.65)",
                    }}
                    className="relative flex min-w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#9DABFF]/25 bg-gradient-to-br from-[#27345D]/90 to-[#171D40]/90 px-3 py-2.5 shadow-[0_0_18px_rgba(139,157,255,0.08)]"
                >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />

                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.5 + index * 0.13,
                            duration: 0.4,
                        }}
                        className="relative block whitespace-nowrap text-xl font-black leading-none tracking-tight text-[#F1F4FF]"
                    >
                        {formatQuantity(quantity)}
                    </motion.span>

                    <span className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#79F0E2]/60 to-transparent" />
                </motion.div>

                {/* Descrição */}
                <motion.p
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.58 + index * 0.13,
                        duration: 0.4,
                    }}
                    className="min-w-0 flex-1 text-xs font-medium leading-snug text-[#D5DCFF]/75 sm:text-sm"
                >
                    {description}
                </motion.p>
            </div>

            {/* Separador */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                    delay: 0.6 + index * 0.13,
                    duration: 0.4,
                }}
                className="h-px origin-left bg-gradient-to-r from-[#8B9DFF]/35 via-[#8B9DFF]/10 to-transparent"
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
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full overflow-hidden bg-[#080D24] text-[#F1F4FF]"
        >
            {/* ================================================
                FUNDO CÓSMICO
            ================================================= */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_12%,rgba(93,91,190,0.28),transparent_45%),radial-gradient(ellipse_at_90%_65%,rgba(43,133,164,0.16),transparent_40%),linear-gradient(160deg,#080D24_0%,#101532_55%,#090D25_100%)]" />

            {/* Nebulosa violeta */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-[#766BFF] blur-[110px]"
            />

            {/* Nebulosa ciano */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.13, scale: 1 }}
                transition={{ duration: 1.8, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-[#38CFC8] blur-[110px]"
            />

            {/* Brilho estelar */}
            <div className="pointer-events-none absolute left-[48%] top-[37%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6768D8]/[0.07] blur-[70px]" />

            {/* Estrelas */}
            <div className="pointer-events-none absolute inset-0">
                {stars.map((star, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.2, 0.9, 0.3],
                            scale: [0.8, 1.3, 0.8],
                        }}
                        transition={{
                            delay: star.delay,
                            duration: 2.5 + (index % 3),
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute rounded-full bg-[#E4EAFF]"
                        style={{
                            left: star.x,
                            top: star.y,
                            width: star.size,
                            height: star.size,
                            boxShadow:
                                star.size === 3
                                    ? "0 0 8px rgba(185,199,255,0.8)"
                                    : undefined,
                        }}
                    />
                ))}
            </div>

            <div className="absolute right-[0%] top-[10%]">
                <Orbits />
            </div>

            {/* Brilhos */}
            <motion.div
                initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                animate={{ opacity: 0.8, rotate: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="pointer-events-none absolute right-20 top-14 text-[#79F0E2]"
            >
                <Sparkles size={19} />
            </motion.div>

            <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 8, 0] }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute bottom-28 left-5 text-[#9DABFF]/70"
            >
                <Sparkles size={17} />
            </motion.div>

            {/* ================================================
                FITA LATERAL
            ================================================= */}

            <SideRibbon
                text="Nós em números"
                bg_color="bg-[#8B9DFF]/15"
            />

            {/* ================================================
                CONTEÚDO PRINCIPAL
            ================================================= */}

            <div className="relative z-10 flex h-full flex-col px-7 pb-7 pr-14 pt-8">
                {/* Cabeçalho */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9DABFF]/30 bg-[#8B9DFF]/15 text-[#B9C7FF]">
                        <Heart size={18} fill="currentColor" strokeWidth={2.5} />
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B9C7FF]">
                        Nossa história
                    </p>
                </div>

                <h1 className="max-w-xs text-4xl font-black uppercase leading-[0.9] tracking-tight">
                    O nosso amor,
                    <br />
                    em números.
                </h1>

                <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-[#D5DCFF]/60">
                    Porque algumas histórias também podem ser
                    contadas através de números.
                </p>

                {/* Painel de estatísticas */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.65 }}
                    className="relative mt-auto overflow-hidden rounded-[26px] border border-[#9DABFF]/20 bg-[#111A39]/80 px-4 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-md"
                >
                    {/* Reflexo do painel */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9DABFF]/[0.08] via-transparent to-[#79F0E2]/[0.04]" />

                    {/* Cabeçalho do painel */}
                    <div className="relative mb-1 flex items-center justify-between border-b border-[#9DABFF]/15 pb-3 pt-2">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.23em] text-[#79F0E2]/80">
                                Nossa história
                            </p>

                            <p className="mt-1 font-serif text-lg italic text-[#F1F4FF]">
                                Cada momento conta.
                            </p>
                        </div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 24,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9DABFF]/25 bg-[#8B9DFF]/10 text-[#B9C7FF]"
                        >
                            <Orbit size={18} strokeWidth={1.5} />
                        </motion.div>
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

                {/* Rodapé */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="flex items-center justify-center gap-2 pt-4"
                >
                    <span className="h-px w-5 bg-[#9DABFF]/30" />

                    <Heart
                        size={10}
                        fill="currentColor"
                        className="text-[#79F0E2]"
                    />

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D5DCFF]/45">
                        E contando...
                    </p>

                    <span className="h-px w-5 bg-[#9DABFF]/30" />
                </motion.div>
            </div>
        </motion.div>
    );
}