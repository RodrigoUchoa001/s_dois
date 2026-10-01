import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { couple } from "../../data/couple";
import { X } from "lucide-react";
import { getMinutesTogether } from "../../utils/date";
import { MinutesTogetherStory } from "../MinutesTogetherStory/MinutesTogetherStory";

function useAnimatedNumber(target: number, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let animationFrame: number;
        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out: começa rápido e desacelera no final
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setValue(Math.floor(target * easedProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [target, duration]);

    return value;
}

export function StoriesScreen( { isOpen, closeWrapped }: { isOpen: boolean, closeWrapped: () => void }) {
    const [currentStory, setCurrentStory] = useState(0);

    const totalStories = couple.wrapped ? Object.keys(couple.wrapped).length : 0;
    const storyDuration = 5000;

    
    const minutesTogether = getMinutesTogether();
    const animatedMinutes = useAnimatedNumber(minutesTogether, 1800);

    /*
     * Próxima story
     */
    function nextStory() {
        if (currentStory < totalStories - 1) {
            setCurrentStory((previous) => previous + 1);
        }
    }

    /*
     * Story anterior
     */
    function previousStory() {
        if (currentStory > 0) {
            setCurrentStory((previous) => previous - 1);
        }
    }

    /*
     * Avanço automático
     */
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            nextStory();
        }, storyDuration);

        return () => clearTimeout(timer);
    }, [isOpen, currentStory]);

    /*
     * Fechar com ESC
     */
    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeWrapped();
            }

            if (event.key === "ArrowRight") {
                nextStory();
            }

            if (event.key === "ArrowLeft") {
                previousStory();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, currentStory]);

    
    return (
        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6"
                    >
                        {/* Botão fechar */}
                        <button
                            type="button"
                            onClick={closeWrapped}
                            className="absolute right-5 top-5 z-50 rounded-full p-2 text-white transition hover:bg-white/10"
                            aria-label="Fechar Wrapped"
                        >
                            <X size={32} />
                        </button>

                        {/* Story */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="relative aspect-9/16 w-full max-w-97.5 overflow-hidden rounded-3xl bg-linear-to-br from-[#151515] via-[#24152f] to-[#111111] text-white shadow-2xl"
                        >
                            {/* Barras de progresso */}
                            <div className="absolute left-3 right-3 top-3 z-20 flex gap-1">
                                {Array.from({
                                    length: totalStories,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                                    >
                                        {index < currentStory && (
                                            <div className="h-full w-full bg-white" />
                                        )}

                                        {index === currentStory && (
                                            <motion.div
                                                key={currentStory}
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration:
                                                        storyDuration / 1000,
                                                    ease: "linear",
                                                }}
                                                onAnimationComplete={() => {
                                                    nextStory();
                                                }}
                                                className="h-full bg-white"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Conteúdo da story */}
                            <AnimatePresence mode="wait">
                                {currentStory === 0 && <MinutesTogetherStory animatedMinutes={animatedMinutes} />}
                            </AnimatePresence>

                            {/* Área de navegação esquerda */}
                            <button
                                type="button"
                                onClick={previousStory}
                                className="absolute left-0 top-0 z-10 h-full w-1/3"
                                aria-label="Story anterior"
                            />

                            {/* Área de navegação direita */}
                            <button
                                type="button"
                                onClick={nextStory}
                                className="absolute right-0 top-0 z-10 h-full w-1/3"
                                aria-label="Próxima story"
                            />
                        </motion.div>
                    </motion.div>
    )
}