import { motion } from "motion/react";
import { couple } from "../../data/couple";
import { TimelineEvent } from "./TimelineEvent";

export function TimelineStory() {
    const timeline = couple.wrapped.timeline;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full overflow-y-auto bg-[#dce9ff] px-4 py-10 scrollbar-none"
        >
            {/* Cabeçalho */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mx-auto mb-14 max-w-md text-center"
            >
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#111a35]/60">
                    {timeline.events.length} momentos
                </p>

                <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#111a35]">
                    {timeline.title}
                </h1>

                <p className="mt-4 text-base font-medium text-[#111a35]/75">
                    {timeline.description}
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative mx-auto w-full max-w-3xl pb-20">
                {/* Linha central */}
                <div className="absolute bottom-0 left-1/2 top-0 w-[5px] -translate-x-1/2 rounded-full bg-[#111a35]" />

                {/* Eventos */}
                <div className="relative flex flex-col gap-16">
                    {timeline.events.map((event, index) => (
                        <TimelineEvent
                            key={`${event.date.day}-${event.date.month}-${event.date.year}-${index}`}
                            event={event}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}