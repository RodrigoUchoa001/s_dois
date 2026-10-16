
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

/**
 * Calcula a posição do avião diretamente na curva quadrática SVG.
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

    // Atualiza o relógio somente enquanto a tela está aberta.
    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    // Detecta a conclusão de uma meta.
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
            transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: "easeOut",
            }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            {/* Fundo noturno discreto */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="absolute -right-28 -top-32 h-80 w-80 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(128,100,255,0.14) 0%, rgba(128,100,255,0.04) 42%, transparent 72%)",
                    }}
                />

                <div
                    className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(168,117,255,0.10) 0%, rgba(168,117,255,0.03) 42%, transparent 72%)",
                    }}
                />

                {STAR_POSITIONS.map(([x, y], index) => (
                    <span
                        key={index}
                        className="absolute h-1 w-1 rounded-full bg-[#cbb8ff]/45"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    />
                ))}
            </div>

            <SideRibbon
                text="Próximo capítulo"
                bg_color="bg-[#a875ff]/10"
            />

            <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-5 pr-14 pt-7 sm:px-6 sm:pb-6 sm:pr-14 scrollbar-none">
                {/* Cabeçalho */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: reduceMotion ? 0 : 0.1,
                        duration: 0.35,
                    }}
                    className="shrink-0"
                >
                    <div className="flex items-end justify-between pt-7 pb-6">
                        <div>
                            <p className="text-sm font-medium uppercase leading-[0.95] tracking-[0.22em] text-white">
                                próximo capítulo
                            </p>
                            <h1 className="mt-2 text-2xl font-bold leading-[0.95] text-[#c4aaff] sm:text-3xl">
                                Contagem regressiva para 
                                <br />
                                {milestone.next.label} 
                            </h1>                           

                        </div>
                    </div>
                </motion.div>

                {/* Meta em destaque */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: reduceMotion ? 0 : 0.2,
                        duration: 0.4,
                    }}
                    className="relative mt-6 shrink-0 rounded-2xl border border-[#a875ff]/20 bg-[#151436]/80 px-5 py-5"
                >
                    <div className="flex items-center gap-2 text-[#c4aaff]">
                        <Plane size={15} strokeWidth={1.8} />

                        <p className="text-[9px] font-bold uppercase tracking-[0.22em]">
                            Nossa próxima meta
                        </p>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-4xl font-black leading-none tracking-tight text-[#fff3c7] sm:text-5xl">
                                {milestone.next.label}
                            </h2>

                            <p className="mt-2 text-xs text-[#fff3c7]/50">
                                {formatDate(milestone.nextDate)}
                            </p>
                        </div>

                        
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                            <div
                                className="h-full rounded-full bg-[#a875ff] transition-[width] duration-500 ease-out"
                                style={{ width: `${percentage === 100 ? 99 : percentage}%` }}
                            />
                        </div>

                        <span className="text-xs font-bold tabular-nums text-[#c4aaff]">
                            {percentage===100 ? "99%" : `${percentage}%`}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#fff3c7]/[0.08] pt-3">
                        <p className="text-[10px] text-[#fff3c7]/40">
                            Tempo até a nossa meta
                        </p>

                        <div className="flex shrink-0 items-center gap-1.5 font-mono text-xs font-bold tabular-nums text-[#fff3c7]/70">
                            {countdown.days > 0 && `${String(countdown.days).padStart(2, "0")}d `}
                            {countdown.days > 0 && <span className="text-[#fff3c7]/20">:</span>}
                            {countdown.hours > 0 && `${String(countdown.hours).padStart(2, "0")}h `}
                            {countdown.hours > 0 && <span className="text-[#fff3c7]/20">:</span>}
                            {countdown.minutes > 0 && `${String(countdown.minutes).padStart(2, "0")}m `}
                            {countdown.minutes > 0 && <span className="text-[#fff3c7]/20">:</span>}
                            <span>
                                {String(countdown.seconds).padStart(2, "0")}s
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-1" />

                {/* Rota do avião */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: reduceMotion ? 0 : 0.3,
                        duration: 0.4,
                    }}
                    className="mt-6 flex min-h-[165px] shrink-0 flex-col"
                >

                    <div className="relative min-h-[125px] flex-1">
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
                                strokeWidth="4"
                                strokeLinecap="round"
                                opacity="0.09"
                            />

                            <path
                                d={ROUTE_PATH}
                                fill="none"
                                stroke="rgba(255,243,199,0.18)"
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
                                initial={
                                    reduceMotion ? false : { pathLength: 0 }
                                }
                                animate={{ pathLength: routeProgress }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.4,
                                    ease: "linear",
                                }}
                            />
                        </svg>

                        {/* Ponto de partida */}
                        <div
                            className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fff3c7]/20 bg-[#242044]"
                            style={{ left: "5.625%", top: "67%" }}
                        >
                            <Check
                                size={12}
                                className="text-[#fff3c7]/70"
                            />
                        </div>

                        {/* Avião */}
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
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#d9ccff]/40 bg-[#a875ff] text-[#0b0b2b]">
                                <span className="absolute inset-[-4px] rounded-full border border-[#a875ff]/25" />

                                <Plane
                                    size={15}
                                    fill="currentColor"
                                    className="-rotate-12"
                                />
                            </div>
                        </motion.div>

                        {/* Destino */}
                        <div
                            className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#a875ff]/40 bg-[#a875ff]/15 text-[#cbb8ff]"
                            style={{ left: "94.375%", top: "67%" }}
                        >
                            <Sparkles size={13} />
                        </div>

                        {/* Legendas da rota */}
                        <div className="absolute bottom-0 left-0 flex max-w-[45%] items-center gap-2">
                            <div className="h-7 w-0.5 rounded-full bg-[#fff3c7]/25" />

                            <div>
                                <p className="text-[9px] font-bold uppercase text-[#fff3c7]/70">
                                    {milestone.previous.label}
                                </p>

                                <p className="mt-0.5 text-[8px] text-[#fff3c7]/35">
                                    {formatDate(START_DATE)}
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-0 flex max-w-[45%] items-center gap-2">
                            <div>
                                <p className="text-right text-[9px] font-bold uppercase text-[#fff3c7]/70">
                                    {milestone.next.label}
                                </p>

                                <p className="mt-0.5 text-right text-[8px] text-[#fff3c7]/35">
                                    {formatDate(milestone.nextDate)}
                                </p>
                            </div>

                            <div className="h-7 w-0.5 rounded-full bg-[#a875ff]/50" />
                        </div>
                    </div>
                </motion.div>

                {/* Linha do tempo */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: reduceMotion ? 0 : 0.4,
                        duration: 0.35,
                    }}
                    className="mt-5 shrink-0"
                >
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#fff3c7]/45">
                            Nossas metas
                        </p>
                    </div>

                    <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="relative min-w-max px-1">
                            {/* Linha conectando todos os círculos */}
                            <div
                                aria-hidden="true"
                                className="absolute left-[34px] right-[34px] top-[36px] h-px bg-[#fff3c7]/15"
                            />

                            <div className="relative flex items-start">
                                {MILESTONES.map((item) => {
                                    const date = addMonths(
                                        START_DATE,
                                        item.months,
                                    );

                                    const completed = date <= now;
                                    const next =
                                        item.months === milestone.next.months;

                                    return (
                                        <div
                                            key={item.months}
                                            className="flex w-[68px] shrink-0 flex-col items-center"
                                        >
                                            {/* Meta acima do círculo */}
                                            <span
                                                className={`mb-3 h-4 whitespace-nowrap text-center text-[10px] font-bold ${
                                                    next
                                                        ? "text-[#c4aaff]"
                                                        : completed
                                                          ? "text-[#fff3c7]/55"
                                                          : "text-[#fff3c7]/35"
                                                }`}
                                            >
                                                {item.label}
                                            </span>

                                            {/* Círculo da meta */}
                                            <div
                                                className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                                                    next
                                                        ? "border-[#cbb8ff] bg-[#a875ff] ring-4 ring-[#a875ff]/15"
                                                        : completed
                                                          ? "border-[#c4aaff]/60 bg-[#a875ff]/60"
                                                          : "border-[#fff3c7]/25 bg-[#0b0b2b]"
                                                }`}
                                                aria-label={`${item.label}${
                                                    next
                                                        ? ", próxima meta"
                                                        : completed
                                                          ? ", concluída"
                                                          : ", futura"
                                                }`}
                                            >
                                                {completed && !next && (
                                                    <Check size={10} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rodapé */}
                <div className="mt-3 flex shrink-0 items-center justify-center gap-2 pb-1 pt-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a875ff]/20" />

                    <Heart
                        size={10}
                        fill="#a875ff"
                        className="text-[#a875ff]/70"
                    />

                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a875ff]/20" />
                </div>
            </div>

            {/* Celebração de uma meta */}
            <AnimatePresence>
                {isCelebrating && celebrationData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0b0b2b]/[0.97] px-7"
                    >
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

                            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c4aaff]">
                                Novo destino alcançado
                            </p>

                            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight">
                                {celebrationData.completed.label}
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-[#fff3c7]/55">
                                Mais uma lembrança para guardar e mais um
                                capítulo da nossa história.
                            </p>

                            <div className="mt-7 w-full rounded-2xl border border-[#a875ff]/25 bg-[#171536] p-4">
                                <div className="flex items-center justify-center gap-2 text-[#c4aaff]">
                                    <Plane size={15} />

                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
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
