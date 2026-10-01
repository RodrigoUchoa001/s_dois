import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { couple } from "../../data/couple";

import { getMinutesTogether } from "../../utils/date";

function useAnimatedNumber(target: number, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let animationFrame: number;
        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out: começa rápido e desacelera no final
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setValue(Math.floor(target * easedProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [target, duration]);

    return value;
}

export function WrappedBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStory, setCurrentStory] = useState(0);

    const totalStories = couple.wrapped ? Object.keys(couple.wrapped).length : 0;
    const storyDuration = 5000;

    /*
     * Abre o Wrapped
     */
    function openWrapped() {
        setCurrentStory(0);
        setIsOpen(true);
    }

    /*
     * Fecha o Wrapped
     */
    function closeWrapped() {
        setIsOpen(false);
    }

    /*
     * Próxima story
     */
    function nextStory() {
        if (currentStory < totalStories - 1) {
            setCurrentStory((previous) => previous + 1);
        }
    }

    /*
     * Story anterior
     */
    function previousStory() {
        if (currentStory > 0) {
            setCurrentStory((previous) => previous - 1);
        }
    }

    /*
     * Avanço automático
     */
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            nextStory();
        }, storyDuration);

        return () => clearTimeout(timer);
    }, [isOpen, currentStory]);

    /*
     * Fechar com ESC
     */
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

    const minutesTogether = getMinutesTogether();
    const animatedMinutes = useAnimatedNumber(minutesTogether, 1800);

    return (
        <>
            {/* Card */}
            <motion.div
                layout
                className="overflow-hidden rounded-3xl bg-[#111111] p-8 text-center text-white shadow-xl"
            >
                <h2 className="text-2xl font-bold">
                    Seu Relacionamento Wrapped
                </h2>

                <p className="text-white/50">
                    Explore seu tempo em casal
                </p>

                <div className="mt-auto pt-10">
                    <button
                        type="button"
                        onClick={openWrapped}
                        className="w-full rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#292929] transition hover:scale-105"
                    >
                        Mostrar Wrapped
                    </button>
                </div>
            </motion.div>

            {/* Wrapped */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6"
                    >
                        {/* Botão fechar */}
                        <button
                            type="button"
                            onClick={closeWrapped}
                            className="absolute right-5 top-5 z-50 rounded-full p-2 text-white transition hover:bg-white/10"
                            aria-label="Fechar Wrapped"
                        >
                            <X size={32} />
                        </button>

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
                                duration: 0.25,
                            }}
                            className="relative aspect-9/16 w-full max-w-97.5 overflow-hidden rounded-3xl bg-linear-to-br from-[#151515] via-[#24152f] to-[#111111] text-white shadow-2xl"
                        >
                            {/* Barras de progresso */}
                            <div className="absolute left-3 right-3 top-3 z-20 flex gap-1">
                                {Array.from({
                                    length: totalStories,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                                    >
                                        {index < currentStory && (
                                            <div className="h-full w-full bg-white" />
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
                                                    nextStory();
                                                }}
                                                className="h-full bg-white"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Conteúdo da story */}
                            <AnimatePresence mode="wait">
                                {currentStory === 0 && (
                                    <motion.div
                                        key="minutes"
                                        initial={{
                                            opacity: 0,
                                            scale: 1.05,
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
                                            duration: 0.5,
                                        }}
                                        className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8 text-center"
                                    >
                                        {/* Elementos decorativos */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 0.15, scale: 1 }}
                                            transition={{ duration: 1 }}
                                            className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-purple-500 blur-3xl"
                                        />

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 0.15, scale: 1 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-pink-500 blur-3xl"
                                        />

                                        {/* Conteúdo */}
                                        <div className="relative z-10">
                                            <motion.p
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-lg font-medium text-white/60"
                                            >
                                                Até agora, vocês já passaram
                                            </motion.p>

                                            {/* Número */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.7,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.35,
                                                    duration: 0.6,
                                                    type: "spring",
                                                    stiffness: 120,
                                                }}
                                                className="mt-6"
                                            >
                                                <span className="block text-7xl font-black tracking-tighter md:text-8xl">
                                                    {animatedMinutes.toLocaleString("pt-BR")}
                                                </span>

                                                <span className="mt-2 block text-2xl font-semibold text-white/80">
                                                    minutos juntos
                                                </span>
                                            </motion.div>

                                            {/* Separador */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scaleX: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scaleX: 1,
                                                }}
                                                transition={{
                                                    delay: 0.8,
                                                    duration: 0.5,
                                                }}
                                                className="mx-auto mt-8 h-px w-24 bg-white/30"
                                            />

                                            {/* Mensagem */}
                                            <motion.p
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 1,
                                                    duration: 0.5,
                                                }}
                                                className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-white/50"
                                            >
                                                {couple.wrapped.minutesTogether.message}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Área de navegação esquerda */}
                            <button
                                type="button"
                                onClick={previousStory}
                                className="absolute left-0 top-0 z-10 h-full w-1/3"
                                aria-label="Story anterior"
                            />

                            {/* Área de navegação direita */}
                            <button
                                type="button"
                                onClick={nextStory}
                                className="absolute right-0 top-0 z-10 h-full w-1/3"
                                aria-label="Próxima story"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}