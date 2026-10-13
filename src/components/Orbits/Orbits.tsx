import { motion } from "motion/react";

export function Orbits() {
    return (
        <>
            {/* ==================================================
                ÓRBITAS DECORATIVAS
            ================================================== */}

            <div
                className="
                    pointer-events-none absolute left-[calc(50%-20px)] top-[44%]
                    h-[340px] w-[340px] -translate-x-1/2
                    -translate-y-1/2 rounded-full
                    border border-[#A99AFF]/10 pr-7
                "
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="
                    pointer-events-none absolute left-[calc(50%-20px)] top-[44%]
                    h-[285px] w-[285px] -translate-x-1/2
                    -translate-y-1/2 rounded-full
                    border border-dashed border-[#A99AFF]/20
                "
            />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 70,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    pointer-events-none absolute left-[calc(50%-20px)] top-[44%]
                    h-[310px] w-[310px] -translate-x-1/2
                    -translate-y-1/2
                "
            >
                <div className="
                    absolute left-1/2 top-0
                    h-2.5 w-2.5 -translate-x-1/2
                    rounded-full bg-[#D8C8FF]
                    shadow-[0_0_14px_rgba(168,117,255,0.9)]
                " />

                <div className="
                    absolute bottom-[17%] right-[8%]
                    h-1.5 w-1.5 rounded-full
                    bg-[#E6C889]
                    shadow-[0_0_12px_rgba(230,200,137,0.8)]
                " />
            </motion.div>
        </>
    );
}