import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { couple } from "../../data/couple";

export interface props {
    isPlaying: boolean;
    setIsPlaying: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export function MusicPlayer({ isPlaying, setIsPlaying }: props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

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

    // progress bar percentage
    const progress = duration > 0
        ? (currentTime / duration) * 100
        : 0;
    
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
            <div className="mt-7">
                <div 
                    className="h-1 w-full overflow-hidden rounded-full bg-white/20"
                    onClick={handleProgressClick}
                >
                    <div 
                        className="h-full rounded-full bg-white transition-[width] duration-100"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <div className="mt-2 flex justify-between text-xs text-white/50">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                </div>  

                {/* Controles */}
                <div className="mt-5 flex items-center justify-between">
                <button
                    type="button"
                    className="text-white/70 transition hover:text-white"
                    aria-label="Mais opções"
                >
                    <Shuffle size={24} />
                </button>

                <div className="flex items-center gap-7">
                    <button
                        type="button"
                        className="text-white transition hover:scale-110"
                        aria-label="Música anterior"
                    >
                    <SkipBack size={30} fill="currentColor" />
                    </button>

                    <button
                        type="button"
                        onClick={togglePlay}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                    {isPlaying ? (
                        <Pause size={28} fill="currentColor" />
                    ) : (
                        <Play size={28} fill="currentColor" />
                    )}
                    </button>

                    <button
                        type="button"
                        className="text-white transition hover:scale-110"
                        aria-label="Próxima música"
                    >
                    <SkipForward size={30} fill="currentColor" />
                    </button>
                </div>

                <button
                    type="button"
                    className="text-white/70 transition hover:text-white"
                    aria-label="Volume"
                >
                    <Repeat size={22} />
                </button>
            </div>
        </>
    );
}