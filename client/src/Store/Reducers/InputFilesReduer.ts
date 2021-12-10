import { createSlice } from '@reduxjs/toolkit'
import { Source, Target } from '../../../../shared_modules/Types';

// Define a type for the slice state
interface InputReducerState {
    targetProperties: Target,
    sources: Source[]
}

const EMPTY_TARGET: Target = {
    imageNamePattern: "",
    datePattern: "",
    sequenceLength: 1,
    outputFolderLocation: ""
}

// Define the initial state using that type
const initialState: InputReducerState = {
    targetProperties: EMPTY_TARGET,
    sources: []
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
        setSources: (state, action) => {
            state.sources = action.payload;
        }
    }
})

export const { setTargetProperties, setTargetProperty, setSources } = InputFilesReducer.actions;

export default InputFilesReducer.reducer;