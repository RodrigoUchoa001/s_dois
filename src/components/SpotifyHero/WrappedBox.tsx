
import { motion } from "motion/react";
import { Sparkles, Archive } from "lucide-react";
import { useState } from "react";

import { couple } from "../../data/couple";
import { StoriesScreen } from "../Stories/StoriesScreen";
import { SideRibbon } from "../SideRibbon/SideRibbon";

export function WrappedBox() {
    const [isOpen, setIsOpen] = useState(false);
    const isEnded = couple.hasItEnded;

    const colors = {
        background: isEnded ? "#17171d" : "#0b0b2b",
        text: isEnded ? "#d0ced5" : "#fff3c7",
        accent: isEnded ? "#88838f" : "#a875ff",
    };

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
                className="relative cursor-pointer overflow-hidden rounded-[28px] border-2 bg-white/[0.025] p-6 text-center"
                style={{
                    borderColor: `${colors.text}15`,
                    color: colors.text,
                }}
            >
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
                    className="mx-auto flex h-14 w-14 rotate-3 items-center justify-center rounded-[18px] border-2"
                    style={{
                        borderColor: `${colors.accent}50`,
                        backgroundColor: `${colors.accent}15`,
                    }}
                >
                    <Archive
                        size={25}
                        style={{ color: colors.accent }}
                    />
                </motion.div>

                <div className="mt-5">
                    <div className="flex items-center justify-center gap-2">
                        {!isEnded && (
                            <Sparkles
                                size={13}
                                fill={colors.accent}
                                style={{ color: colors.accent }}
                            />
                        )}

                        {!isEnded && (
                            <Sparkles
                                size={13}
                                fill={colors.accent}
                                style={{ color: colors.accent }}
                            />
                        )}
                    </div>

                    <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                        {isEnded
                            ? "Uma história em retrospectiva"
                            : "Seu Relacionamento Wrapped"}
                    </h2>

                    <p
                        className="mt-2 text-sm font-medium"
                        style={{ color: `${colors.text}75` }}
                    >
                        {isEnded
                            ? "Relembre os momentos que fizeram parte dessa história."
                            : "Explore o nosso tempo juntos."}
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
                    className="mt-8 w-full rounded-full px-6 py-3.5 text-sm font-black"
                    style={{
                        backgroundColor: colors.accent,
                        color: colors.background,
                    }}
                >
                    {isEnded
                        ? "Revisitar momentos"
                        : "Mostrar Wrapped"}
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
