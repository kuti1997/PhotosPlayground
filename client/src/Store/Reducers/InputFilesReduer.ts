import { createSlice } from '@reduxjs/toolkit'
import { SourcePattern, SourceFolder, Target } from 'shared-modules';

// Define a type for the slice state
interface InputReducerState {
    targetProperties: Target,
    sourcePatterns: SourcePattern[],
    sourceFolders: SourceFolder[]

}

const EMPTY_TARGET: Target = {
    namePattern: "",
    datePattern: "",
    sequenceLength: 1,
    outputFolderLocation: ""
}

// Define the initial state using that type
const initialState: InputReducerState = {
    targetProperties: EMPTY_TARGET,
    sourcePatterns: [],
    sourceFolders: []
}

export const InputFilesReducer = createSlice({
    name: 'inputFiles',
    initialState,
    reducers: {
        setTargetProperties: (state, action) => {
            state.targetProperties = action.payload;
        },
        setTargetProperty: (state, action) => {
            state.targetProperties = { ...state.targetProperties, [action.payload.field]: action.payload.value };
        },
        setSourcePatterns: (state, action) => {
            state.sourcePatterns = action.payload;
        },
        setSourceFolders: (state, action) => {
            state.sourceFolders = action.payload;
        }
    }
})

export const { setTargetProperties, setTargetProperty, setSourcePatterns, setSourceFolders } = InputFilesReducer.actions;

export default InputFilesReducer.reducer;