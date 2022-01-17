import { Target, FilePattern } from "shared-modules";
import fs from 'fs';
import moment from 'moment';
import * as ExifReader from 'exifreader';
import { getImagePath } from "./utils/fileUtils";
import { convertExifDateToMoment } from "./utils/dateUtils";
import { ImagePatternProcessor } from "./utils/ImagePatternProcessor";

export interface PhotosInput {
    targetProperties: Target,
    filePatterns: FilePattern[],
    sourceFolderLocations: string[]
}



export async function processPhotosConfig({ targetProperties, sourceFolderLocations, filePatterns }: PhotosInput) {
    let allPhotos = [];

    const imagePatternProcessors = filePatterns.map(filePattern => new ImagePatternProcessor(filePattern));
    for (const sourceFolderLocation of sourceFolderLocations) {
        const fileNames = fs.readdirSync(sourceFolderLocation);
        for (const fileName of fileNames) {
            const imagePath = getImagePath(sourceFolderLocation, fileName);
            for (let i = 0; i < imagePatternProcessors.length; i++) {
                const dateAndSequence = await imagePatternProcessors[i].getImageDateAndSequence(fileName, imagePath);
                if (dateAndSequence) {
                    const fileDate = dateAndSequence.date;
                    const fileSequence = dateAndSequence.sequence;
                    console.log(fileDate);
                    console.log(fileSequence);
                    allPhotos.push({ imagePath, fileDate, fileSequence });
                    break;
                }
            }
        }

    };

    console.log(allPhotos);
    return "fuck";
}