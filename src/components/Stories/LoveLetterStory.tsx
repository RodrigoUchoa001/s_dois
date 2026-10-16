
import { motion, useReducedMotion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";

const STARS = [
    { x: "10%", y: "17%", size: 3 },
    { x: "88%", y: "14%", size: 4 },
    { x: "13%", y: "39%", size: 2 },
    { x: "91%", y: "43%", size: 3 },
    { x: "8%", y: "70%", size: 3 },
    { x: "89%", y: "79%", size: 2 },
    { x: "25%", y: "88%", size: 2 },
    { x: "74%", y: "11%", size: 2 },
];

export function LoveLetterStory() {
    const reduceMotion = useReducedMotion();

    const entrance = (delay: number) => ({
        initial: reduceMotion ? false : { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : delay,
            ease: "easeOut" as const,
        },
    });

    return (
        <section className="absolute inset-0 overflow-hidden bg-[#0b0b2b] text-[#fff3c7]">
            {/* Fundo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div
                    className="absolute -left-24 top-[18%] h-64 w-64 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(128,100,255,0.16), transparent 70%)",
                    }}
                />
                <div
                    className="absolute -right-24 bottom-[10%] h-72 w-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(168,117,255,0.12), transparent 70%)",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(128,100,255,0.07),transparent_68%)]" />

                {STARS.map((star, index) => (
                    <span
                        key={index}
                        className="absolute rounded-full bg-[#fff3c7]/60"
                        style={{
                            left: star.x,
                            top: star.y,
                            width: star.size,
                            height: star.size,
                        }}
                    />
                ))}
            </div>

            {/* Área rolável: a barra de progresso do StoriesScreen fica acima */}
            <div className="absolute inset-x-0 bottom-0 top-7 overflow-y-auto overscroll-contain scrollbar-none">
                <div className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center px-5 py-5 sm:px-8 sm:py-4">
                    {/* Cabeçalho compacto */}
                    <motion.header
                        {...entrance(0.05)}
                        className="relative z-10 mb-4 flex w-full shrink-0 flex-col items-center text-center sm:mb-4"
                    >
                        <div className="mb-2 flex items-center gap-3 text-[#e8c98b]/80">
                            <span className="h-px w-7 bg-[#e8c98b]/40" />
                            <Sparkles size={15} strokeWidth={1.4} />
                            <span className="h-px w-7 bg-[#e8c98b]/40" />
                        </div>

                        <h1 className="mt-2 text-[clamp(1.8rem,5.5vh,2.7rem)] font-black leading-none tracking-[-0.055em] text-[#fff3c7]">
                            Uma carta{" "}
                            <span className="font-serif font-medium italic text-[#e8c98b]">
                                para você
                            </span>
                        </h1>
                    </motion.header>

                    {/* Carta */}
                    <motion.article
                        {...entrance(0.15)}
                        className="relative z-10 w-full shrink-0"
                    >
                        <div className="relative overflow-hidden rounded-[26px] border border-[#e8c98b]/20 bg-[#151436]/95 px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] sm:rounded-[30px] sm:px-7 sm:py-6">
                            {/* Moldura interna */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-2 rounded-[20px] border border-[#fff3c7]/[0.055]"
                            />

                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(168,117,255,0.12), transparent 70%)",
                                }}
                            />

                            <div className="relative">
                                {/* Identificação da carta */}
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#a875ff]/25 bg-[#a875ff]/10">
                                        <Heart
                                            size={17}
                                            fill="#a875ff"
                                            className="text-[#a875ff]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                                            Uma mensagem especial
                                        </p>
                                        <p className="mt-0.5 text-xs text-[#fff3c7]/45">
                                            Escrita para você, com amor
                                        </p>
                                    </div>
                                </div>

                                {/* Saudação */}
                                <p className="mb-3 font-serif text-lg italic text-[#e8c98b]">
                                    Oi amor! ❤️❤️❤️
                                </p>

                                {/* Mensagem original */}
                                <p className="whitespace-pre-line break-words text-[15px] font-medium leading-[1.8] text-[#fff3c7]/85 sm:text-base sm:leading-[1.85]">
                                    {couple.message}
                                </p>

                                {/* Separador */}
                                <div className="my-4 flex items-center gap-3">
                                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a875ff]/35" />
                                    <Heart
                                        size={12}
                                        fill="#a875ff"
                                        className="shrink-0 text-[#a875ff]"
                                    />
                                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a875ff]/35" />
                                </div>

                                {/* Assinatura */}
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#fff3c7]/40">
                                        Com todo meu amor,
                                    </span>
                                    <p className="mt-0.5 font-['Dancing_Script',cursive] text-3xl leading-tight text-[#e8c98b] sm:text-4xl">
                                        {couple.names.man}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
