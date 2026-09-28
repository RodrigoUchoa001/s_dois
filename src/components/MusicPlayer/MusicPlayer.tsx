import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";

export interface props {
    isPlaying: boolean;
    setIsPlaying: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export function MusicPlayer({ isPlaying, setIsPlaying }: props) {
    return (
        <>
            {/* Barra de progresso */}
            <div className="mt-7">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[18%] rounded-full bg-white" />
                </div>

                <div className="mt-2 flex justify-between text-xs text-white/50">
                    <span>0:42</span>
                    <span>3:57</span>
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
                        onClick={() => setIsPlaying((previous) => !previous)}
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