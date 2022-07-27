import moment from "moment";
import { createImageInFolder, createRootFolder, deleteFolder, deleteRootFolder } from "../../tests/imageUtils";
import { getImageFolderPath, getImagePath } from "../../tests/imageUtils";
import { getAllImages } from "./imageSort";
import _ from 'lodash'
import { areSameDates } from "../utils/dateUtils";

describe('process and sort images', () => {
    beforeAll(() => {
        createRootFolder();
    });

    describe("one image sort with exif date", () => {
        const date = moment();
        const imageName = 'a_1.png';
        const imageFolderName = 'kuti';

        beforeEach(() => {
            createImageInFolder(imageFolderName, imageName, date);
        });

        test("one image sort positive", async () => {
            const filePatterns = [{
                namePattern: '{any}_{sequence}',
                datePattern: '',
                sequenceLength: 1
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            const sortedImages = await getAllImages(imageFolders, filePatterns);

            const expectedImageWihtoutDate = { imagePath: getImagePath(imageFolderName, imageName), sequence: 1, extension: 'png' }

            expect(_.omit(sortedImages[0], 'date')).toStrictEqual(expectedImageWihtoutDate)

            expect(areSameDates(sortedImages[0].date, date)).toBeTruthy()
        })

        test("one image sort negative", async () => {
            const filePatterns = [{
                namePattern: '{any}1_{sequence}',
                datePattern: '',
                sequenceLength: 1
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            await expect(async () => await getAllImages(imageFolders, filePatterns)).rejects.toThrowError()
        })

        afterAll(() => {
            deleteFolder(imageFolderName);
        })
    })

    describe("one image sort wihtout exif", () => {
        const stringDate = '14_07_1993'
        const datePattern = 'DD_MM_YYYY'
        const imageName = `a_${stringDate}_21.png`;
        const imageFolderName = 'kuti';

        beforeEach(() => {
            createImageInFolder(imageFolderName, imageName);
        });

        test("one image sort positive", async () => {
            const filePatterns = [{
                namePattern: '{any}_{date}_{sequence}',
                datePattern,
                sequenceLength: 2
            }];

            const imageFolders = [getImageFolderPath(imageFolderName)]

            const sortedImages = await getAllImages(imageFolders, filePatterns);

            const expectedImageWihtoutDate = { imagePath: getImagePath(imageFolderName, imageName), sequence: 21, extension: 'png' }

            expect(_.omit(sortedImages[0], 'date')).toStrictEqual(expectedImageWihtoutDate)

            expect(areSameDates(sortedImages[0].date, moment(stringDate, datePattern))).toBeTruthy()
        })

        afterEach(() => {
            deleteFolder(imageFolderName);
        })
    })

    afterAll(() => {
        deleteRootFolder();
    })
});

