import { contextBridge, ipcRenderer } from "electron";
import { SEND_TO_CLIENT_CHANNELS, SEND_TO_SERVER_CHANNELS } from "shared-modules";

contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = Object.values(SEND_TO_SERVER_CHANNELS);
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
            
        }
    },
    receive: (channel, func) => {
        let validChannels = [SEND_TO_CLIENT_CHANNELS.SIMULATION_RESULTS];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
})