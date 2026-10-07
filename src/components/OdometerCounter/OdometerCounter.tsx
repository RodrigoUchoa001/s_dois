import { motion } from "motion/react";

type OdometerCounterProps = {
    value: number;
};

const DIGIT_HEIGHT = 42;

function OdometerDigit({
    digit,
}: {
    digit: string;
}) {
    const numericDigit = Number(digit);

    return (
        <div
            className="relative overflow-hidden rounded-[10px] border border-[#fff3c7]/10 bg-[#0b0b2b]/70 shadow-[inset_0_1px_0_rgba(255,243,199,0.05)] backdrop-blur-sm"
            style={{
                height: DIGIT_HEIGHT,
                width: 28,
            }}
        >
            {/* Brilho superior */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-[#fff3c7]/10 to-transparent" />

            {/* Sombra inferior */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Linha central sutil */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px bg-[#a875ff]/10" />

            {/* Rolo */}
            <motion.div
                initial={false}
                animate={{
                    y: -numericDigit * DIGIT_HEIGHT,
                }}
                transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                }}
                className="absolute left-0 top-0 flex w-full flex-col"
            >
                {Array.from(
                    { length: 10 },
                    (_, number) => (
                        <div
                            key={number}
                            className="flex shrink-0 items-center justify-center font-mono text-2xl font-black tabular-nums text-[#fff3c7]"
                            style={{
                                height: DIGIT_HEIGHT,
                            }}
                        >
                            {number}
                        </div>
                    )
                )}
            </motion.div>
        </div>
    );
}

export function OdometerCounter({
    value,
}: OdometerCounterProps) {
    const formattedValue = Math.max(
        0,
        Math.floor(value)
    ).toLocaleString("pt-BR");

    return (
        <div
            className="inline-flex items-center gap-1 rounded-[16px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-2 backdrop-blur-sm"
            aria-label={`${formattedValue} vezes`}
            role="img"
        >
            {formattedValue
                .split("")
                .map((character, index) => {
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
                            className="px-0.5 font-mono text-xl font-black text-[#a875ff]"
                        >
                            {character}
                        </span>
                    );
                })}
        </div>
    );
}