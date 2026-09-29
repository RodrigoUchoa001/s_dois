import { motion } from "motion/react";
import { useState } from "react";

export function WrappedBox() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* box */}
            <motion.div
                layout
                className="overflow-hidden rounded-3xl bg-[#111111] p-8 text-white shadow-xl text-center"
            >
                <h2 className="text-2xl font-bold">Seu Relacionamento Wrapped</h2>
                <p className="text-white/50">Explore seu tempo em casal</p>
                {/* Botão */}
                <div className="mt-auto pt-10">
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="rounded-full w-full bg-white px-8 py-4 text-lg font-semibold text-[#292929] transition hover:scale-105"
                    >
                    Mostrar Wrapped
                    </button>
                </div>
            </motion.div>

            {/* wrapped */}
        </>
    );
}