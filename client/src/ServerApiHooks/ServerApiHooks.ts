import { useEffect } from "react";
import { SEND_TO_CLIENT_CHANNELS, SEND_TO_SERVER_CHANNELS, GetSimulationRequest, ApplySimulationRequest } from "shared-modules";

export const useReceiveFromServer = (callback: (data: any) => void) => {
    useEffect(() => {
        (window as any).api.receive(SEND_TO_CLIENT_CHANNELS.SIMULATION_RESULTS, (data: string) => {
            callback(data);
        });
    }, []);
}

export const sendGetImageSortSimulation = (getSimulationRequest: GetSimulationRequest) => {
    sendMessageToServer(SEND_TO_SERVER_CHANNELS.GET_IMAGE_SORT_SIMULATION, getSimulationRequest);
}

export const sendApplyImageSortSimulation = (applySimulationRequest: ApplySimulationRequest) => {
    sendMessageToServer(SEND_TO_SERVER_CHANNELS.APPLY_IMAGE_SORT_SIMULATION, applySimulationRequest);
}

export const sendGetImageGroupSimulation = (getSimulationRequest: GetSimulationRequest) => {
    sendMessageToServer(SEND_TO_SERVER_CHANNELS.GET_IMAGE_GROUP_SIMULATION, getSimulationRequest);
}

export const sendCloseMessage = () => {
    sendMessageToServer(SEND_TO_SERVER_CHANNELS.CLOSE_SERVER);
}

export const sendMinimizeMessage = () => {
    sendMessageToServer(SEND_TO_SERVER_CHANNELS.MINIMIZE);
}

const sendMessageToServer = (channel: SEND_TO_SERVER_CHANNELS, message?: any) => {
    const { api } = window as any;

    if (message) {
        api.send(channel, message);
    }
    else {
        api.send(channel);
    }
}