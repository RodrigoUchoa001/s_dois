import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import {
    getMinutesTogether,
    useAnimatedNumber,
} from "../../utils/date";

import { MinutesTogetherStory } from "./MinutesTogetherStory";
import { WeInNumbersStory } from "./WeInNumbersStory";
import { OurMusicStory } from "./OurMusicStory";
import { MoonStory } from "./MoonStory";
import { SeasonStory } from "./SeasonStory/SeasonStory";
import { TimelineStory } from "./TimelineStory/TimelineStory";
import { GalleryStory } from "./GalleryStory";

interface StoriesScreenProps {
    isOpen: boolean;
    closeWrapped: () => void;
}

export function StoriesScreen({
    isOpen,
    closeWrapped,
}: StoriesScreenProps) {
    const [currentStory, setCurrentStory] = useState(0);

    const totalStories = 7;
    const storyDuration = 8000;

    const minutesTogether = getMinutesTogether();
    const animatedMinutes = useAnimatedNumber(
        minutesTogether,
        1800
    );

    function nextStory() {
        if (currentStory < totalStories - 1) {
            setCurrentStory((previous) => previous + 1);
        }
    }

    function previousStory() {
        if (currentStory > 0) {
            setCurrentStory((previous) => previous - 1);
        }
    }

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

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] flex h-[100dvh] w-[100vw] items-center justify-center overflow-hidden bg-[#05051b]"
            >
                {/* Glow ambiente */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(128,100,255,0.12),transparent_45%)]" />

                {/* Fechar */}
                <motion.button
                    type="button"
                    onClick={closeWrapped}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="absolute right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-[#0b0b2b]/70 text-[#fff3c7]/70 backdrop-blur-md transition hover:text-[#fff3c7]"
                    aria-label="Fechar Wrapped"
                >
                    <X size={23} />
                </motion.button>

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
                        duration: 0.3,
                    }}
                    className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7] shadow-2xl sm:h-[min(100dvh,860px)] sm:aspect-[9/16] sm:w-auto sm:max-w-[calc(100vw-48px)] sm:rounded-[32px] sm:border-2 sm:border-[#fff3c7]/10"
                >
                    {/* Barras de progresso */}
                    <div className="absolute left-3 right-3 top-3 z-30 flex gap-1.5">
                        {Array.from({
                            length: totalStories,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-1 flex-1 overflow-hidden rounded-full bg-[#fff3c7]/15"
                            >
                                {index < currentStory && (
                                    <div className="h-full w-full bg-[#fff3c7]" />
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
                                            if (currentStory !== 4) {
                                                nextStory();
                                            }
                                        }}
                                        className="h-full bg-[#a875ff]"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Conteúdo */}
                    <div className="absolute inset-0">
                        <AnimatePresence mode="wait">
                            {currentStory === 0 && (
                                <MinutesTogetherStory
                                    animatedMinutes={animatedMinutes}
                                />
                            )}

                            {currentStory === 1 && (
                                <WeInNumbersStory />
                            )}

                            {currentStory === 2 && <MoonStory />}

                            {currentStory === 3 && <SeasonStory />}

                            {currentStory === 4 && <GalleryStory />}

                            {currentStory === 5 && <OurMusicStory />}

                            {currentStory === 6 && <TimelineStory />}
                        </AnimatePresence>
                    </div>

                    {/* Navegação lateral */}
                    {currentStory !== 4 && (
                        <>
                            <button
                                type="button"
                                onClick={previousStory}
                                className="absolute left-0 top-0 z-10 h-full w-1/4"
                                aria-label="Story anterior"
                            />

                            <button
                                type="button"
                                onClick={nextStory}
                                className="absolute right-0 top-0 z-10 h-full w-1/4"
                                aria-label="Próxima story"
                            />
                        </>
                    )}

                    {/* Navegação da Gallery */}
                    {currentStory === 4 && (
                        <>
                            <button
                                type="button"
                                onClick={previousStory}
                                className="absolute left-0 top-0 z-10 h-[90%] w-1/4"
                                aria-label="Story anterior"
                            />

                            <button
                                type="button"
                                onClick={nextStory}
                                className="absolute right-0 top-0 z-10 h-[90%] w-1/4"
                                aria-label="Próxima story"
                            />
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}