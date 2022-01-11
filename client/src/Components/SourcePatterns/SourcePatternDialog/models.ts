import { SourcePattern } from "shared-modules"

export const getSortedDialogFields = (sourcePattern: SourcePattern) => {
    const allFields = Object.keys(sourcePattern) as Array<keyof SourcePattern>;
    const filteredFields = allFields.filter(key => key !== "id" && key !== "sequenceLength");
    return filteredFields.sort();
}

/**
 * Converts text from camelCase to a format where every word begins with an upper-case letter
 * @param text 
 * @returns 
 */
export const convertCamelCaseToInitialCaps = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/([A-Z])/g, ' $1');
}

export const isNamePatternValid = (pattern: string) => {
    return pattern.includes("{date}") || pattern.includes("{sequence}");
}