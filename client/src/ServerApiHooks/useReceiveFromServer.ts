import { useEffect } from "react";
import { useAppDispatch } from "../Store/hooks";
import { setChangedFiles } from "../Store/Reducers/ChangedFilesReducer";

export const useReceiveFromServer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (window as any).api.receive("fromMain", (data: string) => {
            console.log(data);
            dispatch(setChangedFiles(data))
        });
    }, []);
}