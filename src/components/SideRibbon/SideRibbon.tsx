import { motion } from "motion/react";

interface SideRibbonProps {
    text: string;
}

export function SideRibbon({ text }: SideRibbonProps) {
    return (
        <div className="absolute right-0 top-0 z-9 h-full w-10 overflow-hidden border-l-2 border-[#fff3c7]/20 bg-[#8064ff]">
                <motion.div
                    animate={{
                        y: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 9,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="absolute left-0 top-0 flex w-full flex-col"
                >
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className="flex shrink-0 items-center justify-center"
                        >
                            <span
                                className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-[#fff3c7]"
                                style={{
                                    writingMode: "vertical-rl",
                                    transform: "rotate(180deg)",
                                }}
                            >
                                {text}✦
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
    );
}