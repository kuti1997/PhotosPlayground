export interface SourcePattern extends FilePattern {
    id: string
}

export interface Target extends FilePattern {
    outputFolderLocation: string,
}

export interface FilePattern {
    namePattern: string,
    datePattern: string,
    sequenceLength: number
}

export interface SourceFolder {
    path: string,
    id: string
}