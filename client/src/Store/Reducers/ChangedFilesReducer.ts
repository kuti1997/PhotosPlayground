import { createSlice } from '@reduxjs/toolkit'
import { ChangedImage } from 'shared-modules';

// Define a type for the slice state
interface ChangedImagesReducer {
    changedFiles: ChangedImage[]
}

// Define the initial state using that type
const initialState: ChangedImagesReducer = {
    changedFiles: []
}

export const changedFilesSlice = createSlice({
    name: 'changedFiles',
    initialState,
    reducers: {
        setChangedFiles: (state, action) => {
            state.changedFiles = action.payload
        }
    }
})

export const { setChangedFiles } = changedFilesSlice.actions

export default changedFilesSlice.reducer