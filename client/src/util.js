export function formatDate(date) {
    const currentDate = new Date();
    const difference = currentDate - date;
    //Determine corresponding time values
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));

    if (seconds < 60) {
        return seconds + " seconds ago";
    } else if (minutes < 60) {
        return minutes + " minutes ago";
    } else if (hours < 24) {
        return hours + " hours ago";
    } else {
        const time = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, time) + ` at ${date.getHours()}:${date.getMinutes()}`;
    }
}

const linkRegex = /\[(?<name>[^\]]*)\]\((?<hyperlink>[^)]*)\)/g;
//to get the contents of the hyperlink in a Question text content
export function findLinks(text) {
    const result = [...text.matchAll(linkRegex)];

    return result.map((link) => link.groups);
}