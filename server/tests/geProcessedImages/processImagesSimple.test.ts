import moment from "moment";
import { getProcessedImages } from "../../src/imageSort/imageSort";
import { convertDateToString, createImageInFolder, createRootFolder, deleteFolder, deleteRootFolder, getImageFolderPath, getImagePath, getImageWithDateString } from "../imageUtils";

describe('process one image', () => {
    beforeAll(() => {
        createRootFolder();
    });

    describe("process one image with exif date", () => {
        const date = moment();
        const imageName = 'a_1.png';
        const imageFolderName = 'kuti';

        beforeAll(() => {
            createImageInFolder(imageFolderName, imageName, date);
        });

        test("process one image positive", async () => {
            const filePatterns = [{
                namePattern: '{any}_{sequence}',
                datePattern: '',
                sequenceLength: 1
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            const sortedImages = await getProcessedImages(imageFolders, filePatterns);

            const expectedImageWihtoutDate = {
                imagePath: getImagePath(imageFolderName, imageName),
                sequence: 1,
                extension: 'png',
                date: convertDateToString(date)
            }

            expect(getImageWithDateString(sortedImages[0])).toStrictEqual(expectedImageWihtoutDate)
        })

        test("process one image wrong name pattern", async () => {
            const filePatterns = [{
                namePattern: '{any}1_{sequence}',
                datePattern: '',
                sequenceLength: 1
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getProcessedImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        test("process one image wrong sequence length", async () => {
            const filePatterns = [{
                namePattern: '{any}_{sequence}',
                datePattern: '',
                sequenceLength: 2
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getProcessedImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        afterAll(() => {
            deleteFolder(imageFolderName);
        })
    })

    describe("process one image wihtout exif", () => {
        const stringDate = '14_07_1993'
        const datePattern = 'DD_MM_YYYY'
        const imageName = `a_${stringDate}_21.png`;
        const imageFolderName = 'kuti';

        beforeEach(() => {
            createImageInFolder(imageFolderName, imageName);
        });

        test("process one image positive", async () => {
            const filePatterns = [{
                namePattern: '{any}_{date}_{sequence}',
                datePattern,
                sequenceLength: 2
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            const sortedImages = await getProcessedImages(imageFolders, filePatterns);

            const expectedImageWihtoutDate = {
                imagePath: getImagePath(imageFolderName, imageName),
                sequence: 21,
                extension: 'png',
                date: convertDateToString(moment(stringDate, datePattern))
            }

            expect(getImageWithDateString(sortedImages[0])).toStrictEqual(expectedImageWihtoutDate)
        })

        test("process one image without date", async () => {
            const filePatterns = [{
                namePattern: '{any}_{sequence}',
                datePattern,
                sequenceLength: 2
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getProcessedImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        test("process one image with wrong date pattern", async () => {
            const filePatterns = [{
                namePattern: '{any}_{date}_{sequence}',
                datePattern: 'YYYY_MM_DD',
                sequenceLength: 2
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getProcessedImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        test("process one image with wrong sequence length", async () => {
            const filePatterns = [{
                namePattern: '{any}_{date}_{sequence}',
                datePattern,
                sequenceLength: 3
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getProcessedImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        afterEach(() => {
            deleteFolder(imageFolderName);
        })
    })

    afterAll(() => {
        deleteRootFolder();
    })
});

