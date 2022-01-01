import moment from "moment"

export const convertExifDateToMoment = (exifDate: string) => {
    return exifDate
        ? moment(exifDate, "YYYY:MM:DD HH:mm:ss")
        : null;
}