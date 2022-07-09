import { GetSimulationRequest, Message, STATUS, Target } from "shared-modules";
import fs from 'fs';
import { getImagePath, getNewImageName, sortImages } from "../utils/fileUtils";
import { ImagePatternProcessor } from "../utils/ImagePatternProcessor";
import { ImageMetadata } from "../models/image.model";
export async function processPhotosConfig(request: GetSimulationRequest): Promise<Message> {
    const { targetProperties, sourceFolderLocations, filePatterns } = request;

    const imagePatternProcessors = filePatterns.map(filePattern => new ImagePatternProcessor(filePattern));

    let allPhotos: ImageMetadata[];

    let error;

    try {
        allPhotos = await getAllImages(sourceFolderLocations, imagePatternProcessors);
        const sortedImages = allPhotos.sort(sortImages);
        renameFiles(sortedImages, targetProperties)
    }
    catch (exception) {
        error = exception.toString()
    }

    return error ? { status: STATUS.ERROR, payload: error } : { status: STATUS.SUCCESS };
}

const getAllImages = async (sourceFolderLocations: string[], imagePatternProcessors: ImagePatternProcessor[]) => {
    let allPhotos = [];

    for (const sourceFolderLocation of sourceFolderLocations) {
        const imageNames = fs.readdirSync(sourceFolderLocation);

        for (const imageName of imageNames) {
            const imagePath = getImagePath(sourceFolderLocation, imageName);
            const imageMetadata = await getImageMetadata(imagePatternProcessors, imageName, imagePath);

            if (!imageMetadata) {
                throw Error(`image ${imagePath} doesn't match any pattern`);
            }
            else {
                allPhotos.push({ ...imageMetadata, imagePath });
            }
        }
    };

    return allPhotos;
}

const renameFiles = (sortedImages: ImageMetadata[], targetProperties: Target) => {
    for (let index = 0; index < sortedImages.length; index++) {
        const imageMetaData = sortedImages[index]
        const newImageName = getNewImageName(imageMetaData.extension, imageMetaData.date, index + 1, targetProperties);
        const originalPath = imageMetaData.imagePath;
        const newPath = getImagePath(targetProperties.outputFolderLocation, newImageName)

        try {
            fs.renameSync(originalPath, newPath)
        }
        catch (exception) {
            throw Error(`file in ${originalPath} had an error, error is ${exception}`)
        }
    }
}

const getImageMetadata = async (imagePatternProcessors: ImagePatternProcessor[], imageName: string, imagePath: string) => {
    for (let i = 0; i < imagePatternProcessors.length; i++) {
        const imageMetadata = await imagePatternProcessors[i].getImageMetadata(imageName, imagePath);
        if (imageMetadata) {
            return imageMetadata;
        }
    }
}