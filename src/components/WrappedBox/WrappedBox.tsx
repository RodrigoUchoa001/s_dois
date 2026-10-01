import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { StoriesScreen } from "../StoriesScreen/StoriesScreen";

export function WrappedBox() {
    const [isOpen, setIsOpen] = useState(false);
    
    /*
     * Abre o Wrapped
     */
    function openWrapped() {
        setIsOpen(true);
    }

    /*
     * Fecha o Wrapped
     */
    function closeWrapped() {
        setIsOpen(false);
    }

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
                    <StoriesScreen isOpen={isOpen} closeWrapped={closeWrapped} />
                )}
            </AnimatePresence>
        </>
    );
}