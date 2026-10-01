import { differenceInMinutes } from "date-fns";
import { couple } from "../data/couple";

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