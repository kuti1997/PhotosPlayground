import { GetSimulationRequest,Message, STATUS } from "shared-modules";
import fs from 'fs';
import { getImagePath, getNewImageName, sortImages } from "../utils/fileUtils";
import { ImagePatternProcessor } from "../utils/ImagePatternProcessor";
import { ImageMetadata } from "../models/image.model";
export async function processPhotosConfig(request: GetSimulationRequest): Promise<Message> {
    const { targetProperties, sourceFolderLocations, filePatterns } = request;

    let allPhotos: ImageMetadata[] = [];

    const imagePatternProcessors = filePatterns.map(filePattern => new ImagePatternProcessor(filePattern));

    for (const sourceFolderLocation of sourceFolderLocations) {
        const imageNames = fs.readdirSync(sourceFolderLocation);

        for (const imageName of imageNames) {
            const imagePath = getImagePath(sourceFolderLocation, imageName);
            const imageMetadata = await getImageMetadata(imagePatternProcessors, imageName, imagePath);

            if (!imageMetadata) {
                console.log(`image ${imagePath} doesn't match any pattern`);
            }
            else {
                allPhotos.push({ ...imageMetadata, imagePath });
            }
        }
    };

    const sortedImages = allPhotos.sort(sortImages);
    let error = '';

    for (let index = 0; index < sortedImages.length; index++) {
        const imageMetaData = sortedImages[index]
        const newImageName = getNewImageName(imageMetaData.date, index + 1, targetProperties);
        const originalPath = imageMetaData.imagePath;
        const newPath = getImagePath(targetProperties.outputFolderLocation, newImageName)
        try {
            fs.renameSync(originalPath, newPath)
        }
        catch (exception) {
            error = `file in ${originalPath} had an error, error is ${exception}`;
            console.log(error)
            break;
        }
    }

    return error ? {status: STATUS.ERROR, payload: error} : {status: STATUS.SUCCESS};
}

const getImageMetadata = async (imagePatternProcessors: ImagePatternProcessor[], imageName: string, imagePath: string) => {
    for (let i = 0; i < imagePatternProcessors.length; i++) {
        const imageMetadata = await imagePatternProcessors[i].getImageDateAndSequence(imageName, imagePath);
        if (imageMetadata) {
            return imageMetadata;
        }
    }
}