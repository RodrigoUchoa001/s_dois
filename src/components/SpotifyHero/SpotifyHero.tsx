import { Heart, EllipsisVertical, ChevronDown } from "lucide-react"
import { useState } from "react"
import { couple } from "../../data/couple"
import { CoupleCounter } from "../CoupleCounter/CoupleCounter"
import { CoupleMessage } from "../CoupleMessage/CoupleMessage"
import { MusicPlayer } from "../MusicPlayer/MusicPlayer"
// import { MeetTheCouple } from "../MeetTheCouple/MeetTheCouple"

export function SpotifyHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isliked, setIsLiked] = useState(false);

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
            onClick={() => setIsLiked((previous) => !previous)}
          >
            {
                isliked ? (
                    <Heart size={25} className="text-green-600" />
                ) : (
                    <Heart size={25} />
                )
            }
          </button>
        </div>

        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            
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
              
        <div className="mt-5" />

        {/* <MeetTheCouple /> */}
      </div>
    </section>
  )
}