import { SourcePattern, Target } from "shared-modules";
import { isDateFormatValid } from "../utils/dateUtils";

export const getTargetPropertiesValid = (targetProperties: Target) => {
    const { namePattern, datePattern, sequenceLength, outputFolderLocation } = targetProperties;

    if (namePattern === "") {
        return SimulationInputError.EMPTY_TARGET_NAME_PATTERN;
    }

    if (!namePattern.includes("{sequence}")) {
        return SimulationInputError.TARGET_NAME_PATTERN_NO_SEQUENCE;
    }

    if (sequenceLength < 1) {
        return SimulationInputError.TARGET_SEQUENCE_LENGTH_INVALID;
    }

    if (namePattern.includes("{date}") && !isDateFormatValid(datePattern)) {
        return SimulationInputError.TARGET_DATE_PATTERN_INVALID;
    }

    if (outputFolderLocation === "") {
        return SimulationInputError.TARGET_OUTPUT_FOLDER_EMPTY;
    }

    return SimulationInputError.NO_ERROR;
}

export enum SimulationInputError {
    NO_ERROR = 0,
    EMPTY_TARGET_NAME_PATTERN = 1,
    TARGET_NAME_PATTERN_NO_SEQUENCE = 2,
    TARGET_SEQUENCE_LENGTH_INVALID = 3,
    TARGET_DATE_PATTERN_INVALID = 4,
    TARGET_OUTPUT_FOLDER_EMPTY = 5
}

export const getSimulationErrorText = (error: SimulationInputError) => {
    switch (error) {
        case SimulationInputError.EMPTY_TARGET_NAME_PATTERN:
            return "Target name pattern mustn't be empty!";

        case SimulationInputError.TARGET_NAME_PATTERN_NO_SEQUENCE:
            return "Target name pattern must contain {sequence} keyword";

        case SimulationInputError.TARGET_SEQUENCE_LENGTH_INVALID:
            return "Target sequence length must be greater than zero";

        case SimulationInputError.TARGET_DATE_PATTERN_INVALID:
            return "Target date pattern must be a valid moment format";

        case SimulationInputError.TARGET_OUTPUT_FOLDER_EMPTY:
            return "Target output folder location mustn't be empty";

        default:
            return "An error occured please suck my balls";
    }
}