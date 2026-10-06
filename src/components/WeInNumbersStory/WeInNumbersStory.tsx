import { motion } from "motion/react";
import { getDaysTogether, getFullMoonDaysTogether, getHeartbeatsTogether, getSeasonsTogether, getWeekendsTogether } from "../../utils/date";
import { useAnimatedNumber } from "../../utils/date";

function getStyledContent({quantity, description}: {quantity: number, description: string}) {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="h-px bg-white w-full" />
            </motion.div>
            <div className="flex items-center">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-bold text-white p-2 flex gap-2 items-center"
                >
                    <div className="text-4xl font-bold text-[#111111] bg-white p-1 w-fit h-fit rounded-sm flex">
                        {(quantity > 1000000) ? Math.floor(quantity / 1000000).toString() + "MI" : quantity}
                    </div>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl font-medium text-white"
                >
                    {description}
                </motion.p>
            </div>
        </>
    );
}

export function WeInNumbersStory() {
    const animatedDays = useAnimatedNumber(getDaysTogether());
    const animatedWeekends = useAnimatedNumber(getWeekendsTogether());
    const animatedFullMoonDays = useAnimatedNumber(getFullMoonDaysTogether());
    const animatedSeasons = useAnimatedNumber(getSeasonsTogether());
    const animatedHeartbeats = useAnimatedNumber(getHeartbeatsTogether());

    return (
        <motion.div
            key="minutes"
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
            className="relative flex h-full w-full flex-col overflow-hidden px-8 p-2"
        >
            <div className="relative z-10 flex h-full flex-col justify-between gap-4 pt-4">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-medium text-white/60"
                >
                    O nosso amor, traduzido em números
                </motion.p>

                <div>
                    {getStyledContent({quantity: animatedDays, description: "dias juntos"})}
                    {getStyledContent({quantity: animatedWeekends, description: "fins de semana juntos"})}
                    {getStyledContent({quantity: animatedFullMoonDays, description: "luas cheias juntos"})}
                    {getStyledContent({quantity: animatedSeasons, description: "estações juntos"})}
                    {getStyledContent({quantity: animatedHeartbeats, description: "batidas do coração enquanto isso"})}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="h-px bg-white w-full" />
                    </motion.div>
                </div>
            </div>
            
        </motion.div>
    );
}