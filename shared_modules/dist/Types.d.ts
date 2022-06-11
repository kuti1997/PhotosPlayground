export declare const SEND_TO_SIMULATION_CHANNEL_NAME = "SIMULATE_IMAGES";
export declare enum SEND_TO_SERVER_CHANNELS {
    GET_IMAGE_SORT_SIMULATION = "0",
    APPLY_IMAGE_SORT_SIMULATION = "1",
    GET_IMAGE_GROUP_SIMULATION = "2",
    APPLY_IMAGE_GROUP_SIMULATION = "3",
    CLOSE_SERVER = "4",
    MINIMIZE = "5"
}
export declare const SEND_TO_CLIENT_CHANNELS: {
    SIMULATION_RESULTS: string;
};
export interface FilePattern {
    namePattern: string;
    datePattern: string;
    sequenceLength: number;
}
export interface SourcePattern extends FilePattern {
    id: string;
}
export interface Target extends FilePattern {
    outputFolderLocation: string;
}
export interface SourceFolder {
    path: string;
    id: string;
}
export interface GetSimulationRequest {
    targetProperties: Target;
    filePatterns: FilePattern[];
    sourceFolderLocations: string[];
}
export interface ApplySimulationRequest {
    changedImages: ChangedImage[];
}
export interface ChangedImage {
    originPath: string;
    newPath: string;
}
