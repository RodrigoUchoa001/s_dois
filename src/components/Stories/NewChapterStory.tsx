
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";
import {
    Plane,
    Heart,
    Check,
    Sparkles,
    Ticket,
    Clock3,
    CalendarDays,
    Star,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { SideRibbon } from "../SideRibbon/SideRibbon";
import { couple } from "../../data/couple";

type Milestone = {
    label: string;
    months: number;
};

type Point = {
    x: number;
    y: number;
};

type MilestoneState = {
    previous: Milestone;
    next: Milestone;
    previousDate: Date;
    nextDate: Date;
    progress: number;
};

const MILESTONES: Milestone[] = [
    { label: "1 mês", months: 1 },
    { label: "3 meses", months: 3 },
    { label: "6 meses", months: 6 },
    { label: "1 ano", months: 12 },
    { label: "2 anos", months: 24 },
    { label: "3 anos", months: 36 },
    { label: "5 anos", months: 60 },
    { label: "10 anos", months: 120 },
    { label: "15 anos", months: 180 },
    { label: "20 anos", months: 240 },
];

const START_DATE = new Date(
    couple.startYear,
    couple.startMonth - 1,
    couple.startDay,
    couple.startHour ?? 0,
    couple.startMinute ?? 0,
    couple.startSecond ?? 0,
);

const ROUTE_PATH = "M 18 67 Q 160 -15 302 70";

const MONTHS = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
];

const STAR_POSITIONS = [
    [12, 19],
    [84, 12],
    [91, 34],
    [7, 57],
    [79, 73],
    [23, 87],
    [63, 9],
    [47, 24],
];

function addMonths(date: Date, months: number) {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDayOfTargetMonth = new Date(
        result.getFullYear(),
        result.getMonth() + 1,
        0,
    ).getDate();

    result.setDate(Math.min(originalDay, lastDayOfTargetMonth));

    return result;
}

function differenceInDays(from: Date, to: Date) {
    const fromUTC = Date.UTC(
        from.getFullYear(),
        from.getMonth(),
        from.getDate(),
    );

    const toUTC = Date.UTC(
        to.getFullYear(),
        to.getMonth(),
        to.getDate(),
    );

    return Math.max(0, Math.ceil((toUTC - fromUTC) / 86_400_000));
}

function getMilestoneState(now: Date): MilestoneState {
    let previousIndex = -1;

    for (let i = 0; i < MILESTONES.length; i++) {
        if (addMonths(START_DATE, MILESTONES[i].months) <= now) {
            previousIndex = i;
        } else {
            break;
        }
    }

    const nextIndex = previousIndex + 1;

    let previous: Milestone;
    let next: Milestone;

    if (previousIndex < 0) {
        previous = { label: "Início", months: 0 };
        next = MILESTONES[0];
    } else if (nextIndex >= MILESTONES.length) {
        previous = MILESTONES[MILESTONES.length - 1];

        next = {
            label: `${previous.months / 12 + 1} anos`,
            months: previous.months + 12,
        };
    } else {
        previous = MILESTONES[previousIndex];
        next = MILESTONES[nextIndex];
    }

    const previousDate = addMonths(START_DATE, previous.months);
    const nextDate = addMonths(START_DATE, next.months);

    const totalDays = differenceInDays(previousDate, nextDate);
    const elapsedDays = differenceInDays(previousDate, now);

    const progress =
        totalDays <= 0
            ? 0
            : Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

    return {
        previous,
        next,
        previousDate,
        nextDate,
        progress,
    };
}

function formatDate(date: Date) {
    return `${String(date.getDate()).padStart(2, "0")} ${
        MONTHS[date.getMonth()]
    } ${date.getFullYear()}`;
}

function getExactProgress(now: Date, from: Date, to: Date) {
    const total = to.getTime() - from.getTime();

    if (total <= 0) return 0;

    return Math.min(
        1,
        Math.max(0, (now.getTime() - from.getTime()) / total),
    );
}

/*
 * Calcula a posição diretamente na curva quadrática SVG.
 * Evita consultar o DOM e atualizar estado via useLayoutEffect
 * a cada segundo do contador.
 */
function getRoutePoint(progress: number): Point {
    const t = Math.min(1, Math.max(0, progress));
    const inverse = 1 - t;

    return {
        x:
            inverse * inverse * 18 +
            2 * inverse * t * 160 +
            t * t * 302,
        y:
            inverse * inverse * 67 +
            2 * inverse * t * -15 +
            t * t * 70,
    };
}

export function NextChapterStory({
    isOpen = true,
}: {
    isOpen?: boolean;
}) {
    const [now, setNow] = useState(() => new Date());
    const reduceMotion = useReducedMotion();

    const previousMilestoneRef = useRef<string | null>(null);
    const celebrationTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isCelebrating, setIsCelebrating] = useState(false);

    const [celebrationData, setCelebrationData] = useState<{
        completed: Milestone;
        next: Milestone;
    } | null>(null);

    const milestone = useMemo(() => getMilestoneState(now), [now]);

    /*
     * Atualiza o relógio apenas enquanto a tela está aberta.
     */
    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    /*
     * Detecta a conclusão de um marco sem observar objetos
     * recriados a cada atualização do relógio.
     */
    useEffect(() => {
        const key = `${milestone.next.months}-${milestone.next.label}`;

        if (previousMilestoneRef.current === null) {
            previousMilestoneRef.current = key;
            return;
        }

        if (previousMilestoneRef.current !== key && isOpen) {
            setCelebrationData({
                completed: milestone.previous,
                next: milestone.next,
            });

            setIsCelebrating(true);

            if (celebrationTimeoutRef.current) {
                clearTimeout(celebrationTimeoutRef.current);
            }

            celebrationTimeoutRef.current = setTimeout(() => {
                setIsCelebrating(false);
            }, 4400);
        }

        previousMilestoneRef.current = key;
    }, [
        milestone.next.months,
        milestone.next.label,
        milestone.previous.months,
        milestone.previous.label,
        isOpen,
    ]);

    useEffect(() => {
        return () => {
            if (celebrationTimeoutRef.current) {
                clearTimeout(celebrationTimeoutRef.current);
            }
        };
    }, []);

    const countdown = useMemo(() => {
        const difference = Math.max(
            0,
            Math.floor(
                (milestone.nextDate.getTime() - now.getTime()) / 1000,
            ),
        );

        return {
            days: Math.floor(difference / 86_400),
            hours: Math.floor((difference % 86_400) / 3600),
            minutes: Math.floor((difference % 3600) / 60),
            seconds: difference % 60,
        };
    }, [milestone.nextDate, now]);

    const percentage = Math.round(milestone.progress);

    const exactProgress = getExactProgress(
        now,
        milestone.previousDate,
        milestone.nextDate,
    );

    const routeProgress = Math.max(0, Math.min(1, exactProgress));

    const planePosition = useMemo(
        () => getRoutePoint(routeProgress),
        [routeProgress],
    );

    return (
        <motion.div
            key="next-chapter"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            {/* FUNDO NOTURNO: gradientes estáticos e leves */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="absolute -right-28 -top-32 h-80 w-80 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(128,100,255,0.17) 0%, rgba(128,100,255,0.06) 42%, transparent 72%)",
                    }}
                />

                <div
                    className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(168,117,255,0.13) 0%, rgba(168,117,255,0.04) 42%, transparent 72%)",
                    }}
                />

                {STAR_POSITIONS.map(([x, y], index) => (
                    <span
                        key={index}
                        className="absolute h-1 w-1 rounded-full bg-[#cbb8ff]/60"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    />
                ))}
            </div>

            <SideRibbon
                text="Próximo capítulo"
                bg_color="bg-[#a875ff]/10"
            />

            <div className="relative z-10 flex h-full flex-col px-6 pb-6 pr-14 pt-7">
                {/* CABEÇALHO */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.1, duration: 0.35 }}
                >
                    <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#a875ff]/30 bg-[#a875ff]/10 text-[#cbb8ff]">
                            <Plane size={16} />
                        </span>

                        <span className="text-[9px] font-black uppercase tracking-[0.24em] text-[#cbb8ff]">
                            Passaporte da nossa história
                        </span>
                    </div>

                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-black leading-[0.95] tracking-tight">
                                O próximo
                                <br />
                                capítulo<span className="text-[#a875ff]">.</span>
                            </h1>

                            <p className="mt-3 max-w-[255px] text-xs leading-relaxed text-[#fff3c7]/55">
                                Ainda temos tantos destinos para viver juntos.
                            </p>
                        </div>

                        <div className="mb-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#a875ff]/25 bg-[#a875ff]/10">
                            <Heart
                                size={25}
                                fill="#a875ff"
                                className="text-[#a875ff]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* BILHETE DE EMBARQUE */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.2, duration: 0.4 }}
                    className="relative mt-5 overflow-hidden rounded-[22px] border border-[#c4aaff]/25 bg-[#171536]"
                >
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#a875ff]/10 to-transparent" />

                    <div className="relative flex items-center justify-between border-b border-dashed border-[#fff3c7]/15 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <Ticket size={15} className="text-[#c4aaff]" />

                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#fff3c7]/55">
                                Bilhete para o futuro
                            </span>
                        </div>

                        <span className="rounded-full border border-[#a875ff]/25 bg-[#a875ff]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#cbb8ff]">
                            {milestone.next.label}
                        </span>
                    </div>

                    <div className="relative px-4 pb-4 pt-3">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#fff3c7]/40">
                                    Tempo até a próxima meta
                                </p>

                                <div className="mt-1.5 flex items-baseline gap-1.5">
                                    <span className="text-4xl font-black leading-none tracking-tight tabular-nums">
                                        {countdown.days}
                                    </span>

                                    <span className="text-xs font-bold text-[#fff3c7]/55">
                                        dias
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {[
                                    { value: countdown.hours, label: "h" },
                                    { value: countdown.minutes, label: "m" },
                                    { value: countdown.seconds, label: "s" },
                                ].map((unit) => (
                                    <div
                                        key={unit.label}
                                        className="flex min-w-[38px] flex-col items-center rounded-xl border border-[#fff3c7]/10 bg-[#0b0b2b]/60 px-2 py-2"
                                    >
                                        <span className="font-mono text-sm font-black tabular-nums">
                                            {String(unit.value).padStart(2, "0")}
                                        </span>

                                        <span className="mt-0.5 text-[8px] font-black uppercase text-[#a875ff]">
                                            {unit.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="my-4 h-px bg-[#fff3c7]/10" />

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#a875ff]/10 text-[#c4aaff]">
                                    <CalendarDays size={15} />
                                </span>

                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#fff3c7]/40">
                                        Data de chegada
                                    </p>

                                    <p className="mt-0.5 text-sm font-black tracking-wide">
                                        {formatDate(milestone.nextDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#fff3c7]/35">
                                    Jornada atual
                                </p>

                                <p className="mt-1 text-sm font-black text-[#c4aaff]">
                                    {percentage}%
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#8064ff] to-[#c4aaff] transition-[width] duration-500 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* ROTA DOS MARCOS */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.4 }}
                    className="mt-5 flex min-h-0 flex-1 flex-col"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#c4aaff]">
                                Nossa rota
                            </p>

                            <h2 className="mt-1 text-base font-black">
                                Um destino de cada vez
                            </h2>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#fff3c7]/40">
                            <Clock3 size={12} className="text-[#a875ff]" />
                            <span>Em andamento</span>
                        </div>
                    </div>

                    <div className="relative min-h-[118px] flex-1">
                        <svg
                            viewBox="0 0 320 100"
                            preserveAspectRatio="none"
                            className="absolute inset-0 h-full w-full overflow-visible"
                        >
                            <defs>
                                <linearGradient
                                    id="future-route-gradient"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                >
                                    <stop offset="0%" stopColor="#8064ff" />
                                    <stop offset="100%" stopColor="#c4aaff" />
                                </linearGradient>
                            </defs>

                            <path
                                d={ROUTE_PATH}
                                fill="none"
                                stroke="#a875ff"
                                strokeWidth="5"
                                strokeLinecap="round"
                                opacity="0.1"
                            />

                            <path
                                d={ROUTE_PATH}
                                fill="none"
                                stroke="rgba(255,243,199,0.17)"
                                strokeWidth="1.8"
                                strokeDasharray="3 5"
                                strokeLinecap="round"
                            />

                            <motion.path
                                d={ROUTE_PATH}
                                fill="none"
                                stroke="url(#future-route-gradient)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                pathLength={1}
                                initial={reduceMotion ? false : { pathLength: 0 }}
                                animate={{ pathLength: routeProgress }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.4,
                                    ease: "linear",
                                }}
                            />
                        </svg>

                        {/* PARTIDA */}
                        <div
                            className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fff3c7]/20 bg-[#242044]"
                            style={{ left: "5.625%", top: "67%" }}
                        >
                            <Check size={12} className="text-[#fff3c7]/70" />
                        </div>

                        {/* AVIÃO */}
                        <motion.div
                            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                            animate={{
                                left: `${(planePosition.x / 320) * 100}%`,
                                top: `${planePosition.y}%`,
                            }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.4,
                                ease: "linear",
                            }}
                        >
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#d9ccff]/40 bg-[#a875ff] text-[#0b0b2b] shadow-[0_0_14px_rgba(168,117,255,0.25)]">
                                <span className="absolute inset-[-4px] rounded-full border border-[#a875ff]/25" />

                                <Plane
                                    size={15}
                                    fill="currentColor"
                                    className="-rotate-12"
                                />
                            </div>
                        </motion.div>

                        {/* DESTINO */}
                        <div
                            className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#a875ff]/40 bg-[#a875ff]/15 text-[#cbb8ff]"
                            style={{ left: "94.375%", top: "67%" }}
                        >
                            <Star size={13} fill="currentColor" />
                        </div>

                        {/* ETIQUETAS */}
                        <div className="absolute bottom-0 left-0 flex max-w-[42%] items-center gap-2">
                            <div className="h-7 w-0.5 rounded-full bg-[#fff3c7]/25" />

                            <div>
                                <p className="text-[9px] font-black uppercase text-[#fff3c7]/70">
                                    Onde começou
                                </p>

                                <p className="mt-0.5 text-[8px] text-[#fff3c7]/35">
                                    {formatDate(START_DATE)}
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-0 flex max-w-[42%] items-center gap-2">
                            <div>
                                <p className="text-[9px] font-black uppercase text-[#fff3c7]/70">
                                    Próxima parada
                                </p>

                                <p className="mt-0.5 text-end text-[8px] text-[#fff3c7]/35">
                                    {formatDate(milestone.nextDate)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* MARCOS COMO DESTINOS */}
                    <div className="mt-2">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#fff3c7]/40">
                                Destinos no nosso mapa
                            </p>

                            <p className="text-[9px] font-bold text-[#a875ff]">
                                {MILESTONES.length} marcos
                            </p>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {MILESTONES.map((item, index) => {
                                const date = addMonths(START_DATE, item.months);
                                const completed = date <= now;
                                const next =
                                    item.months === milestone.next.months;

                                return (
                                    <div
                                        key={item.months}
                                        className={`
                                            relative min-w-[82px] flex-1
                                            overflow-hidden rounded-xl border
                                            px-2 py-2.5
                                            ${
                                                next
                                                    ? "border-[#a875ff]/50 bg-[#a875ff]/10"
                                                    : completed
                                                      ? "border-[#fff3c7]/10 bg-[#fff3c7]/[0.035]"
                                                      : "border-[#fff3c7]/[0.07] bg-[#15153d]/45"
                                            }
                                        `}
                                    >
                                        {next && (
                                            <div className="absolute inset-x-0 top-0 h-0.5 bg-[#a875ff]" />
                                        )}

                                        <div className="flex items-center justify-between gap-1">
                                            <span
                                                className={`
                                                    text-[8px] font-black uppercase tracking-wider
                                                    ${
                                                        next
                                                            ? "text-[#cbb8ff]"
                                                            : completed
                                                              ? "text-[#fff3c7]/55"
                                                              : "text-[#fff3c7]/30"
                                                    }
                                                `}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            {completed ? (
                                                <Check
                                                    size={11}
                                                    className="text-[#cbb8ff]"
                                                />
                                            ) : next ? (
                                                <Plane
                                                    size={11}
                                                    className="text-[#cbb8ff]"
                                                />
                                            ) : (
                                                <Star
                                                    size={10}
                                                    className="text-[#fff3c7]/25"
                                                />
                                            )}
                                        </div>

                                        <p
                                            className={`
                                                mt-2 text-[10px] font-black leading-tight
                                                ${
                                                    next
                                                        ? "text-[#fff3c7]"
                                                        : completed
                                                          ? "text-[#fff3c7]/65"
                                                          : "text-[#fff3c7]/40"
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </p>

                                        <p className="mt-1 text-[8px] font-medium text-[#fff3c7]/30">
                                            {formatDate(date)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* RODAPÉ */}
                <div className="mt-1 flex items-center justify-center gap-2 pt-1">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a875ff]/20" />

                    <Heart
                        size={10}
                        fill="#a875ff"
                        className="text-[#a875ff]/70"
                    />

                    <p className="whitespace-nowrap text-[8px] font-black uppercase tracking-[0.2em] text-[#fff3c7]/30">
                        Nosso melhor destino é juntos
                    </p>

                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a875ff]/20" />
                </div>
            </div>

            {/* CELEBRAÇÃO DE UMA META */}
            <AnimatePresence>
                {isCelebrating && celebrationData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0b0b2b]/[0.97] px-7"
                    >
                        {/* Sem blur grande nem partículas excessivas */}
                        {!reduceMotion &&
                            [...Array(8)].map((_, index) => {
                                const angle = (index / 8) * Math.PI * 2;
                                const distance = 65 + (index % 3) * 22;

                                return (
                                    <motion.span
                                        key={index}
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            opacity: 0,
                                            scale: 0.5,
                                        }}
                                        animate={{
                                            x: Math.cos(angle) * distance,
                                            y: Math.sin(angle) * distance,
                                            opacity: [0, 0.8, 0],
                                            scale: [0.5, 1, 0.4],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.1 + (index % 4) * 0.04,
                                            ease: "easeOut",
                                        }}
                                        className="absolute h-1.5 w-1.5 rounded-full bg-[#fff3c7]"
                                    />
                                );
                            })}

                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 12, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.4,
                                ease: "easeOut",
                            }}
                            className="relative z-10 flex w-full max-w-xs flex-col items-center text-center"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#fff3c7]/25 bg-[#fff3c7] text-[#0b0b2b]">
                                <Heart size={34} fill="currentColor" />
                            </div>

                            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#c4aaff]">
                                Novo destino alcançado
                            </p>

                            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight">
                                {celebrationData.completed.label}
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-[#fff3c7]/55">
                                Mais uma lembrança para guardar e mais um capítulo da nossa história.
                            </p>

                            <div className="mt-7 w-full rounded-2xl border border-[#a875ff]/25 bg-[#171536] p-4">
                                <div className="flex items-center justify-center gap-2 text-[#c4aaff]">
                                    <Plane size={15} />

                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                                        Próxima parada
                                    </span>
                                </div>

                                <p className="mt-2 text-xl font-black text-[#fff3c7]">
                                    {celebrationData.next.label}
                                </p>

                                <p className="mt-1 text-[10px] text-[#fff3c7]/40">
                                    A próxima aventura já nos espera.
                                </p>
                            </div>

                            <Sparkles
                                size={20}
                                className="mt-6 text-[#a875ff]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
