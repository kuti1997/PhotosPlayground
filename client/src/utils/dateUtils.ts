import moment from 'moment';

export const isDateFormatValid = (format: string) => {
    const now = moment();
    const momentInvalidDate = moment.invalid().format();
    return now.format(format) === momentInvalidDate;
}