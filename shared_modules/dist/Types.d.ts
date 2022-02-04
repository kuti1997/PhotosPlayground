export declare const SEND_TO_SIMULATION_CHANNEL_NAME = "SIMULATE_IMAGES";
export declare const SEND_TO_SERVER_CHANNELS: {
    GET_SIMULATION: string;
    APPLY_SIMULATION: string;
    CLOSE_SERVER: string;
};
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
