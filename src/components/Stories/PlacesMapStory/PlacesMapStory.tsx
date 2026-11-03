import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Heart,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";

import { PlacesMap } from "./PlacesMap";
import { couple } from "../../../data/couple";
import { StoryHeader } from "../StoryHeader";

export function PlacesMapStory() {
    const visits = couple.placesMap.visits;

    const [currentIndex, setCurrentIndex] = useState(0);

    const totalVisits = visits.length;
    const currentVisit = visits[currentIndex];

    function nextVisit() {
        setCurrentIndex((current) =>
            Math.min(current + 1, totalVisits - 1)
        );
    }

    function previousVisit() {
        setCurrentIndex((current) =>
            Math.max(current - 1, 0)
        );
    }

    // Seleciona uma visita ao clicar no coração do mapa.
    function selectVisit(visitId: string) {
        const index = visits.findIndex(
            (visit) => visit.id === visitId
        );

        if (index !== -1) {
            setCurrentIndex(index);
        }
    }

    if (totalVisits === 0) {
        return (
            <motion.div
                key="places-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
                    relative flex h-full w-full
                    items-center justify-center
                    overflow-hidden
                    bg-[#080B24]
                    pr-3
                    text-[#F4F0FF]
                "
            >
                <div className="relative z-10 px-8 text-center">
                    <Heart
                        size={28}
                        className="mx-auto mb-4 text-[#C2B5FF]"
                    />

                    <StoryHeader text="Nossa jornada" />

                    <p className="mt-4 text-sm text-[#F4F0FF]/60">
                        Nossas lembranças aparecerão aqui.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            key="places-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
                relative h-full w-full
                overflow-hidden
                bg-[#080B24]
                text-[#F4F0FF]
                pr-3
            "
        >
            {/* MAPA */}

            <div
                className="
                    absolute inset-0
                    z-0
                    overflow-hidden
                "
            >
                <PlacesMap
                    visits={visits}
                    selectedVisit={currentVisit}
                    onSelectVisit={selectVisit}
                />
            </div>

            {/* CAMADA DE SOMBREAMENTO */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-0
                    z-[2]
                "
                style={{
                    background: `
                        linear-gradient(
                            180deg,
                            rgba(8,11,36,0.78) 0%,
                            rgba(8,11,36,0.30) 35%,
                            rgba(8,11,36,0.18) 65%,
                            rgba(8,11,36,0.78) 100%
                        )
                    `,
                }}
            />

            {/* LUZ CENTRAL */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[48%]
                    z-[3]
                    h-64
                    w-64
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(120,100,255,0.12) 0%, rgba(120,100,255,0.04) 40%, transparent 72%)",
                }}
            />

            {/* CONTEÚDO */}

            <div
                className="
                    pointer-events-none
                    relative z-20
                    flex h-full w-full
                    flex-col
                    px-7
                    pb-8
                    pr-14
                    pt-8
                "
            >
                {/* CABEÇALHO */}

                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StoryHeader text="Nossa jornada" />
                </motion.div>

                {/* SUBTÍTULO */}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.5,
                    }}
                    className="mt-5"
                >
                    <div className="flex items-center gap-2">
                        <MapPin
                            size={13}
                            className="text-[#C2B5FF]"
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-[#C2B5FF]/75
                            "
                        >
                            {totalVisits} lugares visitados
                        </span>
                    </div>

                    <p
                        className="
                            mt-2
                            text-sm
                            font-medium
                            tracking-wide
                            text-[#F4F0FF]/75
                        "
                    >
                        {couple.placesMap.subtitle}
                    </p>
                </motion.div>

                {/* ÁREA INFERIOR — CARTÃO DE EMBARQUE */}

                <div
                    className="
                        mt-auto
                        flex min-h-0
                        w-full
                        flex-1
                        flex-col
                        justify-end
                        pb-2
                        pt-6
                    "
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentVisit.id}
                            initial={{
                                opacity: 0,
                                y: 12,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                                pointer-events-auto
                                relative z-30
                                w-full
                                overflow-hidden
                                rounded-[24px]
                                border
                                border-[#A99AFF]/20
                                bg-[#151633]/95
                                px-5
                                py-5
                                shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                            "
                        >
                            {/* REFLEXO */}

                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-8
                                    -top-10
                                    h-24
                                    w-24
                                    rounded-full
                                "
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(120,100,255,0.14), transparent 70%)",
                                }}
                            />

                            {/* TICKET HEADER */}

                            <div
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-between
                                    gap-2
                                    border-b
                                    border-dashed
                                    border-[#A99AFF]/20
                                    pb-3
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#C2B5FF]
                                        "
                                    >
                                        Cartão de embarque
                                    </span>
                                </div>

                                <span
                                    className="
                                        whitespace-nowrap
                                        text-[9px]
                                        font-bold
                                        tracking-wide
                                        text-[#E6C889]
                                    "
                                >
                                    PARADA{" "}
                                    {String(currentIndex + 1).padStart(2, "0")}
                                    /
                                    {String(totalVisits).padStart(2, "0")}
                                </span>
                            </div>

                            {/* TÍTULO DA VISITA */}

                            <div className="relative mt-4">
                                <h2
                                    className="
                                        font-serif
                                        text-xl
                                        font-semibold
                                        leading-snug
                                        text-[#F4F0FF]
                                    "
                                >
                                    {currentVisit.title}
                                </h2>

                                {/* DESTINO */}

                                <div className="mt-4 flex items-center gap-2">
                                    <MapPin
                                        size={12}
                                        className="text-[#E6C889]"
                                    />

                                    <span
                                        className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-[#E6C889]/75
                                        "
                                    >
                                        Destino
                                    </span>
                                </div>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        font-medium
                                        leading-relaxed
                                        text-[#F4F0FF]/80
                                    "
                                >
                                    {currentVisit.location}
                                </p>

                                {/* DESCRIÇÃO */}

                                <p
                                    className="
                                        text-[11px]
                                        leading-relaxed
                                        text-[#F4F0FF]/60
                                        whitespace-pre-line
                                        break-words
                                    "
                                >
                                    {currentVisit.description}
                                </p>
                            </div>

                            {/* FOOTER */}

                            <div
                                className="
                                    relative
                                    mt-5
                                    flex
                                    items-center
                                    justify-between
                                    border-t
                                    border-dashed
                                    border-[#A99AFF]/20
                                    pt-4
                                "
                            >
                                {/* VOLTAR */}

                                {currentIndex > 0 ? (
                                    <button
                                        type="button"
                                        onClick={previousVisit}
                                        aria-label="Voltar para a visita anterior"
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-[#A99AFF]/20
                                            bg-[#7864FF]/10
                                            text-[#C2B5FF]
                                            transition
                                            hover:bg-[#7864FF]/20
                                            active:scale-95
                                        "
                                    >
                                        <ChevronLeft size={17} />
                                    </button>
                                ) : (
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            text-[9px]
                                            font-medium
                                            uppercase
                                            tracking-wider
                                            text-[#F4F0FF]/35
                                        "
                                    >
                                        <Sparkles size={12} />
                                        <div />
                                    </div>
                                )}

                                {/* CONTADOR */}

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        tracking-[0.15em]
                                        text-[#C2B5FF]/60
                                    "
                                >
                                    {String(currentIndex + 1).padStart(2, "0")}
                                    {" — "}
                                    {String(totalVisits).padStart(2, "0")}
                                </span>

                                {/* PRÓXIMA */}

                                {currentIndex < totalVisits - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextVisit}
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            border
                                            border-[#A99AFF]/20
                                            bg-[#7864FF]/15
                                            px-3
                                            py-2
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-[#C2B5FF]
                                            transition
                                            hover:bg-[#7864FF]/25
                                            active:scale-95
                                        "
                                    >
                                        Próxima
                                        <ChevronRight size={14} />
                                    </button>
                                ) : (
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-[#E6C889]/75
                                        "
                                    >
                                        <Heart size={12} />
                                        Final
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* DETALHE DECORATIVO */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotate: -15,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.5,
                }}
                className="
                    pointer-events-none
                    absolute
                    bottom-[24%]
                    right-[7%]
                    z-[4]
                "
            >
                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#E6C889]/20
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