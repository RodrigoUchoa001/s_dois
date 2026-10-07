import { Heart } from "lucide-react";
import { motion } from "motion/react";

export function StoryHeader({text}: {text: string}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -15,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: 0.15,
            }}
            className="mb-4 flex items-center gap-3"
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff3c7] text-[#0b0b2b]">
                <Heart
                    size={18}
                    fill="currentColor"
                    strokeWidth={2.5}
                />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.22em]">
                {text}
            </p>
        </motion.div>
    );
}