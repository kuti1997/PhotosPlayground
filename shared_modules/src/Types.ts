export interface Source extends BasicFolder {
    index: number,
    folderLocation: string,
}

export interface Target extends BasicFolder {
    outputFolderLocation: string,
}

export interface BasicFolder {
    imageNamePattern: string,
    datePattern: string,
    sequenceLength: number
}