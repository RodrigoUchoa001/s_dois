import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
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
        couple.startMonth,
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
    const month = couple.startMonth;
    const year = couple.startYear;
    const day = couple.startDay;

    const calendarDays = getCalendarDays(year, month);
    const elapsed = getElapsedTime();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full bg-[#0b0b2b] px-6 pb-12 pt-8 text-[#fff3c7]"
        >
            {/* Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.16, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-[#8064ff] blur-[110px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#8064ff] blur-[120px]"
            />

            {/* Decoração */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute right-[15%] top-[17%]"
            >
                <Sparkles
                    size={13}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotate: -30, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute left-[10%] top-[42%]"
            >
                <Sparkles
                    size={15}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <SideRibbon text="O COMEÇO" />

            <div className="relative z-10 pr-7">
                <StoryHeader text="Nossa história" />

                {/* Dia 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-10"
                >
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a875ff]">
                        O DIA 1
                    </p>
                </motion.div>

                {/* Mês + ano */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mt-3 flex items-end gap-3"
                >
                    <h1 className="min-w-0 flex-1 text-[clamp(3.1rem,14vw,3rem)] font-black uppercase leading-[0.78] tracking-[-0.07em] text-[#fff3c7]">
                        {months[month]}
                    </h1>

                    <span className="mb-1 text-3xl font-black leading-none tracking-[-0.05em] text-[#fff3c7]/35">
                        {year}
                    </span>
                </motion.div>

                {/* Calendário */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8"
                >
                    {/* Dias da semana */}
                    <div className="grid grid-cols-7 border-b-2 border-[#fff3c7]/15 pb-3">
                        {weekdays.map((weekday, index) => (
                            <div
                                key={`${weekday}-${index}`}
                                className="text-center text-xs font-black text-[#fff3c7]/35"
                            >
                                {weekday}
                            </div>
                        ))}
                    </div>

                    {/* Dias */}
                    <div className="relative mt-2 grid grid-cols-7 gap-y-1">
                        {calendarDays.map((calendarDay, index) => {
                            const isStartDay = calendarDay === day;

                            return (
                                <div
                                    key={index}
                                    className="relative flex h-11 items-center justify-center"
                                >
                                    {isStartDay && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.5,
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
                                            className="absolute inset-y-0.5 left-1/2 w-10 -translate-x-1/2 rounded-full bg-[#a875ff]/20 ring-2 ring-[#a875ff]"
                                        />
                                    )}

                                    {calendarDay && (
                                        <span
                                            className={`relative z-10 text-lg font-black ${
                                                isStartDay
                                                    ? "text-[#fff3c7]"
                                                    : "text-[#fff3c7]/35"
                                            }`}
                                        >
                                            {calendarDay}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Identificação do dia */}
                <motion.div
                    initial={{ opacity: 0, x: 20, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    transition={{
                        delay: 1.1,
                        duration: 0.6,
                        type: "spring",
                    }}
                    className="mt-1 flex items-center justify-end gap-2"
                >
                    <span className="font-black text-[#a875ff]">
                        o dia 1
                    </span>

                    <Heart
                        size={22}
                        fill="#a875ff"
                        className="text-[#a875ff]"
                    />
                </motion.div>

                {/* Texto final */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.3,
                        duration: 0.7,
                    }}
                    className=""
                >
                    <h2 className="max-w-sm text-[clamp(2.4rem,10vw)] font-black leading-[0.9] tracking-[-0.055em] text-[#fff3c7]">
                        Tudo começou
                        <br />
                        numa{" "}
                        <span className="text-[#a875ff]">
                            {new Date(
                                year,
                                month,
                                day,
                            ).toLocaleDateString("pt-BR", {
                                weekday: "long",
                            })}
                            .
                        </span>
                    </h2>

                    <p className="mt-5 text-lg font-bold text-[#fff3c7]/50">
                        Há {elapsed.years}{" "}
                        {elapsed.years === 1
                            ? "ano"
                            : "anos"}{" "}
                        e {elapsed.days}{" "}
                        {elapsed.days === 1
                            ? "dia"
                            : "dias"}.
                    </p>
                </motion.div>

                {/* Assinatura */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="mt-12 flex items-center gap-3"
                >
                    <div className="h-[2px] w-10 bg-[#a875ff]" />

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fff3c7]/35">
                        e esse foi só o começo
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}