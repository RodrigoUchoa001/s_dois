
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Heart, RotateCw, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";

const COLORS = [
    "#8064ff",
    "#f5eddf",
    "#a875ff",
    "#e8c98b",
    "#6047c9",
    "#fff4d6",
];

const BACKGROUND = "#09091f";
const CREAM = "#fff4d6";
const GOLD = "#e8c98b";
const PURPLE = "#a875ff";

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 145;
const INNER_RADIUS = 30;

function polarToCartesian(
    cx: number,
    cy: number,
    radius: number,
    angle: number,
) {
    const radians = (angle * Math.PI) / 180;

    return {
        x: cx + radius * Math.cos(radians),
        y: cy + radius * Math.sin(radians),
    };
}

function createSectorPath(
    startAngle: number,
    endAngle: number,
) {
    const start = polarToCartesian(
        CENTER,
        CENTER,
        RADIUS,
        startAngle,
    );

    const end = polarToCartesian(
        CENTER,
        CENTER,
        RADIUS,
        endAngle,
    );

    return [
        `M ${CENTER} ${CENTER}`,
        `L ${start.x} ${start.y}`,
        `A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`,
        "Z",
    ].join(" ");
}

function normalizeDegrees(degrees: number) {
    return ((degrees % 360) + 360) % 360;
}

export function DateNightRouletteStory() {
    const prefersReducedMotion = useReducedMotion();

    const datePlaces = couple.dateNight.places;

    const places = useMemo(
        () => datePlaces.map((place) => place.trim()).filter(Boolean),
        [],
    );

    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [spinId, setSpinId] = useState(0);

    const segmentAngle = places.length > 0 ? 360 / places.length : 360;

    const sectors = useMemo(
        () =>
            places.map((place, index) => {
                // O primeiro setor fica centralizado no topo.
                const centerAngle = -90 + index * segmentAngle;

                return {
                    place,
                    index,
                    centerAngle,
                    startAngle: centerAngle - segmentAngle / 2,
                    endAngle: centerAngle + segmentAngle / 2,
                    color: COLORS[index % COLORS.length],
                    textColor:
                        COLORS[index % COLORS.length] === "#f5eddf" ||
                        COLORS[index % COLORS.length] === "#e8c98b" ||
                        COLORS[index % COLORS.length] === "#fff4d6"
                            ? BACKGROUND
                            : CREAM,
                };
            }),
        [places, segmentAngle],
    );

    function spinWheel() {
        if (isSpinning || places.length < 2) return;

        setSelectedPlace(null);
        setIsSpinning(true);

        // Sorteia primeiro o resultado; a animação terminará nesse setor.
        const winnerIndex = Math.floor(Math.random() * places.length);
        const targetRotation = normalizeDegrees(
            -(winnerIndex * segmentAngle),
        );

        const currentRotation = normalizeDegrees(rotation);
        const correction = normalizeDegrees(
            targetRotation - currentRotation,
        );

        // Várias voltas completas deixam o giro mais natural.
        const fullTurns = 5 + Math.floor(Math.random() * 3);
        const finalRotation =
            rotation + fullTurns * 360 + correction;

        setRotation(finalRotation);
        setSpinId((previous) => previous + 1);

        // O tempo corresponde à duração da animação abaixo.
        window.setTimeout(
            () => {
                setIsSpinning(false);
                setSelectedPlace(places[winnerIndex]);
            },
            prefersReducedMotion ? 0 : 4600,
        );
    }

    return (
        <section className="absolute inset-x-0 bottom-0 top-7 flex flex-col items-center overflow-y-auto overflow-x-hidden scrollbar-none bg-[#09091f] px-5 pb-8 pt-8 text-[#fff4d6] sm:justify-center sm:py-10">
            {/* Fundo decorativo estático: evita blur e animações desnecessárias. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="absolute -left-32 top-[15%] h-72 w-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(128,100,255,0.15), transparent 70%)",
                    }}
                />
                <div
                    className="absolute -right-32 bottom-[12%] h-80 w-80 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(232,201,139,0.10), transparent 70%)",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(128,100,255,0.07),transparent_65%)]" />
            </div>

            {/* Cabeçalho */}
            <header className="relative z-10 mb-5 mt-10 flex w-full max-w-md flex-col items-center text-center sm:mb-7">
                <div className="mb-3 flex items-center gap-2 text-[#e8c98b]/80">
                    <Heart size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.32em]">
                        Nosso próximo encontro
                    </span>
                    <Heart size={14} />
                </div>

                <h1 className="max-w-[350px] text-[clamp(2rem,9vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#fff4d6]">
                    Pra onde vamos
                    <br />
                    na próxima?
                </h1>

                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#fff4d6]/55">
                    Uma roleta, duas pessoas e um encontro para lembrar.
                </p>
            </header>

            {/* Roleta */}
            <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center">
                <div className="relative w-full max-w-[360px]">
                    {/* Ponteiro fixo no topo */}
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-[-4px] z-20 -translate-x-1/2"
                    >
                        <svg
                            viewBox="0 0 32 44"
                            className="h-11 w-8 drop-shadow-md"
                        >
                            <path
                                d="M 16 42 L 2 3 Q 16 -3 30 3 Z"
                                fill={CREAM}
                                stroke={GOLD}
                                strokeWidth="2"
                            />
                            <circle cx="16" cy="10" r="4" fill={PURPLE} />
                        </svg>
                    </div>

                    {/* Aro externo */}
                    <div className="rounded-full border-[5px] border-[#a875ff]/80 bg-[#17122e] p-1.5 shadow-[0_0_35px_rgba(128,100,255,0.16)] sm:p-2">
                        <div className="relative aspect-square w-full rounded-full border-[3px] border-[#e8c98b]/50 p-0.5">
                            <motion.div
                                key={spinId}
                                className="h-full w-full rounded-full"
                                animate={{ rotate: rotation }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 4.6,
                                    ease: [0.12, 0.72, 0.12, 1],
                                }}
                                style={{
                                    transformOrigin: "50% 50%",
                                }}
                            >
                                <svg
                                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                                    className="h-full w-full overflow-visible"
                                    role="img"
                                    aria-label={`Roleta com ${places.length} opções: ${places.join(", ")}`}
                                >
                                    {sectors.map((sector) => {
                                        const labelPoint = polarToCartesian(
                                            CENTER,
                                            CENTER,
                                            RADIUS * 0.67,
                                            sector.centerAngle,
                                        );

                                        const fontSize =
                                            places.length > 8 ? 9 :
                                            places.length > 6 ? 10 : 12;

                                        return (
                                            <g key={sector.index}>
                                                <path
                                                    d={createSectorPath(
                                                        sector.startAngle,
                                                        sector.endAngle,
                                                    )}
                                                    fill={sector.color}
                                                    stroke={BACKGROUND}
                                                    strokeWidth="2.5"
                                                />

                                                <text
                                                    x={labelPoint.x}
                                                    y={labelPoint.y}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    transform={`rotate(${sector.centerAngle}, ${labelPoint.x}, ${labelPoint.y})`}
                                                    fill={sector.textColor}
                                                    fontSize={fontSize}
                                                    fontWeight="900"
                                                    letterSpacing="0.4"
                                                >
                                                    {sector.place.length > 17
                                                        ? `${sector.place.slice(0, 15)}…`
                                                        : sector.place}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Centro da roleta */}
                                    <circle
                                        cx={CENTER}
                                        cy={CENTER}
                                        r={INNER_RADIUS + 7}
                                        fill={BACKGROUND}
                                        stroke={GOLD}
                                        strokeWidth="2"
                                    />
                                    <circle
                                        cx={CENTER}
                                        cy={CENTER}
                                        r={INNER_RADIUS}
                                        fill="#17122e"
                                    />
                                    <path
                                        d={`M ${CENTER} ${CENTER + 12}
                                            C ${CENTER - 25} ${CENTER - 4},
                                              ${CENTER - 10} ${CENTER - 20},
                                              ${CENTER} ${CENTER - 8}
                                            C ${CENTER + 10} ${CENTER - 20},
                                              ${CENTER + 25} ${CENTER - 4},
                                              ${CENTER} ${CENTER + 12} Z`}
                                        fill={PURPLE}
                                    />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Resultado do sorteio */}
                <div
                    aria-live="polite"
                    className="mt-5 flex min-h-[78px] w-full items-center justify-center text-center"
                >
                    <AnimatePresence mode="wait">
                        {selectedPlace ? (
                            <motion.div
                                key={selectedPlace}
                                initial={
                                    prefersReducedMotion
                                        ? false
                                        : { opacity: 0, y: 10, scale: 0.96 }
                                }
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-1"
                            >
                                <div className="flex items-center gap-2 text-[#e8c98b]">
                                    <Sparkles size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                                        Nosso destino
                                    </span>
                                    <Sparkles size={14} />
                                </div>

                                <h2 className="text-2xl font-black tracking-tight text-[#fff4d6] sm:text-3xl">
                                    {selectedPlace}
                                </h2>

                                <p className="text-xs text-[#fff4d6]/50">
                                    Hoje a escolha foi do destino.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.p
                                key="hint"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-xs text-sm text-[#fff4d6]/55"
                            >
                                {isSpinning
                                    ? "Deixem a sorte decidir..."
                                    : "Girem a roleta e descubram o próximo encontro."}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Botão principal */}
                <button
                    type="button"
                    onClick={spinWheel}
                    disabled={isSpinning || places.length < 2}
                    className="mt-3 flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#fff4d6] px-6 py-4 text-sm font-extrabold text-[#17122e] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                    {isSpinning ? (
                        <>
                            <RotateCw size={18} className="animate-spin" />
                            Girando...
                        </>
                    ) : selectedPlace ? (
                        <>
                            <ArrowRight size={18} />
                            Girar novamente
                        </>
                    ) : (
                        <>
                            <Heart size={17} />
                            Girar roleta
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}
