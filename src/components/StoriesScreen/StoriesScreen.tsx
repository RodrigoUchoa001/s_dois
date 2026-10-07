import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getMinutesTogether, useAnimatedNumber } from "../../utils/date";
import { MinutesTogetherStory } from "../MinutesTogetherStory/MinutesTogetherStory";
import { GalleryStory } from "../GalleryStory/GalleryStory";
import { WeInNumbersStory } from "../WeInNumbersStory/WeInNumbersStory";
import { OurMusicStory } from "../OurMusicStory/OurMusicStory";
import { MoonStory } from "../MoonStory/MoonStory";
import { SeasonStory } from "../SeasonStory/SeasonStory";
import { TimelineStory } from "../TimelineStory/TimelineStory";

export function StoriesScreen( { isOpen, closeWrapped }: { isOpen: boolean, closeWrapped: () => void }) {
    const [currentStory, setCurrentStory] = useState(0);

    const totalStories = 7;
    const storyDuration = 8000;

    
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
                className="relative aspect-9/16 w-full max-w-97.5 overflow-hidden rounded-3xl bg-[#0b0b2b] text-white shadow-2xl"
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
                                        // Avanço automático
                                        if (currentStory !== 4) {
                                            nextStory();
                                        }
                                    }}
                                    className="h-full bg-white"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Conteúdo da story */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {currentStory === 0 && <MinutesTogetherStory animatedMinutes={animatedMinutes} />}
                        {currentStory === 1 && <WeInNumbersStory />}
                        {currentStory === 2 && <MoonStory />}
                        {currentStory === 3 && <SeasonStory />}
                        {currentStory === 4 && <GalleryStory />}
                        {currentStory === 5 && <OurMusicStory />}
                        {currentStory === 6 && <TimelineStory />}
                    </AnimatePresence>
                </div>
                
                {/* Botões de trocar entre stories não pode ocupar a tela toda no story de galeria de fotos */}
                {currentStory !== 4 && (
                    <>
                        <button
                            type="button"
                            onClick={previousStory}
                            onKeyDown={(event) => event.key === "ArrowLeft" && previousStory()}
                            className="absolute left-0 top-0 z-10 h-full w-1/3"
                            aria-label="Story anterior"
                        />

                        <button
                            type="button"
                            onClick={nextStory}
                            onKeyDown={(event) => event.key === "ArrowRight" && nextStory()}
                            className="absolute right-0 top-0 z-10 h-full w-1/3"
                            aria-label="Próxima story"
                        />
                    </>
                )}

                {/* Não atrapalha os botões de mudar entre grupos de fotos */}
                {currentStory == 4 && (
                    <>
                        <button
                            type="button"
                            onClick={previousStory}
                            onKeyDown={(event) => event.key === "ArrowLeft" && previousStory()}
                            className="absolute left-0 top-0 z-10 h-[90%] w-1/3"
                            aria-label="Story anterior"
                        />

                        <button
                            type="button"
                            onClick={nextStory}
                            onKeyDown={(event) => event.key === "ArrowRight" && nextStory()}
                            className="absolute right-0 top-0 z-10 h-[90%] w-1/3"
                            aria-label="Próxima story"
                        />
                    </>
                )}
            </motion.div>
            {/* fechar ao clicar fora do story */}
            <div className="absolute inset-0 -z-10" onClick={closeWrapped} /> 
        </motion.div>
    )
}