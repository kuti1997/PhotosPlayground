import { createSlice } from '@reduxjs/toolkit'

export enum Mode {
    IMAGE_SORT = 'Sort',
    IMAGE_GROUP = 'Group'
}

// Define a type for the slice state
interface ModeReducer {
    mode: Mode
}

// Define the initial state using that type
const initialState: ModeReducer = {
    mode: Mode.IMAGE_SORT
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const { setMode } = modeSlice.actions

export default modeSlice.reducer