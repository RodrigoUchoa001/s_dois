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

// próxima primeira lua cheia depois do início do namoro: 29 de julho de 2026
// então, calcula quantas luas cheias se passaram desde então, considerando que cada ciclo lunar dura aproximadamente 29,53 dias.
export function getFullMoonDaysTogether() {
    const now = new Date();

    let fullMoonDays = 1;
    const fullMoonDay = new Date(2026, 7, 29); // 29 de julho de 2026
    
    while (fullMoonDay <= now) {
        fullMoonDays++;
        fullMoonDay.setDate(fullMoonDay.getDate() + 29.53);
    }

    return fullMoonDays;
}

// próxima primeira mudança de estação depois do início do namoro: 21 de junho de 2026
export function getSeasonsTogether() {
    const now = new Date();

    let seasonsPassed = 1;
    const startDate = new Date(2026, 6, 21); // 21 de junho de 2026

    while (startDate <= now) {
        seasonsPassed++;
        startDate.setMonth(startDate.getMonth() + 3);
    }
    
    return seasonsPassed;
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

export function getMonthName(monthNumber: number): string {
    const date = new Date(0);
    date.setUTCMonth(monthNumber - 1);
    return date.toLocaleString("pt-BR", { month: "long" });
}

export function getMusicPlayedTimes() {
    const musicTimeInSeconds = 5 * 60 + 53; // 5 minutos e 53 segundos
    return Math.floor(getMinutesTogether() / musicTimeInSeconds);
}

export function getMoonPhase(
    day: number,
    month: number,
    year: number
) {
    const date = new Date(
        year,
        month - 1,
        day,
        12,
        0,
        0
    );

    /*
     * Data de referência de uma Lua Nova.
     */
    const knownNewMoon =
        new Date("2000-01-06T18:14:00Z");

    const synodicMonth = 29.530588853;

    const difference =
        date.getTime() -
        knownNewMoon.getTime();

    const days =
        difference / (1000 * 60 * 60 * 24);

    let phase =
        (days % synodicMonth) /
        synodicMonth;

    if (phase < 0) {
        phase += 1;
    }

    const illumination =
        (1 -
            Math.cos(
                phase * Math.PI * 2
            )) /
        2;

    return {
        phase,
        illumination,
    };
}

export function getMoonPhaseName(
    phase: number
) {
    if (phase < 0.0625) {
        return "NOVA";
    }

    if (phase < 0.1875) {
        return "CRESCENTE";
    }

    if (phase < 0.3125) {
        return "CRESCENTE";
    }

    if (phase < 0.4375) {
        return "CRESCENTE";
    }

    if (phase < 0.5625) {
        return "CHEIA";
    }

    if (phase < 0.6875) {
        return "MINGUANTE";
    }

    if (phase < 0.8125) {
        return "MINGUANTE";
    }

    if (phase < 0.9375) {
        return "MINGUANTE";
    }

    return "NOVA";
}