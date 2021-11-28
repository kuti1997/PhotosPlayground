import { createSlice } from '@reduxjs/toolkit'
import { EMPTY_TARGET, Target } from '../../utils/Types';

// Define a type for the slice state
interface InputReducerState {
    targetProperties: Target
}

// Define the initial state using that type
const initialState: InputReducerState = {
    targetProperties: EMPTY_TARGET
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
        }
    }
})

export const { setTargetProperties, setTargetProperty } = InputFilesReducer.actions;

export default InputFilesReducer.reducer;