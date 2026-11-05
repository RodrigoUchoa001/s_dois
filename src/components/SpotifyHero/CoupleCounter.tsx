
import { useState, useEffect } from "react";

import {
    addYears,
    addMonths,
    addDays,
    addHours,
    differenceInDays,
    differenceInMonths,
    differenceInYears,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
} from "date-fns";

import { couple } from "../../data/couple";

function getStartDate() {
    return new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay,
        couple.startHour,
        couple.startMinute,
        couple.startSecond
    );
}

function getReferenceDate() {
    if (couple.hasItEnded) {
        const {
            endDay,
            endMonth,
            endYear,
            endHour,
            endMinute,
            endSecond,
        } = couple.endDate;

        return new Date(
            endYear,
            endMonth - 1,
            endDay,
            endHour,
            endMinute,
            endSecond
        );
    }

    return new Date();
}

function calculateTimeTogether() {
    const startDate = getStartDate();
    const referenceDate = getReferenceDate();

    if (startDate > referenceDate) {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const years = differenceInYears(referenceDate, startDate);
    const afterYears = addYears(startDate, years);

    const months = differenceInMonths(referenceDate, afterYears);
    const afterMonths = addMonths(afterYears, months);

    const days = differenceInDays(referenceDate, afterMonths);
    const afterDays = addDays(afterMonths, days);

    const hours = differenceInHours(referenceDate, afterDays);
    const afterHours = addHours(afterDays, hours);

    const minutes = differenceInMinutes(referenceDate, afterHours);

    const afterMinutes = new Date(
        afterHours.getTime() + minutes * 60 * 1000
    );

    const seconds = differenceInSeconds(referenceDate, afterMinutes);

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
    };
}

export function CoupleCounter() {
    const [time, setTime] = useState(calculateTimeTogether());

    const isEnded = couple.hasItEnded;

    useEffect(() => {
        if (isEnded) {
            setTime(calculateTimeTogether());
            return;
        }

        const interval = setInterval(() => {
            setTime(calculateTimeTogether());
        }, 1000);

        return () => clearInterval(interval);
    }, [isEnded]);

    const counters = [
        { value: time.years, label: "Anos" },
        { value: time.months, label: "Meses" },
        { value: time.days, label: "Dias" },
        { value: time.hours, label: "Horas" },
        { value: time.minutes, label: "Minutos" },
        { value: time.seconds, label: "Segundos" },
    ];

    return (
        <section className="w-full">
            <div className="flex flex-col p-4">
                <p className="text-2xl font-bold">
                    {couple.names.man} e {couple.names.woman}
                </p>

                <p>
                    {isEnded
                        ? `Uma história iniciada em ${couple.startYear}`
                        : `Juntos desde ${couple.startYear}`}
                </p>

                {isEnded && (
                    <p className="mt-1 text-xs tracking-wide">
                        Tempo que compartilhamos
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
                {counters.map((counter, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-4 text-center"
                    >
                        <p className="text-3xl font-bold">
                            {counter.value}
                        </p>

                        <p>{counter.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
