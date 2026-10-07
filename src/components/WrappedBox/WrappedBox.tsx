import { motion } from "motion/react";
import { Sparkles, Timer } from "lucide-react";
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
            <motion.div
                layout
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={openWrapped}
                className="relative cursor-pointer overflow-hidden rounded-[28px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-6 text-center text-[#fff3c7] shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            >
                {/* Faixa */}
                <div className="absolute right-0 top-16">
                    <SideRibbon
                        text="Wrapped"
                        rotation={45}
                        textDirection="rl"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.25,
                        type: "spring",
                    }}
                    className="mx-auto flex h-14 w-14 rotate-3 items-center justify-center rounded-[18px] border-2 border-[#a875ff]/30 bg-[#a875ff]/10"
                >
                    <Timer
                        size={25}
                        className="text-[#a875ff]"
                    />
                </motion.div>

                <div className="mt-5">
                    <div className="flex items-center justify-center gap-2">
                        <Sparkles
                            size={13}
                            fill="#a875ff"
                            className="text-[#a875ff]"
                        />

                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                            nossa retrospectiva
                        </span>

                        <Sparkles
                            size={13}
                            fill="#a875ff"
                            className="text-[#a875ff]"
                        />
                    </div>

                    <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                        Seu Relacionamento Wrapped
                    </h2>

                    <p className="mt-2 text-sm font-medium text-[#fff3c7]/45">
                        Explore o nosso tempo juntos.
                    </p>
                </div>

                <motion.button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        openWrapped();
                    }}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-8 w-full rounded-full bg-[#fff3c7] px-6 py-3.5 text-sm font-black text-[#0b0b2b]"
                >
                    Mostrar Wrapped
                </motion.button>
            </motion.div>

            {isOpen && (
                <StoriesScreen
                    isOpen={isOpen}
                    closeWrapped={closeWrapped}
                />
            )}
        </>
    );
}