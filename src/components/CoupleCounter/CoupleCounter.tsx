import { useState, useEffect } from "react";
import {
    addYears, addMonths, addDays, addHours,
    differenceInDays, differenceInMonths, differenceInYears,
    differenceInHours, differenceInMinutes, differenceInSeconds
} from "date-fns";
import { couple } from "../../data/couple";

function getStartDate() {
    return new Date(couple.startYear, couple.startMonth - 1, couple.startDay, couple.startHour, couple.startMinute, couple.startSecond);
}

function calculateTimeTogether() {
    const startDate = getStartDate();
    const now = new Date();

    // Evita valores negativos caso a data esteja no futuro
    if (startDate > now) {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }

     // Anos completos
    const years = differenceInYears(now, startDate)

    // Depois dos anos completos
    const afterYears = addYears(startDate, years)

    // Meses completos restantes
    const months = differenceInMonths(now, afterYears)

    // Depois dos meses completos
    const afterMonths = addMonths(afterYears, months)

    // Dias completos restantes
    const days = differenceInDays(now, afterMonths)

    // Depois dos dias completos
    const afterDays = addDays(afterMonths, days)

    // Horas restantes
    const hours = differenceInHours(now, afterDays)

    // Depois das horas
    const afterHours = addHours(afterDays, hours)

    // Minutos restantes
    const minutes = differenceInMinutes(now, afterHours)

    // Depois dos minutos
    const afterMinutes = new Date(
        afterHours.getTime() + minutes * 60 * 1000
    )

    // Segundos restantes
    const seconds = differenceInSeconds(now, afterMinutes)

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    }
}

export function CoupleCounter() {
    const [time, setTime] = useState(calculateTimeTogether());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTimeTogether());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const counters = [
        {
            value: time.years,
            label: "Anos"
        },
        {
            value: time.months,
            label: "Meses"
        },
        {
            value: time.days,
            label: "Dias"
        },
        {
            value: time.hours,
            label: "Horas"
        },
        {
            value: time.minutes,
            label: "Minutos"
        },
        {
            value: time.seconds,
            label: "Segundos"
        },
    ];

    return (
        <section className="w-full">
            <div className="flex flex-col p-4">
                <p className="text-2xl font-bold">{couple.names.man} e {couple.names.woman}</p>
                <p>Juntos desde {couple.startYear}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
                {counters.map((counter, index) => (
                    <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-4 text-center">
                        <p className="text-3xl font-bold">{counter.value}</p>
                        <p>{counter.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}