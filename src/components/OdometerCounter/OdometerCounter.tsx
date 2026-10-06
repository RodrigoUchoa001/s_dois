import { motion } from "motion/react";

type OdometerCounterProps = {
    value: number;
};

function OdometerDigit({ digit }: { digit: string }) {
    const numericDigit = Number(digit);
    const digitHeight = 48;

    return (
        <div
            className="relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-b from-[#292929] via-[#171717] to-[#292929] shadow-inner"
            style={{
                height: digitHeight,
                width: 30,
            }}
        >
            {/* Sombra superior e inferior */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Rolo de números */}
            <motion.div
                initial={false}
                animate={{
                    y: -numericDigit * digitHeight,
                }}
                transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                }}
                className="absolute left-0 top-0 flex w-full flex-col"
            >
                {Array.from({ length: 10 }, (_, number) => (
                    <div
                        key={number}
                        className="flex shrink-0 items-center justify-center font-mono text-3xl font-bold tabular-nums text-white"
                        style={{ height: digitHeight }}
                    >
                        {number}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function OdometerCounter({
    value,
}: OdometerCounterProps) {
    const formattedValue = Math.max(0, Math.floor(value)).toLocaleString(
        "pt-BR"
    );

    return (
        <div
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-[#0b0b0b] p-2 shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
            aria-label={`${formattedValue} vezes`}
            role="img"
        >
            {formattedValue.split("").map((character, index) => {
                if (/\d/.test(character)) {
                    return (
                        <OdometerDigit
                            key={`digit-${index}`}
                            digit={character}
                        />
                    );
                }

                return (
                    <span
                        key={`separator-${index}`}
                        className="px-0.5 font-mono text-2xl font-bold text-white/80"
                    >
                        {character}
                    </span>
                );
            })}
        </div>
    );
}