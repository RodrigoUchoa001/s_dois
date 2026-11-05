
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

import { couple } from "../../data/couple";

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
import { BeginningStory } from "./BeginningStory/BeginningStory";
import { StarMapStory } from "./StarMapStory/StarMapStory";
import { NextChapterStory } from "./NewChapterStory";
import { FinalStory } from "./FinalStory";
import { FinalShareStory } from "./FinalShareStory";
import { DateNightRouletteStory } from "./DateNightRouletteStory";
import { LoveLetterStory } from "./LoveLetterStory";
import { PlacesMapStory } from "./PlacesMapStory/PlacesMapStory";

interface StoriesScreenProps {
    isOpen: boolean;
    closeWrapped: () => void;
}

export function StoriesScreen({
    isOpen,
    closeWrapped,
}: StoriesScreenProps) {
    const isEnded = couple.hasItEnded;

    const [currentStory, setCurrentStory] = useState(0);
    const [isStoryPaused, setIsStoryPaused] = useState(false);
    const [storyProgress, setStoryProgress] = useState(0);

    const storyStartTime = useRef<number | null>(null);
    const pausedElapsed = useRef(0);

    const pressTimer = useRef<number | null>(null);
    const isLongPress = useRef(false);

    /*
     * Quando a história terminou, removemos as telas
     * que pressupõem novos encontros ou uma próxima etapa juntos.
     */
    const storyOrder = isEnded
        ? [
              "minutes",
              "numbers",
              "beginning",
              "moon",
              "season",
              "starMap",
              "music",
              "timeline",
              "placesMap",
              "loveLetter",
              "final",
              "finalShare",
          ]
        : [
              "minutes",
              "numbers",
              "beginning",
              "moon",
              "season",
              "starMap",
              "music",
              "timeline",
              "placesMap",
              "dateNight",
              "loveLetter",
              "nextChapter",
              "final",
              "finalShare",
          ];

    const totalStories = storyOrder.length;
    const storyDuration = 8000;

    const currentStoryName = storyOrder[currentStory];

    const manualStories = [
        "starMap",
        "timeline",
        "placesMap",
        "loveLetter",
    ];

    const minutesTogether = getMinutesTogether();

    const animatedMinutes = useAnimatedNumber(
        minutesTogether,
        1800
    );

    // Paleta original preservada em todos os estados.
    const colors = {
        background: "#05051b",
        storyBackground: "#0b0b2b",
        text: "#fff3c7",
        accent: "#a875ff",
        muted: "rgba(255, 243, 199, 0.15)",
        buttonBackground: "rgba(11, 11, 43, 0.7)",
    };

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

    function handleStoryRelease() {
        if (pressTimer.current !== null) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }

        setIsStoryPaused(false);
    }

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
     * Evita que o índice atual fique fora da sequência
     * caso a quantidade de stories seja alterada.
     */
    useEffect(() => {
        if (currentStory >= totalStories) {
            setCurrentStory(totalStories - 1);
        }
    }, [currentStory, totalStories]);

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

            // Stories interativos não avançam automaticamente.
            if (progress >= 1) {
                if (!manualStories.includes(currentStoryName)) {
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
                className="fixed inset-0 z-[9998] flex h-[100dvh] w-[100vw] items-center justify-center overflow-hidden"
                style={{
                    backgroundColor: colors.background,
                }}
            >
                {/* Fundo ambiente */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 45%, rgba(128, 100, 255, 0.12), transparent 45%)",
                    }}
                />

                {/* Fechar */}
                <motion.button
                    type="button"
                    onClick={closeWrapped}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="absolute right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition"
                    style={{
                        borderColor: `${colors.text}1a`,
                        backgroundColor: colors.buttonBackground,
                        color: `${colors.text}b3`,
                    }}
                    aria-label={
                        isEnded
                            ? "Fechar retrospectiva"
                            : "Fechar stories"
                    }
                >
                    <X size={23} />
                </motion.button>

                {/* Pausar / continuar */}
                <motion.button
                    type="button"
                    onClick={toggleStoryPause}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="absolute right-[4.5rem] top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition"
                    style={{
                        borderColor: `${colors.text}1a`,
                        backgroundColor: colors.buttonBackground,
                        color: `${colors.text}b3`,
                    }}
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
                    className="relative h-[100dvh] w-full overflow-hidden shadow-2xl sm:h-[min(100dvh,860px)] sm:aspect-[9/16] sm:w-auto sm:max-w-[calc(100vw-48px)] sm:rounded-[32px] sm:border-2"
                    style={{
                        backgroundColor: colors.storyBackground,
                        color: colors.text,
                        borderColor: `${colors.text}1a`,
                    }}
                >
                    {/* Barras de progresso */}
                    <div className="absolute left-3 right-3 top-3 z-50 flex gap-1.5">
                        {Array.from({
                            length: totalStories,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-1 flex-1 overflow-hidden rounded-full"
                                style={{
                                    backgroundColor: colors.muted,
                                }}
                            >
                                {index < currentStory && (
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundColor: colors.text,
                                        }}
                                    />
                                )}

                                {index === currentStory && (
                                    <div
                                        className="h-full"
                                        style={{
                                            width: `${storyProgress * 100}%`,
                                            backgroundColor: colors.accent,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Conteúdo */}
                    <div className="absolute inset-0">
                        <AnimatePresence mode="wait">
                            {currentStoryName === "minutes" && (
                                <MinutesTogetherStory
                                    animatedMinutes={animatedMinutes}
                                />
                            )}

                            {currentStoryName === "numbers" && (
                                <WeInNumbersStory />
                            )}

                            {currentStoryName === "beginning" && (
                                <BeginningStory />
                            )}

                            {currentStoryName === "moon" && (
                                <MoonStory />
                            )}

                            {currentStoryName === "season" && (
                                <SeasonStory />
                            )}

                            {currentStoryName === "starMap" && (
                                <StarMapStory />
                            )}

                            {currentStoryName === "music" && (
                                <OurMusicStory />
                            )}

                            {currentStoryName === "timeline" && (
                                <TimelineStory />
                            )}

                            {currentStoryName === "placesMap" && (
                                <PlacesMapStory />
                            )}

                            {currentStoryName === "dateNight" && (
                                <DateNightRouletteStory />
                            )}

                            {currentStoryName === "loveLetter" && (
                                <LoveLetterStory />
                            )}

                            {currentStoryName === "nextChapter" && (
                                <NextChapterStory />
                            )}

                            {currentStoryName === "final" && (
                                <FinalStory
                                    animatedMinutes={animatedMinutes}
                                />
                            )}

                            {currentStoryName === "finalShare" && (
                                <FinalShareStory />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navegação lateral */}
                    <>
                        <button
                            type="button"
                            onPointerDown={handleStoryPress}
                            onPointerUp={handleStoryRelease}
                            onPointerCancel={handleStoryRelease}
                            onClick={() =>
                                handleStoryClick(previousStory)
                            }
                            className="absolute left-0 top-0 z-10 h-full w-1/4"
                            aria-label="Story anterior"
                        />

                        <button
                            type="button"
                            onPointerDown={handleStoryPress}
                            onPointerUp={handleStoryRelease}
                            onPointerCancel={handleStoryRelease}
                            onClick={() =>
                                handleStoryClick(nextStory)
                            }
                            className="absolute right-0 top-0 z-10 h-full w-1/4"
                            aria-label="Próxima story"
                        />
                    </>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
