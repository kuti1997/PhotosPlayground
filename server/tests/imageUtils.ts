import fs from 'fs'
import { createCanvas } from 'canvas'
import piexif from "piexifjs";
import { ImageMetadata } from '../src/models/image.model';
import _ from 'lodash'
import {Moment} from 'moment';
import { areSameDates, IMAGE_DATE_FORMAT } from '../src/utils/dateUtils';

export const ROOT_FOLDER = 'C:\\Users\\Kuti\\Desktop\\testing playground\\dont peepeetouch'

export const createImageInFolder = (folderName: string, imageName: string, date?: Moment) => {
    const parentFolder = `${ROOT_FOLDER}/${folderName}`;

    const imagePath = `${parentFolder}/${imageName}`
    const canvas = createCanvas(1, 1)

    const buffer = canvas.toBuffer('image/jpeg')

    const image = date ? getImageWithDate(buffer, date)  : buffer;

    fs.mkdirSync(parentFolder, { recursive: true })
    fs.writeFileSync(imagePath, image);
}

const getImageWithDate = (imageBuffer: Buffer, date: Moment) => {
    var data = imageBuffer.toString("binary");

    let exif = {};
    exif[piexif.ExifIFD.DateTimeOriginal] = date.format(IMAGE_DATE_FORMAT);
    let exifObj = { "Exif": exif };

    const exifBytes = piexif.dump(exifObj);
    var newData = piexif.insert(exifBytes, data);
    return Buffer.from(newData, "binary");
}

export const createTestFolder = (folderName: string) => {
    const parentFolder = `${ROOT_FOLDER}/${folderName}`;
    fs.mkdirSync(parentFolder, { recursive: true })
}

export const deleteFolder = (folderName: string) => {    
    fs.rmdirSync(`${ROOT_FOLDER}\\${folderName}`, { recursive: true });
}

export const deleteRootFolder = () => {    
    fs.rmdirSync(ROOT_FOLDER, { recursive: true });
}

export const createRootFolder = () => {    
    fs.mkdirSync(ROOT_FOLDER, { recursive: true });
}

export const areImagesEqual = (image1: ImageMetadata, image2: ImageMetadata) => {
    const areEqualWithoutDate = _.isEqual(_.omit(image1, 'date'),_.omit(image2, 'date'))
    return areEqualWithoutDate ? areSameDates(image1.date,image2.date) : false
}

export const getImageFolderPath = (folderName: string) => {
    return `${ROOT_FOLDER}\\${folderName}`
}

export const getImagePath = (folderName: string, imageName: string) => {
    return `${getImageFolderPath(folderName)}\\${imageName}`
}