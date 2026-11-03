
import { motion } from "motion/react";
import { Heart } from "lucide-react";

import type { PlaceVisit } from "../../../data/couple";

interface PolaroidProps {
    visit: PlaceVisit;
}

export function Polaroid({ visit }: PolaroidProps) {
    const photoUrl =
        `${import.meta.env.BASE_URL}${visit.photo.src}`;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.92,
                rotate: -3,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: -4,
            }}
            exit={{
                opacity: 0,
                scale: 0.92,
            }}
            transition={{
                duration: 0.3,
            }}
            className="
                relative
                w-[112px]
                overflow-hidden
                rounded-[3px]
                border
                border-[#A99AFF]/20
                bg-[#151633]
                p-[7px]
                ml-4
                pb-3
                shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                pointer-events-none
            "
        >
            {/* REFLEXO */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-5
                    -top-5
                    z-[1]
                    h-16
                    w-16
                    rounded-full
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(120,100,255,0.12), transparent 70%)",
                }}
            />

            {/* FOTO */}

            <div
                className="
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    rounded-[2px]
                    bg-[#11102F]
                "
            >
                <img
                    src={photoUrl}
                    alt={visit.photo.alt}
                    loading="lazy"
                    className="
                        h-full
                        w-full
                        object-cover
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#080B24]/15
                        to-transparent
                    "
                />
            </div>

            {/* TÍTULO */}

            <div
                className="
                    relative
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-1.5
                "
            >
                <Heart
                    size={10}
                    fill="#E6C889"
                    className="shrink-0 text-[#E6C889]/80"
                />

                <h3
                    className="
                        truncate
                        font-serif
                        text-[10px]
                        font-semibold
                        tracking-wide
                        text-[#E6C889]
                    "
                >
                    {visit.photo.title}
                </h3>
            </div>
        </motion.div>
    );
}
