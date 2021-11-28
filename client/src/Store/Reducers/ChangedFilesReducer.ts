import { createSlice } from '@reduxjs/toolkit'
import { ChangedFile } from '../../Components/ChangedFilesList/ChangedFilesList';

// Define a type for the slice state
interface CounterState {
    changedFiles: ChangedFile[]
}

// Define the initial state using that type
const initialState: CounterState = {
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