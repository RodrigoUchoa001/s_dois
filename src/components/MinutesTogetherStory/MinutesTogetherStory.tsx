import { motion } from "motion/react";
import { couple } from "../../data/couple";
import { getMonthName } from "../../utils/date";

export function MinutesTogetherStory({ animatedMinutes }: { animatedMinutes: number }) {
    return (
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
                    Desde {couple.startDay} de {getMonthName(couple.startMonth)} de {couple.startYear}, nós já dividimos
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
    );
}