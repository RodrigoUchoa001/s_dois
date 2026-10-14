
import { motion, useReducedMotion } from "motion/react";
import { toBlob } from "html-to-image";
import { Heart, LoaderCircle, Music2, Share2, Sparkles } from "lucide-react";

import { couple } from "../../data/couple";
import {
    getMinutesTogether,
    useAnimatedNumber,
} from "../../utils/date";
import { useRef, useState } from "react";

export function FinalShareStory() {
    const prefersReducedMotion = useReducedMotion();

    const minutes = useAnimatedNumber(
        getMinutesTogether(),
        1600
    );

    const startDate = new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay
    );

    const formattedDate = startDate.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    ).replace(".", "");

    const coverImage = couple.song.cover;

    const couplePhoto = couple.endImage1;
    
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    async function handleShare() {
        const card = cardRef.current;

        if (!card || isSharing) return;

        setIsSharing(true);

        try {
            // Garante que a imagem e as fontes estejam carregadas.
            await document.fonts.ready;

            const images = Array.from(card.querySelectorAll("img"));

            await Promise.all(
                images.map(async (img) => {
                    if (!img.complete) {
                        await new Promise<void>((resolve) => {
                            img.addEventListener("load", () => resolve(), {
                                once: true,
                            });
                            img.addEventListener("error", () => resolve(), {
                                once: true,
                            });
                        });
                    }
                })
            );

            // Captura somente a caixa preta em alta resolução.
            const blob = await toBlob(card, {
                pixelRatio: 2,
                cacheBust: true,
                backgroundColor: "#101014",
            });

            if (!blob) {
                throw new Error("Não foi possível gerar a imagem.");
            }

            const file = new File(
                [blob],
                "nossa-historia.png",
                { type: "image/png" }
            );

            // Abre o menu nativo de compartilhamento, quando suportado.
            if (
                navigator.share &&
                navigator.canShare?.({ files: [file] })
            ) {
                await navigator.share({
                    files: [file],
                    title: "Nossa história",
                    text: `${couple.names.man} ❤️ ${couple.names.woman}`,
                });

                return;
            }

            // Alternativa: baixa o PNG para compartilhar manualmente.
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "nossa-historia.png";
            link.click();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            // Cancelar o menu de compartilhamento não é uma falha.
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            console.error("Erro ao compartilhar o cartão:", error);
            alert(
                "Não foi possível gerar a imagem. Tente novamente."
            );
        } finally {
            setIsSharing(false);
        }
    }

    return (
        <section className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080810] px-5 py-10 text-white">
            {/* Luzes de fundo */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-[10%] h-64 w-64 rounded-full bg-[#8064ff]/20 blur-[100px]" />
                <div className="absolute -right-24 bottom-[8%] h-72 w-72 rounded-full bg-[#e5b96f]/10 blur-[100px]" />
            </div>

            {/* Cartão de compartilhamento */}
            <motion.div
                ref={cardRef}
                initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 28,
                    scale: prefersReducedMotion ? 1 : 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: prefersReducedMotion ? 0 : 0.8,
                    ease: "easeOut",
                }}
                className="relative z-10 w-full max-w-[350px] overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#101014] shadow-[0_24px_100px_rgba(0,0,0,0.55)]"
            >
                {/* Foto principal */}
                <div className="relative h-[245px] overflow-hidden sm:h-[270px]">
                    <motion.img
                        src={couplePhoto}
                        alt={`Memória de ${couple.names.man} e ${couple.names.woman}`}
                        className="h-full w-full object-cover"
                        initial={{
                            scale: prefersReducedMotion ? 1 : 1.12,
                        }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: prefersReducedMotion ? 0 : 1.5,
                            ease: "easeOut",
                        }}
                    />

                    {/* Gradiente sobre a foto */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#101014]" />

                    {/* Etiqueta superior */}
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                        <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                            Our Wrapped
                        </span>

                        <Sparkles
                            size={17}
                            className="text-[#f0d59b]"
                            strokeWidth={1.5}
                        />
                    </div>

                    {/* Nomes sobre a imagem */}
                    <div className="absolute bottom-5 left-5 right-5">
                        <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white/70">
                            Nossa história, em números
                        </p>

                        <h2 className="text-3xl font-black leading-none tracking-tight">
                            {couple.names.man}
                            <span className="mx-2 font-light text-[#e8c98b]">
                                &
                            </span>
                            {couple.names.woman}
                        </h2>
                    </div>
                </div>

                {/* Informações */}
                <div className="px-5 pb-5 pt-1">
                    {/* Frase */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <p className="max-w-[230px] text-[10px] font-medium uppercase leading-relaxed tracking-[0.19em] text-white/55">
                            Ainda é só o começo.
                            <br />
                            O melhor continua sendo nosso.
                        </p>

                        <motion.div
                            animate={
                                prefersReducedMotion
                                    ? undefined
                                    : {
                                        y: [0, -3, 0],
                                        rotate: [0, -5, 5, 0],
                                    }
                            }
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Heart
                                size={23}
                                fill="#e8c98b"
                                strokeWidth={1.2}
                                className="shrink-0 text-[#e8c98b]"
                            />
                        </motion.div>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Minutos juntos */}
                        <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5">
                            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/45">
                                Tempo juntos
                            </span>

                            <div className="mt-3">
                                <motion.p
                                    className="text-[clamp(1.65rem,7vw,2.1rem)] font-black leading-none tracking-[-0.06em] text-[#f0d59b]"
                                    key="minutes"
                                >
                                    {minutes.toLocaleString("pt-BR")}
                                </motion.p>

                                <p className="mt-1.5 text-[10px] text-white/55">
                                    minutos de nós
                                </p>
                            </div>
                        </div>

                        {/* Música */}
                        <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5">
                            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/45">
                                Nossa música
                            </span>

                            <div className="mt-3 flex items-center gap-2.5">
                                <img
                                    src={coverImage}
                                    alt={`Capa de ${couple.song.title}`}
                                    className="h-12 w-12 shrink-0 rounded-lg object-cover shadow-lg"
                                />

                                <div className="min-w-0">
                                    <p className="truncate text-xs font-bold text-white">
                                        {couple.song.title}
                                    </p>

                                    <p className="mt-1 truncate text-[10px] text-white/50">
                                        {couple.song.artist}
                                    </p>

                                    <div className="mt-2 flex items-end gap-[3px] min-h-[20px]">
                                        {[9, 15, 6, 12, 17, 8, 13].map(
                                            (height, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="w-[3px] rounded-full bg-[#a875ff]"
                                                    animate={
                                                        prefersReducedMotion
                                                            ? undefined
                                                            : {
                                                                height: [
                                                                    height,
                                                                    height * 0.55,
                                                                    height * 1.15,
                                                                    height,
                                                                ],
                                                            }
                                                    }
                                                    transition={{
                                                        duration: 1 + index * 0.12,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: index * 0.08,
                                                    }}
                                                    style={{
                                                        height,
                                                    }}
                                                />
                                            )
                                        )}

                                        <Music2
                                            size={11}
                                            className="ml-1 text-[#a875ff]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                        <div>
                            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                                Desde
                            </p>

                            <p className="mt-1 text-xs font-medium text-white/75">
                                {formattedDate}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-['Dancing_Script',cursive] text-xl text-[#e8c98b]">
                                Feito com amor
                            </p>

                            <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-white/30">
                                {couple.names.man} ♥ {couple.names.woman}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Texto fora do cartão */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: prefersReducedMotion ? 0 : 1,
                    duration: 0.8,
                }}
                className="absolute bottom-3 left-0 right-0 text-center text-[8px] uppercase tracking-[0.3em] text-white/25"
            >
                Cada minuto faz parte da nossa história
            </motion.p>
            
            <motion.button
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#e8c98b]/30 bg-[#17151e] px-5 py-3 text-xs font-semibold text-[#fff4d6] shadow-lg transition hover:border-[#e8c98b]/60 hover:bg-[#24202c] disabled:cursor-wait disabled:opacity-70"
            >
                {isSharing ? (
                    <LoaderCircle size={16} className="animate-spin" />
                ) : (
                    <Share2 size={16} className="text-[#e8c98b]" />
                )}

                {isSharing
                    ? "Preparando imagem..."
                    : "Compartilhar nossa história"}
            </motion.button>
        </section>
    );
}
