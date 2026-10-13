
import { motion, useReducedMotion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { couple } from "../../data/couple";

interface FinalStoryProps {
    animatedMinutes: number;
}

export function FinalStory({
    animatedMinutes,
}: FinalStoryProps) {
    const prefersReducedMotion = useReducedMotion();

    const enter = (delay: number) => ({
        initial: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 24,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        transition: {
            duration: prefersReducedMotion ? 0 : 0.9,
            delay: prefersReducedMotion ? 0 : delay,
            ease: "easeOut" as const,
        },
    });

    return (
        <section className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden bg-[#09091f] px-7 pb-10 pt-16 text-[#fff4d6] sm:pb-12">
            {/* Fundo cinematográfico */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 top-[18%] h-72 w-72 rounded-full bg-[#8064ff]/15 blur-[100px]" />

                <div className="absolute -right-24 bottom-[12%] h-80 w-80 rounded-full bg-[#e8b86d]/10 blur-[110px]" />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(128,100,255,0.12),transparent_65%)]" />

                {/* Círculos orbitais */}
                <motion.div
                    className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e8c98b]/[0.08] sm:h-[390px] sm:w-[390px]"
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : { rotate: 360 }
                    }
                    transition={{
                        duration: 80,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <motion.div
                    className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#a875ff]/10 sm:h-[460px] sm:w-[460px]"
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : { rotate: -360 }
                    }
                    transition={{
                        duration: 110,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Estrelas */}
                {Array.from({ length: 18 }).map((_, index) => {
                    const positions = [
                        [12, 18], [82, 15], [22, 32],
                        [91, 37], [8, 48], [86, 58],
                        [16, 72], [78, 80], [34, 12],
                        [68, 23], [94, 68], [28, 88],
                        [57, 91], [43, 24], [6, 83],
                        [72, 43], [39, 78], [59, 67],
                    ];

                    const [left, top] = positions[index];

                    return (
                        <motion.div
                            key={index}
                            className="absolute h-1 w-1 rounded-full bg-[#ffe8ae]"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            animate={
                                prefersReducedMotion
                                    ? undefined
                                    : {
                                        opacity: [0.15, 0.9, 0.15],
                                        scale: [0.7, 1.35, 0.7],
                                    }
                            }
                            transition={{
                                duration: 2.5 + (index % 4),
                                delay: index * 0.17,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </div>

            {/* Cabeçalho */}
            <motion.div
                {...enter(0.1)}
                className="relative z-10 flex flex-col items-center gap-3 text-center"
            >
                <Sparkles
                    size={19}
                    strokeWidth={1.3}
                    className="text-[#e8c98b]"
                />

                <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#e8c98b]/80 sm:text-xs">
                    E a história continua
                </p>

                <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#e8c98b]/70 to-transparent" />
            </motion.div>

            {/* Mensagem central */}
            <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
                <motion.p
                    {...enter(0.35)}
                    className="max-w-[310px] text-[clamp(1.55rem,6.7vw,2.5rem)] font-black uppercase leading-[1.08] tracking-[-0.045em] text-[#fff4d6] sm:text-4xl"
                >
                    Que venham os
                    <br />
                    próximos
                </motion.p>

                {/* Número em destaque */}
                <motion.div
                    {...enter(0.65)}
                    className="relative my-1 flex flex-col items-center"
                >
                    <motion.div
                        className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-[#a875ff]/15 blur-3xl"
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : { opacity: [0.35, 0.8, 0.35], scale: [1.2, 1.55, 1.2] }
                        }
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.span
                        className="relative font-serif text-[clamp(4.5rem,19vw,6rem)] font-medium leading-[1.12] tracking-[-0.08em] text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, #fff2c9 5%, #e8c98b 42%, #a875ff 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            filter: "drop-shadow(0 0 28px rgba(168,117,255,0.22))",
                        }}
                    >
                        {animatedMinutes.toLocaleString("pt-BR")}
                    </motion.span>

                    <motion.div
                        className="mt-1 flex items-center gap-3"
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{
                            duration: 1,
                            delay: prefersReducedMotion ? 0 : 1,
                        }}
                    >
                        <span className="h-px w-8 bg-[#e8c98b]/50" />
                        <Heart
                            size={13}
                            fill="#e8c98b"
                            className="text-[#e8c98b]"
                        />
                        <span className="h-px w-8 bg-[#e8c98b]/50" />
                    </motion.div>
                </motion.div>

                <motion.p
                    {...enter(0.9)}
                    className="mt-3 text-[clamp(1.7rem,7vw,2.7rem)] font-black uppercase leading-none tracking-[-0.045em] text-[#fff4d6] sm:text-4xl"
                >
                    Minutos.
                </motion.p>

                <motion.p
                    {...enter(1.15)}
                    className="mt-5 max-w-[260px] text-sm leading-relaxed text-[#fff4d6]/55"
                >
                    E que cada um deles traga uma nova lembrança
                    para guardar.
                </motion.p>
            </div>

            {/* Assinatura */}
            <motion.div
                {...enter(1.4)}
                className="relative z-10 flex flex-col items-center gap-1.5 text-center"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#fff4d6]/45">
                    com amor,
                </span>

                <motion.p
                    className="font-['Dancing_Script',cursive] text-4xl text-[#e8c98b] sm:text-5xl"
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : {
                                textShadow: [
                                    "0 0 8px rgba(232,201,139,0.08)",
                                    "0 0 24px rgba(232,201,139,0.3)",
                                    "0 0 8px rgba(232,201,139,0.08)",
                                ],
                            }
                    }
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {couple.names.man}
                </motion.p>

                <div className="mt-2 flex items-center gap-2 text-[#e8c98b]/40">
                    <span className="h-px w-8 bg-current" />
                    <Heart size={10} />
                    <span className="h-px w-8 bg-current" />
                </div>
            </motion.div>
        </section>
    );
}
