import { differenceInDays, differenceInMinutes } from "date-fns";
import { couple } from "../data/couple";
import { useEffect, useState } from "react";

export function getCoupleStartDate() {
    return new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay
    );
}

export function getMinutesTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();

    return differenceInMinutes(now, startDate);
}

// PARA WE IN NUMBERS STORY
export function getDaysTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();

    return differenceInDays(now, startDate);
}

export function getWeekendsTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();

    return differenceInDays(now, startDate) / 7;
}

export function getFullMoonDaysTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();

    // Cada ciclo lunar dura aproximadamente 29,53 dias. 
    return Math.floor(differenceInDays(now, startDate) / 29.53);
}

export function getSeasonsTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();
    
    return Math.floor(differenceInDays(now, startDate) / 90);
}

export function getHeartbeatsTogether() {
    const startDate = getCoupleStartDate();
    const now = new Date();


    return Math.floor(differenceInMinutes(now, startDate) * 70); // 70 batimentos por minuto
}

export function useAnimatedNumber(target: number, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let animationFrame: number;
        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out: começa rápido e desacelera no final
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setValue(Math.floor(target * easedProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [target, duration]);

    return value;
}