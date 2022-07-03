import moment from "moment";
import { Target } from "shared-modules";
import { ImageMetadata } from "../models/image.model";

export const getImagePath = (folderPath: string, imageName: string) => {
    return `${folderPath}\\${imageName}`;
}

export const sortImages = (imageMetadata1: ImageMetadata, imageMetadata2: ImageMetadata) => {
    if (!imageMetadata1.date.isSame(imageMetadata2.date)) {
        return imageMetadata1.date.isBefore(imageMetadata2.date) ? -1 : 1;
    }
    return imageMetadata1.sequence < imageMetadata2.sequence ? -1 : 1;
}

export const getNewImageName = (extension: string, originDate: moment.Moment, sequence: number, targetPattern: Target) => {
    let newImageName = targetPattern.namePattern;

    if (targetPattern.namePattern.includes("{date}")) {
        const newDate = originDate.format(targetPattern.datePattern);
        newImageName = newImageName.replace("{date}", newDate);
    }

    if (targetPattern.namePattern.includes("{sequence}")) {
        const paddedSequence = sequence.toString().padStart(targetPattern.sequenceLength, '0');
        newImageName = newImageName.replace("{sequence}", paddedSequence);
    }

    return `${newImageName}.${extension}`;
}