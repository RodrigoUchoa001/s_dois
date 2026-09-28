import { Heart, Pause, Play, SkipBack, SkipForward, EllipsisVertical, ChevronDown, Shuffle, Repeat } from "lucide-react"
import { useState } from "react"
import { couple } from "../../data/couple"
import { CoupleCounter } from "../CoupleCounter/CoupleCounter"
import { CoupleMessage } from "../CoupleMessage/CoupleMessage"

export function SpotifyHero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-10 text-white">
      {/* Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl"
        style={{
          backgroundImage: `url(${couple.song.cover})`,
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
            <button
                type="button"
                className="shrink-0 text-white/70 transition hover:text-white"
                aria-label="Adicionar aos favoritos"
            >
                <ChevronDown size={25} />
            </button>
            <div className="font-bold">Para o meu grande amor</div>
            <button
                type="button"
                className="shrink-0 text-white/70 transition hover:text-white"
                aria-label="Adicionar aos favoritos"
            >
                <EllipsisVertical size={25} />
            </button>
        </div>

        {/* Foto */}
        <div className="mb-8 overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={couple.song.cover}
            alt={`Capa da música ${couple.song.title}`}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Informações da música */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold">
              {couple.song.title}
            </h1>

            <p className="truncate text-base text-white/60">
              {couple.song.artist}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 text-white/70 transition hover:text-white"
            aria-label="Adicionar aos favoritos"
          >
            <Heart size={25} />
          </button>
        </div>

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
            
        <div className="mt-10" />

        {/* Contador de dias */}
        <div className="flex flex-col bg-[#292929] rounded-3xl">
            <div className="relative w-full">
                <img
                    src={couple.song.cover}
                    alt={`Capa da música ${couple.song.title}`}
                    className="w-full object-cover rounded-t-3xl h-72"
                />
                <p className="p-2 pl-4 absolute inset-0 font-bold text-xl text-white">Sobre o casal</p>   
            </div>

            <CoupleCounter />
        </div>

        <div className="mt-5" />

        <CoupleMessage />

      </div>
    </section>
  )
}