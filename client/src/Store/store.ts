import { configureStore } from '@reduxjs/toolkit'
import changedFilesReducer from './Reducers/ChangedFilesReducer';
import  InputFilesReducer from './Reducers/InputFilesReduer';

export const store = configureStore({
    reducer: {
        changedFiles: changedFilesReducer,
        inputFiles: InputFilesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;