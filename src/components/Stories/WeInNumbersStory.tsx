import { motion } from "motion/react";
import {
    Heart,
    Sparkles,
    CalendarDays,
    Moon,
    Sun,
    Activity,
} from "lucide-react";

import {
    getDaysTogether,
    getFullMoonDaysTogether,
    getHeartbeatsTogether,
    getSeasonsTogether,
    getWeekendsTogether,
    useAnimatedNumber,
} from "../../utils/date";
import { SideRibbon } from "../SideRibbon/SideRibbon";

type NumberItemProps = {
    quantity: number;
    description: string;
    icon: React.ReactNode;
    index: number;
};

function NumberItem({
    quantity,
    description,
    icon,
    index,
}: NumberItemProps) {
    const formattedQuantity =
        quantity > 1_000_000
            ? `${Math.floor(quantity / 1_000_000)}MI`
            : quantity.toLocaleString("pt-BR");

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -30,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                delay: 0.3 + index * 0.12,
                duration: 0.5,
                ease: "easeOut",
            }}
            className="group relative"
        >
            {/* Linha */}
            <div className="flex items-center gap-4 py-3">
                {/* Ícone */}
                <motion.div
                    initial={{
                        scale: 0,
                        rotate: -20,
                    }}
                    animate={{
                        scale: 1,
                        rotate: 0,
                    }}
                    transition={{
                        delay: 0.4 + index * 0.12,
                        type: "spring",
                        stiffness: 200,
                    }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a875ff] text-[#0b0b2b]"
                >
                    {icon}
                </motion.div>

                {/* Número */}
                <motion.div
                    whileHover={{
                        scale: 1.04,
                    }}
                    className="relative shrink-0 overflow-hidden rounded-xl bg-[#fff3c7] px-3 py-2 text-[#0b0b2b] shadow-[4px_4px_0_#8064ff]"
                >
                    <motion.span
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.5 + index * 0.12,
                        }}
                        className="block text-2xl font-black leading-none tracking-tight"
                    >
                        {formattedQuantity}
                    </motion.span>
                </motion.div>

                {/* Descrição */}
                <motion.p
                    initial={{
                        opacity: 0,
                        x: 10,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.6 + index * 0.12,
                    }}
                    className="text-sm font-bold leading-tight text-[#fff3c7]/75"
                >
                    {description}
                </motion.p>
            </div>

            {/* Separador */}
            <motion.div
                initial={{
                    scaleX: 0,
                    opacity: 0,
                }}
                animate={{
                    scaleX: 1,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.55 + index * 0.12,
                    duration: 0.4,
                }}
                className="h-px origin-left bg-[#fff3c7]/15"
            />
        </motion.div>
    );
}

export function WeInNumbersStory() {
    const animatedDays = useAnimatedNumber(
        getDaysTogether(),
    );

    const animatedWeekends = useAnimatedNumber(
        getWeekendsTogether(),
    );

    const animatedFullMoonDays = useAnimatedNumber(
        getFullMoonDaysTogether(),
    );

    const animatedSeasons = useAnimatedNumber(
        getSeasonsTogether(),
    );

    const animatedHeartbeats = useAnimatedNumber(
        getHeartbeatsTogether(),
    );

    const numbers = [
        {
            quantity: animatedDays,
            description: "dias juntos",
            icon: <CalendarDays size={17} strokeWidth={2.5} />,
        },
        {
            quantity: animatedWeekends,
            description: "fins de semana juntos",
            icon: <Heart size={17} fill="currentColor" />,
        },
        {
            quantity: animatedFullMoonDays,
            description: "luas cheias juntos",
            icon: <Moon size={17} fill="currentColor" />,
        },
        {
            quantity: animatedSeasons,
            description: "estações juntos",
            icon: <Sun size={17} fill="currentColor" />,
        },
        {
            quantity: animatedHeartbeats,
            description: "batidas do coração enquanto isso",
            icon: <Activity size={17} strokeWidth={2.5} />,
        },
    ];

    return (
        <motion.div
            key="numbers"
            initial={{
                opacity: 0,
                scale: 1.05,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0.95,
            }}
            transition={{
                duration: 0.5,
            }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.18,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#8064ff] blur-[110px]"
            />

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.12,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.2,
                }}
                className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#a875ff] blur-[110px]"
            />

            {/* Estrelas */}
            <motion.div
                initial={{
                    opacity: 0,
                    rotate: -30,
                }}
                animate={{
                    opacity: 1,
                    rotate: 0,
                }}
                transition={{
                    delay: 0.7,
                }}
                className="absolute right-18 top-17"
            >
                <Sparkles
                    size={18}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    delay: 1,
                }}
                className="absolute bottom-24 left-8"
            >
                <Sparkles
                    size={12}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            {/* =====================================================
                FITA LATERAL
            ====================================================== */}

            <SideRibbon text="Nós em números" />

            {/* =====================================================
                CONTEÚDO
            ====================================================== */}

            <div className="relative z-10 flex h-full flex-col px-7 pb-8 pr-14 pt-8">
                {/* Cabeçalho */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.15,
                    }}
                >
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff3c7] text-[#0b0b2b]">
                            <Heart
                                size={18}
                                fill="currentColor"
                                strokeWidth={2.5}
                            />
                        </div>

                        <p className="text-xs font-black uppercase tracking-[0.22em]">
                            Nossa história
                        </p>
                    </div>

                    <h1 className="max-w-xs text-4xl font-black uppercase leading-[0.9] tracking-tight">
                        O nosso amor,
                        <br />
                        em números.
                    </h1>

                    <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-[#fff3c7]/55">
                        Porque algumas histórias também podem ser
                        contadas através de números.
                    </p>
                </motion.div>

                {/* =================================================
                    NÚMEROS
                ================================================= */}

                <div className="mt-auto">
                    {numbers.map((item, index) => (
                        <NumberItem
                            key={item.description}
                            quantity={item.quantity}
                            description={item.description}
                            icon={item.icon}
                            index={index}
                        />
                    ))}
                </div>

                {/* Rodapé */}
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 1.2,
                    }}
                    className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#fff3c7]/30"
                >
                    E contando...
                </motion.p>
            </div>
        </motion.div>
    );
}