import { AnimatePresence, motion } from "motion/react";
import { Heart, Maximize2 } from "lucide-react";
import { useState } from "react";

type TimelineEventData = {
    date: {
        day: number;
        month: number;
        year: number;
    };

    image: string;
    imageAspect: string;
    imageDescription: string;
    eventDescription: string;
};

type Props = {
    event: TimelineEventData;
    index: number;
};

const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
];

export function TimelineEvent({ event, index }: Props) {
    const isLeft = index % 2 === 0;

    return (
        <div className="relative grid min-h-[150px] grid-cols-2">
            {/* Evento à esquerda */}
            <div className="flex justify-end pr-7">
                {isLeft && (
                    <EventCard
                        event={event}
                        index={index}
                        align="right"
                    />
                )}
            </div>

            {/* Evento à direita */}
            <div className="flex justify-start pl-7">
                {!isLeft && (
                    <EventCard
                        event={event}
                        index={index}
                        align="left"
                    />
                )}
            </div>

            {/* Marcador central */}
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                whileInView={{
                    scale: 1,
                    opacity: 1,
                }}
                viewport={{
                    once: true,
                    margin: "-100px",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                }}
                className="absolute left-1/2 top-5 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#0b0b2b] bg-[#a875ff] shadow-[0_0_20px_rgba(168,117,255,0.35)]"
            >
                <Heart
                    size={17}
                    strokeWidth={2.5}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>
        </div>
    );
}

function EventCard({
    event,
    index,
    align,
}: {
    event: TimelineEventData;
    index: number;
    align: "left" | "right";
}) {
    const date = `${String(event.date.day).padStart(2, "0")} ${
        months[event.date.month - 1]
    } ${event.date.year}`;

    const [isImageOpen, setIsImageOpen] = useState(false);

    return (
        <>
            <motion.article
                initial={{
                    opacity: 0,
                    x: align === "right" ? -35 : 35,
                    y: 15,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    margin: "-100px",
                }}
                transition={{
                    duration: 0.55,
                    ease: "easeOut",
                }}
                className="w-full max-w-[250px] z-30"
            >
                {/* Data */}
                <div
                    className={`mb-3 flex items-center gap-2 ${
                        align === "right"
                            ? "justify-end text-right"
                            : "justify-start text-left"
                    }`}
                >
                    <div className="h-[2px] w-5 bg-[#a875ff]" />

                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fff3c7]/65">
                        {date}
                    </p>
                </div>

                {/* Card */}
                <motion.div
                    whileHover={{
                        y: -4,
                        rotate: align === "right" ? -1 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    className="overflow-hidden rounded-[22px] border-2 border-[#fff3c7]/10 bg-white/[0.045] shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-sm"
                >
                    {/* Imagem */}
                    <motion.button
                        type="button"
                        onClick={() => setIsImageOpen(true)}
                        className={`relative block w-full overflow-hidden bg-[#11112f] aspect-[${event.imageAspect}]`}
                        aria-label={`Abrir imagem: ${event.imageDescription}`}
                    >
                        <motion.img
                            layoutId={`timeline-image-${index}`}
                            src={event.image}
                            alt={event.imageDescription}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b2b]/50 via-transparent to-transparent" />

                        <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#fff3c7]/15 bg-[#0b0b2b]/60 backdrop-blur-md">
                            <Maximize2
                                size={12}
                                className="text-[#fff3c7]/75"
                            />
                        </div>
                    </motion.button>

                    {/* Conteúdo */}
                    <div className="p-4">
                        <h2 className="text-base font-black leading-tight text-[#fff3c7]">
                            {event.imageDescription}
                        </h2>

                        <p className="mt-2 text-xs font-medium leading-relaxed text-[#fff3c7]/55">
                            {event.eventDescription}
                        </p>
                    </div>
                </motion.div>
            </motion.article>

            {/* Imagem ampliada */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05051b]/95 p-4 backdrop-blur-sm"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <motion.img
                            layoutId={`timeline-image-${index}`}
                            src={event.image}
                            alt={event.imageDescription}
                            className="max-h-[90vh] max-w-full rounded-[24px] border-2 border-[#fff3c7]/10 object-contain shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}