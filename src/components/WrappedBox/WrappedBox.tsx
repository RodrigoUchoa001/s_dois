import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { StoriesScreen } from "../StoriesScreen/StoriesScreen";
import { SideRibbon } from "../SideRibbon/SideRibbon";

export function WrappedBox() {
    const [isOpen, setIsOpen] = useState(false);

    function openWrapped() {
        setIsOpen(true);
    }

    function closeWrapped() {
        setIsOpen(false);
    }

    return (
        <>
            {/* Card */}
            <motion.div
                layout
                className="relative overflow-hidden rounded-3xl bg-[#111111] p-8 text-center text-white shadow-xl cursor-pointer"
                onClick={openWrapped}
            >
                {/* Faixa lateral */}
                <div className="absolute right-0 top-15 h-full">
                    <SideRibbon text="Wrapped" rotation={45} textDirection="rl" />
                </div>

                <h2 className="text-2xl font-bold text-[#fff3c7]">
                    Seu Relacionamento Wrapped
                </h2>

                <p className="text-white/50">
                    Explore seu tempo em casal
                </p>

                <div className="mt-auto pt-10">
                    <button
                        type="button"
                        onClick={openWrapped}
                        className="rounded-full bg-[#fff3c7] px-8 py-4 text-lg w-[80%] font-semibold text-[#292929] transition hover:scale-105 cursor-pointer"
                    >
                        Mostrar Wrapped
                    </button>
                </div>
            </motion.div>

            {/* Wrapped */}
            <AnimatePresence>
                {isOpen && (
                    <StoriesScreen
                        isOpen={isOpen}
                        closeWrapped={closeWrapped}
                    />
                )}
            </AnimatePresence>
        </>
    );
}