import { motion } from "motion/react";
import { couple } from "../../data/couple";
import { getMusicPlayedTimes, useAnimatedNumber } from "../../utils/date";
import { OdometerCounter } from "../OdometerCounter/OdometerCounter";

export function OurMusicStory() {
    const playedTimes = useAnimatedNumber(
        getMusicPlayedTimes(),
        2000
    );
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-2 pt-4">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-medium text-white/60"
                >
                    A nossa música
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <img
                        src={couple.song.cover}
                        alt={couple.song.title}
                        className="h-64 w-64 rounded-lg object-cover"
                    />
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl font-bold text-white"
                    >
                        {couple.song.title.toUpperCase()}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg font-medium text-white"
                    >
                        {couple.song.artist}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center justify-center gap-4"
                >

                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-6">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-sm font-medium text-white"
                >
                    Se tocasse no repeat desde o primeiro dia, já teria tocado
                </motion.p>
                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <OdometerCounter value={playedTimes} />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-3xl font-medium text-white"
                    >
                        vezes
                    </motion.p>
                </div>
            </div>
                
        
        </motion.div>
    );
}