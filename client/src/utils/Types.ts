export interface Source extends BasicFolder{
    index: number,
    inputFolderLocation: string,
}

export interface Target extends BasicFolder{
    outputFolderLocation: string,
}

export interface BasicFolder {
    imageNamePattern: string,
    datePattern: string,
    sequenceLength: number
}

export const EMPTY_TARGET: Target = {
    imageNamePattern: "",
    datePattern: "",
    sequenceLength: 1,
    outputFolderLocation: ""
}