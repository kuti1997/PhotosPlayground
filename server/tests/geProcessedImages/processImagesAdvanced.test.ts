import moment from "moment";
import { getProcessedImages } from "../../src/imageSort/imageSort";
import { sortImages } from "../../src/utils/fileUtils";
import { converStringToDate, convertDateToString, createFolders, createImagesInFolder, createRootFolder, deleteRootFolder, getFoldersPaths, getImageFolderPath, getImagePath, getImageWithDateString, ImageTestObject } from "../imageUtils";

describe('process images advanced', () => {
    const imageNames: ImageTestObject[] = [
        { name: 'a_69_14_09_2019.jpg', stringDate: '14/09/2019', momentDate: converStringToDate('14/09/2019') },
        { name: 'a_78_13_09_2019.jpg', stringDate: '13/09/2019', momentDate: converStringToDate('13/09/2019') },
        { name: 'a_54_16_09_2019.jpg', stringDate: '16/09/2019', momentDate: converStringToDate('16/09/2019') },
        { name: 'a_43_11_09_2019.jpg', stringDate: '11/09/2019', momentDate: converStringToDate('11/09/2019') },
        { name: 'a_15_14_09_2019.jpg', stringDate: '14/09/2019', momentDate: converStringToDate('14/09/2019') },
        { name: 'a_88_13_09_2019.jpg', stringDate: '13/09/2019', momentDate: converStringToDate('13/09/2019') }
    ]

    const innerFolderBaseName = 'kuti';
    const firstFolderName = `${innerFolderBaseName}0`
    const secondFolderName = `${innerFolderBaseName}1`
    const thirdFolderName = `${innerFolderBaseName}2`
    const fourthFolderName = `${innerFolderBaseName}3`

    beforeAll(() => {
        createRootFolder();
        createFolders(innerFolderBaseName, 4);
        createImagesInFolder(firstFolderName, imageNames.slice(0,3), true)
        createImagesInFolder(secondFolderName, imageNames.slice(3,6), true)
        createImagesInFolder(thirdFolderName, imageNames.slice(0,3), false)
        createImagesInFolder(fourthFolderName, imageNames.slice(3,6), false)
    })
    describe('process two folders with images same patterns', () => {
        it('date in file', async () => {
            const imageFolders = getFoldersPaths(innerFolderBaseName, 2)

            const filePatterns = [{
                namePattern: '{any}_{sequence}_{any}',
                datePattern: '',
                sequenceLength: 2
            }];

            const processedImages = await getProcessedImages([getImageFolderPath('kuti2'), getImageFolderPath('kuti3')], filePatterns);
            const expectedImages = [
                {
                    imagePath: getImagePath(fourthFolderName, imageNames[3].name),
                    sequence: 43,
                    extension: 'jpg',
                    date: '11/09/2019'
                },
                {
                    imagePath: getImagePath(thirdFolderName, imageNames[1].name),
                    sequence: 78,
                    extension: 'jpg',
                    date: '13/09/2019'
                },
                {
                    imagePath: getImagePath(fourthFolderName, imageNames[5].name),
                    sequence: 88,
                    extension: 'jpg',
                    date: '13/09/2019'
                },
                {
                    imagePath: getImagePath(fourthFolderName, imageNames[4].name),
                    sequence: 15,
                    extension: 'jpg',
                    date: '14/09/2019'
                },
                {
                    imagePath: getImagePath(thirdFolderName, imageNames[0].name),
                    sequence: 69,
                    extension: 'jpg',
                    date: '14/09/2019'
                },
                {
                    imagePath: getImagePath(thirdFolderName, imageNames[2].name),
                    sequence: 54,
                    extension: 'jpg',
                    date: '16/09/2019'
                }
            ]

            const sortedProcessedImages = processedImages.sort(sortImages).map(getImageWithDateString)

            expect(sortedProcessedImages).toStrictEqual(expectedImages)
        })
    })
    
    afterAll(() => {
        deleteRootFolder();
    })
});