
import {
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
} from "date-fns";

import { couple } from "../data/couple";
import { useEffect, useState } from "react";

/**
 * Retorna a data de início do relacionamento.
 */
export function getCoupleStartDate() {
    return new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay
    );
}

/**
 * Retorna a data de referência para todos os cálculos.
 *
 * Se o relacionamento terminou, utiliza a data de encerramento.
 * Caso contrário, utiliza a data atual.
 */
export function getCoupleReferenceDate() {
    if (couple.hasItEnded && couple.endDate) {
        return new Date(
            couple.endDate.endYear,
            couple.endDate.endMonth - 1,
            couple.endDate.endDay,
            couple.endDate.endHour ?? 0,
            couple.endDate.endMinute ?? 0,
            couple.endDate.endSecond ?? 0
        );
    }

    return new Date();
}

/**
 * Segundos compartilhados.
 */
export function getSecondsTogether() {
    const startDate = getCoupleStartDate();
    const referenceDate = getCoupleReferenceDate();

    return differenceInSeconds(referenceDate, startDate);
}

/**
 * Minutos compartilhados.
 */
export function getMinutesTogether() {
    const startDate = getCoupleStartDate();
    const referenceDate = getCoupleReferenceDate();

    return differenceInMinutes(referenceDate, startDate);
}

// PARA WE IN NUMBERS STORY

/**
 * Dias compartilhados.
 */
export function getDaysTogether() {
    const startDate = getCoupleStartDate();
    const referenceDate = getCoupleReferenceDate();

    return differenceInDays(referenceDate, startDate);
}

/**
 * Estimativa de semanas compartilhadas.
 */
export function getWeekendsTogether() {
    const startDate = getCoupleStartDate();
    const referenceDate = getCoupleReferenceDate();

    return differenceInDays(referenceDate, startDate) / 7;
}

/**
 * Quantidade estimada de luas cheias desde a referência inicial.
 *
 * Considera um ciclo lunar médio de aproximadamente 29,53 dias.
 */
export function getFullMoonDaysTogether() {
    const referenceDate = getCoupleReferenceDate();

    let fullMoonDays = 1;

    // 29 de julho de 2026
    const firstFullMoon = new Date(2026, 6, 29);

    const lunarCycleInMilliseconds =
        29.530588853 * 24 * 60 * 60 * 1000;

    let nextFullMoon = firstFullMoon.getTime();

    while (nextFullMoon <= referenceDate.getTime()) {
        fullMoonDays++;
        nextFullMoon += lunarCycleInMilliseconds;
    }

    return fullMoonDays;
}

/**
 * Quantidade de mudanças de estação desde a referência inicial.
 */
export function getSeasonsTogether() {
    const referenceDate = getCoupleReferenceDate();

    let seasonsPassed = 1;

    // 21 de junho de 2026
    const nextSeason = new Date(2026, 5, 21);

    while (nextSeason <= referenceDate) {
        seasonsPassed++;
        nextSeason.setMonth(nextSeason.getMonth() + 3);
    }

    return seasonsPassed;
}

/**
 * Estimativa de batimentos cardíacos compartilhados.
 *
 * Considera uma média de 70 batimentos por minuto.
 */
export function getHeartbeatsTogether() {
    const minutes = getMinutesTogether();

    return Math.floor(minutes * 70);
}

/**
 * Anima a transição de um número até seu valor final.
 */
export function useAnimatedNumber(
    target: number,
    duration = 1500
) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let animationFrame: number;

        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out: começa rápido e desacelera no final.
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

/**
 * Retorna o nome de um mês.
 */
export function getMonthName(monthNumber: number): string {
    const date = new Date(0);

    date.setUTCMonth(monthNumber - 1);

    return date.toLocaleString("pt-BR", {
        month: "long",
    });
}

/**
 * Quantidade estimada de vezes que a música foi reproduzida.
 */
export function getMusicPlayedTimes() {
    const musicTimeInSeconds = 5 * 60 + 53;

    return Math.floor(
        getSecondsTogether() / musicTimeInSeconds
    );
}

/**
 * Calcula a fase e a iluminação da lua em uma data específica.
 */
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
        (
            1 -
            Math.cos(phase * Math.PI * 2)
        ) / 2;

    return {
        phase,
        illumination,
    };
}

/**
 * Retorna o nome aproximado da fase lunar.
 */
export function getMoonPhaseName(phase: number) {
    if (phase < 0.0625) {
        return "NOVA";
    }

    if (phase < 0.4375) {
        return "CRESCENTE";
    }

    if (phase < 0.5625) {
        return "CHEIA";
    }

    if (phase < 0.9375) {
        return "MINGUANTE";
    }

    return "NOVA";
}
