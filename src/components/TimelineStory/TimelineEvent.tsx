import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
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

export function TimelineEvent({
    event,
    index,
}: Props) {
    const isLeft = index % 2 === 0;

    return (
        <div className="relative grid grid-cols-2">
            {/* Espaço esquerdo */}
            <div
                className={`flex ${
                    isLeft
                        ? "justify-end pr-8"
                        : "justify-end pr-8"
                }`}
            >
                {isLeft && (
                    <EventCard
                        event={event}
                        index={index}
                    />
                )}
            </div>

            {/* Espaço direito */}
            <div
                className={`flex ${
                    !isLeft
                        ? "justify-start pl-8"
                        : "justify-start pl-8"
                }`}
            >
                {!isLeft && (
                    <EventCard
                        event={event}
                        index={index}
                    />
                )}
            </div>

            {/* Ponto central */}
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
                className="absolute left-1/2 top-8 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-[#111a35] bg-[#a875ff] shadow-[4px_4px_0_#111a35]"
            >
                <Heart
                    size={18}
                    strokeWidth={3}
                    fill="white"
                    className="text-white"
                />
            </motion.div>
        </div>
    );
}

function EventCard({
    event,
    index,
}: {
    event: TimelineEventData;
    index: number;
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
                    x: index % 2 === 0 ? -50 : 50,
                    y: 20,
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
                    duration: 0.6,
                    ease: "easeOut",
                }}
                className="w-full max-w-[280px]"
            >
                {/* Data */}
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#111a35]/60">
                    {date}
                </p>

                {/* Card */}
                <motion.div
                    whileHover={{
                        y: -5,
                        rotate: index % 2 === 0 ? -1 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    className="overflow-hidden rounded-[24px] border-[3px] border-[#111a35] bg-[#111a35] shadow-[7px_7px_0_#8da2c4]"
                >
                    <motion.button
                        type="button"
                        onClick={() => setIsImageOpen(true)}
                        className={`relative overflow-hidden bg-[#222] aspect-[${event.imageAspect}]`}
                        aria-label={`Abrir imagem: ${event.imageDescription}`}
                    >
                        <motion.img
                            layoutId={`timeline-image-${index}`}
                            src={event.image}
                            alt={event.imageDescription}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.button>

                    {/* Conteúdo */}
                    <div className="p-5 text-left">
                        <h2 className="text-xl font-black leading-tight text-white">
                            {event.imageDescription}
                        </h2>

                        <p className="mt-3 text-sm font-medium leading-relaxed text-white/70">
                            {event.eventDescription}
                        </p>
                    </div>
                </motion.div>
            </motion.article>

            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <motion.img
                            layoutId={`timeline-image-${index}`}
                            src={event.image}
                            alt={event.imageDescription}
                            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
