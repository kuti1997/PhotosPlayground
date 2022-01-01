import { Source, Target } from "shared-modules";
import fs from 'fs';
import moment from 'moment';
import * as ExifReader from 'exifreader';
import { getImagePath } from "./utils/fileUtils";
import { convertExifDateToMoment } from "./utils/dateUtils";

export interface PhotosInput {
    targetProperties: Target,
    sources: Source[]
}

export interface RegexAndMatches {
    regex: string,
    sequenceGroupIndex: number,
    dateGroupIndex: number
}

export function processPhotosConfig({ targetProperties, sources }: PhotosInput) {
    let allPhotos = [];
    sources.forEach(source => {
        const { datePattern, folderLocation } = source;

        fs.readdir(source.folderLocation, function (err, fileNames) {

            const regexAndMatches = getSourceRegexAndMatches(source);

            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            fileNames.forEach(async (fileName) => {
                const imagePath = getImagePath(folderLocation, fileName);
                const fileDate = await getImageDate(fileName, datePattern, regexAndMatches, imagePath);
                const fileSequence = getSequenceFromImageName(fileName, regexAndMatches.regex, regexAndMatches.sequenceGroupIndex);
                allPhotos.push({ imagePath, fileDate, fileSequence })
            });
        })
    });

    console.log(allPhotos);
    return "fuck";
}

const getSequenceFromImageName = (imageName: string, regex: string, sequenceGroupIndex: number) => {
    const sequenceMatches = imageName.match(regex);
    return parseInt(sequenceMatches[sequenceGroupIndex].toString());
}

const getDateTakenFromEXIF = async (imagePath: string) => {
    const tags = await ExifReader.load(fs.readFileSync(imagePath));
    const imageDate = tags['DateTimeOriginal']?.description;
    return convertExifDateToMoment(imageDate);
}

const getImageDate = async (imageName: string, datePattern: string, regexAndMatches: RegexAndMatches, imagePath: string): Promise<moment.Moment> => {
    const imageExifDate = getDateTakenFromEXIF(imagePath);

    if (imageExifDate)
        return await imageExifDate;

    if (regexAndMatches.dateGroupIndex >= 0) {
        return getDateTakenFromImageName(imageName, regexAndMatches.regex, regexAndMatches.dateGroupIndex, datePattern);
    }

    console.error(`file ${imageName} doesn't have exif date and date patern doesn't exist`);
    return null;
}

const getSourceRegexAndMatches = (source: Source): RegexAndMatches => {
    const sequenceIndex = source.imageNamePattern.indexOf("{sequence}");
    const dateIndex = source.imageNamePattern.indexOf("{date}");

    const sequenceGroupIndex = getFirstMatchGroupIndex(sequenceIndex, dateIndex);
    const dateGroupIndex = getFirstMatchGroupIndex(dateIndex, sequenceIndex);

    const { imageNamePattern, sequenceLength } = source;

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

const getFirstMatchGroupIndex = (firstIndex: number, secondIndex: number) => {
    if (firstIndex < 0) {
        return -1;
    }

    if(secondIndex < 0) {
        return 1;
    }

    return firstIndex < secondIndex ? 1 : 2;
}

const getDateTakenFromImageName = (imageName: string, regex: string, dateGroupIndex: number, datePattern: string) => {
    const dateMatches = imageName.match(regex);
    return moment(dateMatches[dateGroupIndex].toString(), datePattern);
}