import isToday from "date-fns/is_today";

export function formatDate(unixTime) {
    const date = new Date(unixTime),
        getDate = new Date(unixTime).getDate(),
        month = date.toLocaleDateString("en-GB", { month: "long" });

    return `${month} ${getDate}`;
}

export function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export function displayDateTime(createdAt) {
    const mailDate = new Date(createdAt),
    isNewMail = isToday(mailDate)
    return isNewMail ? formatAMPM(mailDate) : formatDate(createdAt);
}
