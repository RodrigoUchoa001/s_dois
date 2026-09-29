import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

import { couple } from "../../data/couple";

export function CoupleMessage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Card da mensagem */}
            <motion.div
                layout
                className="overflow-hidden rounded-3xl bg-[#3d7fca] p-8 text-white shadow-xl"
            >
                <div className="flex min-h-100 flex-col">
                <h2 className="text-2xl font-bold">
                    Mensagem especial
                </h2>

                {/* Prévia */}
                <div className="mt-10">
                    <p className="text-4xl font-bold leading-tight *:whitespace-pre-line line-clamp-4">
                    {couple.message}
                    </p>
                </div>

                {/* Botão */}
                <div className="mt-auto pt-10">
                    <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-full bg-white px-8 py-4 text-lg font-semibold text-[#292929] transition hover:scale-105"
                    >
                    Mostrar Mensagem
                    </button>
                </div>
                </div>
            </motion.div>

            {/* Mensagem expandida */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#3d7fca] px-6 py-10"
                    >
                        {/* Botão fechar */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-6 top-6 rounded-full p-2 text-white transition hover:bg-white/10"
                            aria-label="Fechar mensagem"
                        >
                            <X size={32} />
                        </button>

                        {/* Conteúdo */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-full max-w-3xl overflow-y-scroll scrollbar-none"
                        >
                        <h2 className="text-xl font-bold md:text-5xl text-center pt-10">
                            Mensagem especial
                        </h2>

                        <div className="text-4xl font-bold mt-12 whitespace-pre-line leading-relaxed md:text-2xl p-2">
                            {couple.message}
                        </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}