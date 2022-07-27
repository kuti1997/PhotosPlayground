import { FilePattern } from "shared-modules";
import moment from 'moment';
import ExifReader from "exifreader";
import fs from 'fs';
import { convertExifDateToMoment } from "./dateUtils";
import { ANY_TAG, DATE_TAG, SEQUENCE_TAG } from "./consts";

export interface RegexAndMatches {
    regex: string,
    sequenceGroupIndex: number,
    dateGroupIndex: number,
    extensionGroupIndex: number
}

export class ImagePatternProcessor {
    regexAndMatches: RegexAndMatches;
    datePattern: string;

    constructor(filePattern: FilePattern) {
        this.regexAndMatches = this.getSourceRegexAndMatches(filePattern);
        this.datePattern = filePattern.datePattern;
    }

    getSourceRegexAndMatches({namePattern, sequenceLength, datePattern}: FilePattern) {
        const sequenceIndex = namePattern.indexOf(SEQUENCE_TAG);
        const dateIndex = namePattern.indexOf(DATE_TAG);

        let sequenceGroupIndex, extensionGroupIndex, dateGroupIndex = -1;

        if (dateIndex < 0) {
            sequenceGroupIndex = 1;
            extensionGroupIndex = 2;
        }
        else {
            extensionGroupIndex = 3;

            if (sequenceIndex > dateIndex) {
                sequenceGroupIndex = 2;
                dateGroupIndex = 1;
            }
            else {
                sequenceGroupIndex = 1;
                dateGroupIndex = 2;
            }
        }

        let regex = namePattern;

        const sequenceRegex = `(\\d{${sequenceLength}})`;
        regex = regex.replace(SEQUENCE_TAG, sequenceRegex);

        const dateRegex =`(.{${datePattern.length}})`;
        regex = regex.replace(DATE_TAG, dateRegex);

        regex = regex.replace(ANY_TAG, '.+')

        regex = regex + '\\.(.+)'

        return { regex, sequenceGroupIndex, dateGroupIndex, extensionGroupIndex };
    }

    getImageDate = async (imageName: string, imagePath: string): Promise<moment.Moment> => {
        const imageExifDate = await this.getDateTakenFromEXIF(imagePath);

        if (imageExifDate)
            return imageExifDate;

        if (this.regexAndMatches.dateGroupIndex >= 0) {
            return ImagePatternProcessor.getDateTakenFromImageName(imageName, this.regexAndMatches, this.datePattern);
        }

        console.error(`file ${imageName} doesn't have exif date and date patern doesn't exist`);
        return null;
    }

    static getDateTakenFromImageName = (imageName: string, regexAndMatches: RegexAndMatches, datePattern: string) => {
        const { regex, dateGroupIndex } = regexAndMatches;

        const dateMatches = imageName.match(regex);
        const date = dateMatches?.[dateGroupIndex];

        return date
            ? moment(date, datePattern)
            : null;
    }

    getDateTakenFromEXIF = async (imagePath: string) => {
        const tags = await ExifReader.load(fs.readFileSync(imagePath));
        const imageDate = tags['DateTimeOriginal']?.description;
        return convertExifDateToMoment(imageDate);
    }

    getSequenceFromImageName = (imageName: string, regex: string, sequenceGroupIndex: number) => {
        const sequenceMatches = imageName.match(regex);
        if (sequenceMatches) {
            const sequenceMatchGroup = sequenceMatches[sequenceGroupIndex];
            return sequenceMatchGroup
                ? parseInt(sequenceMatches[sequenceGroupIndex])
                : null;
        }
        return null;
    }

    getImageExtension = (imageName: string, regex: string, extensionGroupIndex: number) => {
        const sequenceMatches = imageName.match(regex);
        return sequenceMatches?.[extensionGroupIndex]
    }

    async getImageMetadata(fileName: string, imagePath: string) {
        const { regex, sequenceGroupIndex, extensionGroupIndex } = this.regexAndMatches;
        const date = await this.getImageDate(fileName, imagePath);
        const sequence = this.getSequenceFromImageName(fileName, regex, sequenceGroupIndex);
        const extension = this.getImageExtension(fileName, regex, extensionGroupIndex);
        const isMissingProperty = !date || !sequence;
        return isMissingProperty ? null : { date, sequence, extension };
    }
}
