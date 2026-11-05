import {
    Pause,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { couple } from "../../data/couple";
import { MusicIntro } from "./MusicIntro";

export interface Props {
    isPlaying: boolean;
    setIsPlaying: (
        value: boolean | ((prevState: boolean) => boolean)
    ) => void;
}

export function MusicPlayer({ isPlaying, setIsPlaying }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isIntroVisible, setIsIntroVisible] = useState(true);

    const isEnded = couple.hasItEnded;

    const colors = {
        text: isEnded ? "#d0ced5" : "#fff3c7",
        accent: isEnded ? "#88838f" : "#a875ff",
        track: isEnded ? "rgba(208, 206, 213, 0.12)" : "rgba(255, 243, 199, 0.1)",
        muted: isEnded ? "rgba(208, 206, 213, 0.4)" : "rgba(255, 243, 199, 0.35)",
        button: isEnded ? "#777581" : "#a875ff",
    };

    useEffect(() => {
        const audio = new Audio(couple.song.url);

        audioRef.current = audio;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.pause();

            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );
            audio.removeEventListener("ended", handleEnded);
        };
    }, [setIsPlaying]);

    const togglePlay = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            await audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const progress =
        duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleProgressClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        const audio = audioRef.current;

        if (!audio || !duration) return;

        const rect = event.currentTarget.getBoundingClientRect();

        const clickPosition = event.clientX - rect.left;
        const percentage = clickPosition / rect.width;

        audio.currentTime = percentage * duration;
        setCurrentTime(audio.currentTime);
    };

    const formatTime = (time: number) => {
        if (!Number.isFinite(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            {/* Barra de progresso */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-7"
            >
                <div
                    className="group relative h-1.5 w-full cursor-pointer overflow-hidden rounded-full"
                    style={{ backgroundColor: colors.track }}
                    onClick={handleProgressClick}
                    role="slider"
                    aria-label="Progresso da música"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={currentTime}
                >
                    <div
                        className="h-full rounded-full transition-[width] duration-100"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: colors.accent,
                        }}
                    />
                </div>

                <div
                    className="mt-2 flex justify-between font-mono text-[10px] font-bold tracking-wide"
                    style={{ color: colors.muted }}
                >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </motion.div>

            {/* Controles */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-5 flex items-center justify-between"
            >
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition"
                    style={{ color: colors.muted }}
                    aria-label="Embaralhar"
                >
                    <Shuffle size={21} />
                </motion.button>

                <div className="flex items-center gap-7">
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                        className="transition"
                        style={{ color: colors.muted }}
                        aria-label="Música anterior"
                    >
                        <SkipBack size={28} fill="currentColor" />
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={togglePlay}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full text-[#d0ced5] transition-colors"
                        style={{
                            backgroundColor: colors.button,
                            boxShadow: isEnded
                                ? "0 8px 24px rgba(119, 117, 129, 0.15)"
                                : "0 8px 30px rgba(168, 117, 255, 0.35)",
                        }}
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                        {!isEnded && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[#fff3c7]/20"
                                animate={
                                    isPlaying
                                        ? {
                                              scale: [1, 1.12, 1],
                                              opacity: [0.5, 0, 0.5],
                                          }
                                        : {
                                              scale: 1,
                                              opacity: 0,
                                          }
                                }
                                transition={{
                                    duration: 2,
                                    repeat: isPlaying ? Infinity : 0,
                                    ease: "easeOut",
                                }}
                            />
                        )}

                        {isPlaying ? (
                            <Pause
                                size={27}
                                fill="currentColor"
                            />
                        ) : (
                            <Play
                                size={27}
                                fill="currentColor"
                                className="ml-1"
                            />
                        )}
                    </motion.button>

                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                        className="transition"
                        style={{ color: colors.muted }}
                        aria-label="Próxima música"
                    >
                        <SkipForward
                            size={28}
                            fill="currentColor"
                        />
                    </motion.button>
                </div>

                <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition"
                    style={{ color: colors.muted }}
                    aria-label="Repetir"
                >
                    <Repeat size={21} />
                </motion.button>
            </motion.div>

            {/* Introdução em tela inteira */}
            <AnimatePresence>
                {isIntroVisible && (
                    <MusicIntro
                        isEnded={isEnded}
                        onEnter={() => {
                            setIsIntroVisible(false);
                            togglePlay();
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}