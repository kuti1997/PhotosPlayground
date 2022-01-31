export const SEND_TO_SIMULATION_CHANNEL_NAME = "SIMULATE_IMAGES";

export const SEND_TO_SERVER_CHANNELS = {
    GET_SIMULATION: "GET_SIMULATION",
    APPLY_SIMULATION: "APPLY_SIMULATION"
}

export const SEND_TO_CLIENT_CHANNELS = {
    SIMULATION_RESULTS: "SIMULATION_RESULTS"
}

export interface FilePattern {
    namePattern: string,
    datePattern: string,
    sequenceLength: number
}

export interface SourcePattern extends FilePattern {
    id: string
}

export interface Target extends FilePattern {
    outputFolderLocation: string,
}

export interface SourceFolder {
    path: string,
    id: string
}

export interface GetSimulationRequest {
    targetProperties: Target,
    filePatterns: FilePattern[],
    sourceFolderLocations: string[]
}

export interface ApplySimulationRequest {
    changedImages: ChangedImage[]
}

export interface ChangedImage {
    originPath: string,
    newPath: string
}