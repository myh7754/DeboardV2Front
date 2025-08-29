import dayjs from "dayjs";

export function useDateFormat() {
    function formatDate(isoString) {
        return dayjs(isoString).format("YYYY.MM.DD HH:mm");
    };

    return {formatDate};
}