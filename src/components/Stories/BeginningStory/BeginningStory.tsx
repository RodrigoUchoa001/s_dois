
import { motion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";
import { couple } from "../../../data/couple";
import { SideRibbon } from "../../SideRibbon/SideRibbon";
import { StoryHeader } from "../StoryHeader";

const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
];

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const stars = [
    { top: "7%", left: "82%", size: 3, delay: 0.2 },
    { top: "13%", left: "64%", size: 2, delay: 1.1 },
    { top: "22%", left: "91%", size: 3, delay: 0.6 },
    { top: "29%", left: "7%", size: 2, delay: 1.5 },
    { top: "36%", left: "88%", size: 2, delay: 0.9 },
    { top: "47%", left: "4%", size: 3, delay: 0.4 },
    { top: "55%", left: "94%", size: 2, delay: 1.8 },
    { top: "66%", left: "8%", size: 2, delay: 0.7 },
    { top: "73%", left: "90%", size: 3, delay: 1.3 },
    { top: "82%", left: "13%", size: 2, delay: 0.3 },
    { top: "91%", left: "79%", size: 2, delay: 1.6 },
    { top: "17%", left: "17%", size: 2, delay: 1.2 },
];

function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return days;
}

function getElapsedTime() {
    const start = new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay,
        couple.startHour ?? 0,
        couple.startMinute ?? 0,
        couple.startSecond ?? 0,
    );

    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();

    const anniversary = new Date(
        start.getFullYear() + years,
        start.getMonth(),
        start.getDate(),
    );

    if (anniversary > now) {
        years--;
    }

    const afterYears = new Date(
        start.getFullYear() + years,
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
        start.getSeconds(),
    );

    const remainingDays = Math.floor(
        (now.getTime() - afterYears.getTime()) /
            (1000 * 60 * 60 * 24),
    );

    return {
        years,
        days: remainingDays,
    };
}

export function BeginningStory() {
    const month = couple.startMonth - 1;
    const year = couple.startYear;
    const day = couple.startDay;

    const calendarDays = getCalendarDays(year, month);
    const elapsed = getElapsedTime();

    const weekday = new Date(year, month, day).toLocaleDateString(
        "pt-BR",
        { weekday: "long" },
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full overflow-hidden bg-[#080D24] px-6 pb-8 pt-8 text-[#F1F2FF]"
        >
            {/* Fundo: nebulosas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.19, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="pointer-events-none absolute -right-36 top-0 h-80 w-80 rounded-full bg-[#7057FF] blur-[110px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.13, scale: 1 }}
                transition={{ duration: 1.8, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-40 -left-36 h-96 w-96 rounded-full bg-[#443BBA] blur-[120px]"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="pointer-events-none absolute left-[25%] top-[35%] h-40 w-40 rounded-full bg-[#79F0E2] blur-[100px]"
            />

            {/* Estrelas */}
            {stars.map((star, index) => (
                <motion.div
                    key={index}
                    className="pointer-events-none absolute z-0"
                    style={{
                        top: star.top,
                        left: star.left,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.25, 0.9, 0.25],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 2.5 + (index % 3),
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Star
                        size={star.size * 2}
                        fill="#C5C9FF"
                        strokeWidth={0}
                        className="text-[#C5C9FF]"
                    />
                </motion.div>
            ))}

            {/* Órbita decorativa no fundo */}
            <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="pointer-events-none absolute -right-16 top-[26%] h-40 w-40 rounded-full border border-[#9185FF]/10"
            >
                <div className="absolute -left-1 top-[35%] h-2 w-2 rounded-full bg-[#9185FF]/50 shadow-[0_0_12px_#9185FF]" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotate: 25, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 8, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="pointer-events-none absolute -left-20 bottom-[13%] h-44 w-44 rounded-full border border-[#79F0E2]/10"
            />

            {/* Brilhos decorativos */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute right-[14%] top-[16%] text-[#B9B5FF]"
            >
                <Sparkles size={15} fill="currentColor" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotate: -30, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute left-[5%] top-[38%] text-[#79F0E2]"
            >
                <Sparkles size={13} fill="currentColor" />
            </motion.div>

            <SideRibbon
                text="O COMEÇO"
                bg_color="bg-[#8B9DFF]/15"
            />

            <div className="relative z-10 pr-7">
                <StoryHeader text="Nossa história" />

                {/* Dia 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-8"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-px w-6 bg-[#9185FF]/70" />

                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#B9B5FF]">
                            O DIA 1
                        </p>

                        <div className="h-px w-6 bg-[#9185FF]/30" />
                    </div>
                </motion.div>

                {/* Mês e ano */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mt-4 flex items-end gap-3"
                >
                    <h1 className="min-w-0 flex-1 text-[clamp(2.7rem,12vw,3rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#F1F2FF]">
                        {months[month]}
                    </h1>

                    <span className="mb-1 text-2xl font-black leading-none tracking-[-0.05em] text-[#B9B5FF]/45">
                        {year}
                    </span>
                </motion.div>

                {/* Calendário */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="relative mt-7"
                >
                    {/* Halo atrás do calendário */}
                    <div className="pointer-events-none absolute -inset-x-2 -inset-y-3 rounded-2xl bg-[#6155C9]/[0.07] blur-xl" />

                    <div className="relative rounded-2xl border border-[#A6A8FF]/10 bg-[#111735]/55 px-2 pb-2 pt-3 backdrop-blur-sm">
                        {/* Dias da semana */}
                        <div className="grid grid-cols-7 border-b border-[#A6A8FF]/15 pb-2">
                            {weekdays.map((weekdayLabel, index) => (
                                <div
                                    key={`${weekdayLabel}-${index}`}
                                    className="text-center text-[10px] font-black text-[#AEB5E8]/45"
                                >
                                    {weekdayLabel}
                                </div>
                            ))}
                        </div>

                        {/* Dias do mês */}
                        <div className="mt-2 grid grid-cols-7 gap-y-1">
                            {calendarDays.map((calendarDay, index) => {
                                const isStartDay = calendarDay === day;

                                return (
                                    <div
                                        key={index}
                                        className="relative flex h-9 items-center justify-center"
                                    >
                                        {isStartDay && (
                                            <>
                                                {/* Halo luminoso */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.4,
                                                    }}
                                                    animate={{
                                                        opacity: [0.25, 0.55, 0.25],
                                                        scale: [0.9, 1.15, 0.9],
                                                    }}
                                                    transition={{
                                                        delay: 1,
                                                        duration: 2.8,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="absolute h-9 w-9 rounded-full bg-[#8B7CFF]/30 blur-md"
                                                />

                                                {/* Círculo principal */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.4,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: 1,
                                                        type: "spring",
                                                        stiffness: 180,
                                                        damping: 14,
                                                    }}
                                                    className="absolute h-8 w-8 rounded-full border border-[#A99EFF] bg-[#7767FF]/20 shadow-[0_0_15px_rgba(139,124,255,0.28)]"
                                                />

                                                {/* Órbita inclinada */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.6,
                                                        rotate: -35,
                                                    }}
                                                    animate={{
                                                        opacity: 0.8,
                                                        scale: 1,
                                                        rotate: -15,
                                                    }}
                                                    transition={{
                                                        delay: 1.2,
                                                        duration: 0.8,
                                                    }}
                                                    className="absolute h-9 w-10 rounded-full border border-[#B9B5FF]/55"
                                                />

                                                {/* Pequeno satélite */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: 1.5,
                                                        type: "spring",
                                                    }}
                                                    className="absolute right-[calc(50%-19px)] top-[calc(50%-14px)] h-1.5 w-1.5 rounded-full bg-[#79F0E2] shadow-[0_0_8px_#79F0E2]"
                                                />
                                            </>
                                        )}

                                        {calendarDay && (
                                            <motion.span
                                                initial={
                                                    calendarDay === day
                                                        ? { opacity: 0, scale: 0.5 }
                                                        : { opacity: 0.5 }
                                                }
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.55 + index * 0.012,
                                                    duration: 0.25,
                                                }}
                                                className={`relative z-10 text-sm font-bold ${
                                                    isStartDay
                                                        ? "text-white"
                                                        : "text-[#B8BDE0]/55"
                                                }`}
                                            >
                                                {calendarDay}
                                            </motion.span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Identificação da data */}
                <motion.div
                    initial={{ opacity: 0, x: 20, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    transition={{
                        delay: 1.1,
                        duration: 0.6,
                        type: "spring",
                    }}
                    className="mt-3 flex items-center justify-end gap-2"
                >
                    <span className="text-xs font-black uppercase tracking-wide text-[#B9B5FF]">
                        o dia 1
                    </span>

                    <Heart
                        size={19}
                        fill="#9185FF"
                        className="text-[#B9B5FF] drop-shadow-[0_0_8px_rgba(145,133,255,0.65)]"
                    />
                </motion.div>

                {/* Texto final */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.3,
                        duration: 0.7,
                    }}
                    className="mt-3"
                >
                    <h2 className="max-w-sm text-[clamp(2.1rem,9vw,2.6rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#F1F2FF]">
                        Tudo começou
                        <br />
                        numa{" "}
                        <span className="text-[#A99EFF]">
                            {weekday}.
                        </span>
                    </h2>

                    <p className="mt-4 text-base font-bold text-[#C3C8EA]/55">
                        Há{" "}
                        {elapsed.years > 0 &&
                            `${elapsed.years} ${
                                elapsed.years === 1 ? "ano" : "anos"
                            } `}
                        {elapsed.years > 0 && "e "}
                        {elapsed.days}{" "}
                        {elapsed.days === 1 ? "dia" : "dias"}.
                    </p>
                </motion.div>

                {/* Assinatura */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    className="mt-7 flex items-center gap-3"
                >
                    <div className="relative h-px w-10 bg-gradient-to-r from-[#9185FF] to-[#79F0E2]/60">
                        <motion.div
                            animate={{ x: [0, 36, 0], opacity: [0, 1, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-[2px] h-1 w-1 rounded-full bg-white shadow-[0_0_7px_#A99EFF]"
                        />
                    </div>

                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C3C8EA]/45">
                        e esse foi só o começo
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
