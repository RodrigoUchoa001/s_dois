import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

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
import { BeginningStory } from "./BeginningStory/BeginningStory";
import { StarMapStory } from "./StarMapStory/StarMapStory";

interface StoriesScreenProps {
    isOpen: boolean;
    closeWrapped: () => void;
}

export function StoriesScreen({
    isOpen,
    closeWrapped,
}: StoriesScreenProps) {
    const [currentStory, setCurrentStory] = useState(0);
    const [isStoryPaused, setIsStoryPaused] = useState(false);
    const [storyProgress, setStoryProgress] = useState(0);

    const storyStartTime = useRef<number | null>(null);
    const pausedElapsed = useRef(0);

    // Controle do toque rápido x pressionamento longo
    const pressTimer = useRef<number | null>(null);
    const isLongPress = useRef(false);

    const totalStories = 9;
    const storyDuration = 8000;

    const minutesTogether = getMinutesTogether();

    const animatedMinutes = useAnimatedNumber(
        minutesTogether,
        1800
    );

    function nextStory() {
        if (currentStory < totalStories - 1) {
            setStoryProgress(0);
            setIsStoryPaused(false);
            setCurrentStory((previous) => previous + 1);
        }
    }

    function previousStory() {
        if (currentStory > 0) {
            setStoryProgress(0);
            setIsStoryPaused(false);
            setCurrentStory((previous) => previous - 1);
        }
    }

    /*
     * Começa a detectar se o usuário está segurando
     * o botão lateral.
     */
    function handleStoryPress() {
        isLongPress.current = false;

        pressTimer.current = window.setTimeout(() => {
            isLongPress.current = true;

            if (storyStartTime.current !== null) {
                pausedElapsed.current =
                    performance.now() - storyStartTime.current;
            }

            setIsStoryPaused(true);
        }, 200);
    }

    /*
     * Usuário soltou o botão.
     * Se era um long press, apenas continua o story.
     */
    function handleStoryRelease() {
        if (pressTimer.current !== null) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }

        setIsStoryPaused(false);
    }

    /*
     * Só executa a navegação se NÃO tiver sido
     * um pressionamento longo.
     */
    function handleStoryClick(action: () => void) {
        if (isLongPress.current) {
            isLongPress.current = false;
            return;
        }

        action();
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

    /*
     * Reinicia o progresso quando muda de story.
     */
    useEffect(() => {
        if (!isOpen) return;

        storyStartTime.current = performance.now();
        pausedElapsed.current = 0;
    }, [currentStory, isOpen]);

    /*
     * Controle do tempo do story.
     */
    useEffect(() => {
        if (!isOpen || isStoryPaused) return;

        storyStartTime.current =
            performance.now() - pausedElapsed.current;

        let animationFrame: number;

        function updateProgress() {
            if (storyStartTime.current === null) return;

            const elapsed =
                performance.now() - storyStartTime.current;

            const progress = Math.min(
                elapsed / storyDuration,
                1
            );

            setStoryProgress(progress);

            if (progress >= 1) {
                if (currentStory !== 4) {
                    nextStory();
                }

                return;
            }

            animationFrame =
                requestAnimationFrame(updateProgress);
        }

        animationFrame =
            requestAnimationFrame(updateProgress);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [isOpen, currentStory, isStoryPaused]);

    /*
     * Botão manual de pausa.
     */
    function toggleStoryPause() {
        if (
            !isStoryPaused &&
            storyStartTime.current !== null
        ) {
            pausedElapsed.current =
                performance.now() - storyStartTime.current;
        }

        setIsStoryPaused((previous) => !previous);
    }

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

                {/* Pausar / continuar */}
                <motion.button
                    type="button"
                    onClick={toggleStoryPause}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="absolute right-[4.5rem] top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-[#0b0b2b]/70 text-[#fff3c7]/70 backdrop-blur-md transition hover:text-[#fff3c7]"
                    aria-label={
                        isStoryPaused
                            ? "Continuar story"
                            : "Pausar story"
                    }
                >
                    {isStoryPaused ? (
                        <Play
                            size={20}
                            fill="currentColor"
                        />
                    ) : (
                        <Pause size={20} />
                    )}
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
                    <div className="absolute left-3 right-3 top-3 z-50 flex gap-1.5">
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
                                    <div
                                        className="h-full bg-[#a875ff]"
                                        style={{
                                            width: `${storyProgress * 100}%`,
                                        }}
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
                                    animatedMinutes={
                                        animatedMinutes
                                    }
                                />
                            )}

                            {currentStory === 1 && (
                                <WeInNumbersStory />
                            )}

                            {currentStory === 2 && (
                                <BeginningStory />
                            )}

                            {currentStory === 3 && (
                                <MoonStory />
                            )}

                            {currentStory === 4 && (
                                <SeasonStory />
                            )}

                            {currentStory === 5 && (
                                <StarMapStory />
                            )}

                            {currentStory === 6 && (
                                <GalleryStory />
                            )}

                            {currentStory === 7 && (
                                <OurMusicStory />
                            )}

                            {currentStory === 8 && (
                                <TimelineStory />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navegação lateral */}
                    {currentStory !== 6 && (
                        <>
                            <button
                                type="button"
                                onPointerDown={
                                    handleStoryPress
                                }
                                onPointerUp={
                                    handleStoryRelease
                                }
                                onPointerCancel={
                                    handleStoryRelease
                                }
                                onClick={() =>
                                    handleStoryClick(
                                        previousStory
                                    )
                                }
                                className="absolute left-0 top-0 z-10 h-full w-1/4"
                                aria-label="Story anterior"
                            />

                            <button
                                type="button"
                                onPointerDown={
                                    handleStoryPress
                                }
                                onPointerUp={
                                    handleStoryRelease
                                }
                                onPointerCancel={
                                    handleStoryRelease
                                }
                                onClick={() =>
                                    handleStoryClick(
                                        nextStory
                                    )
                                }
                                className="absolute right-0 top-0 z-10 h-full w-1/4"
                                aria-label="Próxima story"
                            />
                        </>
                    )}

                    {/* Navegação da Gallery */}
                    {currentStory === 6 && (
                        <>
                            <button
                                type="button"
                                onPointerDown={
                                    handleStoryPress
                                }
                                onPointerUp={
                                    handleStoryRelease
                                }
                                onPointerCancel={
                                    handleStoryRelease
                                }
                                onClick={() =>
                                    handleStoryClick(
                                        previousStory
                                    )
                                }
                                className="absolute left-0 top-0 z-10 h-[90%] w-1/4"
                                aria-label="Story anterior"
                            />

                            <button
                                type="button"
                                onPointerDown={
                                    handleStoryPress
                                }
                                onPointerUp={
                                    handleStoryRelease
                                }
                                onPointerCancel={
                                    handleStoryRelease
                                }
                                onClick={() =>
                                    handleStoryClick(
                                        nextStory
                                    )
                                }
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