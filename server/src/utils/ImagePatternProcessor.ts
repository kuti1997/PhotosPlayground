import { FilePattern } from "shared-modules";
import moment from 'moment';
import ExifReader from "exifreader";
import fs from 'fs';
import { convertExifDateToMoment } from "./dateUtils";

export interface RegexAndMatches {
    regex: string,
    sequenceGroupIndex: number,
    dateGroupIndex: number
}

export class ImagePatternProcessor {
    regexAndMatches: RegexAndMatches;
    datePattern: string;

    constructor(filePattern: FilePattern) {
        this.regexAndMatches = this.getSourceRegexAndMatches(filePattern.namePattern, filePattern.sequenceLength);
        this.datePattern = filePattern.datePattern;
    }

    getSourceRegexAndMatches(imageNamePattern: string, sequenceLength: number) {
        const sequenceIndex = imageNamePattern.indexOf("{sequence}");
        const dateIndex = imageNamePattern.indexOf("{date}");

        const sequenceGroupIndex = ImagePatternProcessor.getFirstMatchGroupIndex(sequenceIndex, dateIndex);
        const dateGroupIndex = ImagePatternProcessor.getFirstMatchGroupIndex(dateIndex, sequenceIndex);

        let regex = imageNamePattern;

        if (sequenceGroupIndex => 0) {
            const sequenceRegex = `(\\d{${sequenceLength}})`;
            regex = regex.replace("{sequence}", sequenceRegex);
        }

        if (dateGroupIndex => 0) {
            const dateRegex = "(.+)";
            regex = regex.replace("{date}", dateRegex);
        }

        return { regex, sequenceGroupIndex, dateGroupIndex };
    }

    static getFirstMatchGroupIndex(firstIndex: number, secondIndex: number) {
        if (firstIndex < 0) {
            return -1;
        }

        if (secondIndex < 0) {
            return 1;
        }

        return firstIndex < secondIndex ? 1 : 2;
    }

    getImageDate = async (imageName: string, imagePath: string): Promise<moment.Moment> => {
        const imageExifDate = await this.getDateTakenFromEXIF(imagePath);

        if (imageExifDate)
            return imageExifDate;

        const { regex, dateGroupIndex } = this.regexAndMatches;

        if (this.regexAndMatches.dateGroupIndex >= 0) {
            return ImagePatternProcessor.getDateTakenFromImageName(imageName, regex, dateGroupIndex, this.datePattern);
        }

        console.error(`file ${imageName} doesn't have exif date and date patern doesn't exist`);
        return null;
    }

    static getDateTakenFromImageName = (imageName: string, regex: string, dateGroupIndex: number, datePattern: string) => {
        const dateMatches = imageName.match(regex);
        return moment(dateMatches[dateGroupIndex].toString(), datePattern);
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

    async getImageDateAndSequence(fileName: string, imagePath: string) {
        const { regex, sequenceGroupIndex } = this.regexAndMatches;
        const date = await this.getImageDate(fileName, imagePath);
        const sequence = this.getSequenceFromImageName(fileName, regex, sequenceGroupIndex);
        const isMissingProperty = !date || !sequence;
        return isMissingProperty ? null : { date, sequence };
    }
}