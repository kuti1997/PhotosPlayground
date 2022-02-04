import { useEffect } from "react";
import { SEND_TO_CLIENT_CHANNELS, SEND_TO_SERVER_CHANNELS, GetSimulationRequest, ApplySimulationRequest } from "shared-modules";
import { useAppDispatch } from "../Store/hooks";
import { setChangedFiles } from "../Store/Reducers/ChangedFilesReducer";

export const useReceiveFromServer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (window as any).api.receive(SEND_TO_CLIENT_CHANNELS.SIMULATION_RESULTS, (data: string) => {
            console.log(data);
            dispatch(setChangedFiles(data))
        });
    }, []);
}

export const useSendToServer = () => {
    return (getSimulationRequest: GetSimulationRequest) => {
        (window as any).api.send(SEND_TO_SERVER_CHANNELS.GET_SIMULATION, getSimulationRequest);
    }
}

export const useSendSimulationToServer = () => {
    return (applySimulationRequest: ApplySimulationRequest) => {
        (window as any).api.send(SEND_TO_SERVER_CHANNELS.APPLY_SIMULATION, applySimulationRequest);
    }
}

export const sendCloseMessage = () => {
    (window as any).api.send(SEND_TO_SERVER_CHANNELS.CLOSE_SERVER);
}

export const sendMinimizeMessage = () => {
    (window as any).api.send(SEND_TO_SERVER_CHANNELS.MINIMIZE);
}