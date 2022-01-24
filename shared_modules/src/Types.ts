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

export interface ServerInputFormat {
    targetProperties: Target,
    filePatterns: FilePattern[],
    sourceFolderLocations: string[]
}

export interface ChangedImage {
    originPath: string,
    newPath: string
}