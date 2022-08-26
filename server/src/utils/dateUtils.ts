import moment from "moment"

export const IMAGE_DATE_FORMAT = "YYYY:MM:DD HH:mm:ss";

export const convertExifDateToMoment = (exifDate: string) => {
    return exifDate
        ? moment(exifDate, IMAGE_DATE_FORMAT)
        : null;
}

export const areSameDates = (date1: moment.Moment, date2: moment.Moment) => {
    return date1.format('YYYY:MM:DD HH:mm') === date2.format('YYYY:MM:DD HH:mm')
}