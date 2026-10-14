
import { motion } from "motion/react";
import { CalendarDays, Sparkles } from "lucide-react";
import { couple } from "../../../data/couple";
import { TimelineEvent } from "./TimelineEvent";
import { StoryHeader } from "../StoryHeader";

export function TimelineStory() {
    const timeline = couple.wrapped.timeline;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#0b0b2b] px-6 pb-16 pt-8 text-[#fff3c7] scrollbar-none"
        >
            {/* Iluminação estática: evita blur animado e caro */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(128,100,255,0.15) 0%, rgba(128,100,255,0.05) 40%, transparent 72%)",
                }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(128,100,255,0.12) 0%, rgba(128,100,255,0.04) 40%, transparent 72%)",
                }}
            />

            {/* Detalhes decorativos estáticos */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[12%] top-[12%]"
            >
                <Sparkles
                    size={15}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[16%] top-[32%]"
            >
                <Sparkles
                    size={11}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[18%] right-[10%]"
            >
                <Sparkles
                    size={13}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </div>

            <div className="relative">
                <StoryHeader text="Nossa história" />

                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mt-10"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 rotate-[-8deg] items-center justify-center rounded-[14px] border-2 border-[#a875ff]/30 bg-[#a875ff]/10">
                            <CalendarDays
                                size={21}
                                className="text-[#a875ff]"
                            />
                        </div>

                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                                Nossa retrospectiva
                            </p>

                            <p className="mt-0.5 text-xs font-medium text-[#fff3c7]/45">
                                {timeline.events.length} momentos especiais
                            </p>
                        </div>
                    </div>

                    <h1 className="max-w-sm text-[clamp(3rem,14vw,4.5rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-[#fff3c7]">
                        {timeline.title}
                    </h1>

                    <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-[#fff3c7]/55">
                        {timeline.description}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative mt-14">
                    {/* Linha central */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                            delay: 0.45,
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        style={{
                            transformOrigin: "top",
                            willChange: "transform",
                        }}
                        className="absolute bottom-0 left-1/2 top-0 z-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#a875ff] via-[#a875ff]/50 to-[#a875ff]/10"
                    />

                    <div className="relative flex flex-col gap-14">
                        {timeline.events.map((event, index) => (
                            <TimelineEvent
                                key={`${event.date.day}-${event.date.month}-${event.date.year}-${index}`}
                                event={event}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Final */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: Math.min(
                            0.7 + timeline.events.length * 0.08,
                            1.5
                        ),
                        duration: 0.4,
                    }}
                    className="mt-14 flex flex-col items-center text-center"
                >
                    <div className="mb-4 h-px w-16 bg-[#a875ff]/50" />

                    <Sparkles
                        size={18}
                        fill="#a875ff"
                        className="mb-3 text-[#a875ff]"
                    />

                    <p className="max-w-xs text-sm font-medium leading-relaxed text-[#fff3c7]/50">
                        E essa história ainda está só começando.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
