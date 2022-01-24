import { ServerInputFormat } from "shared-modules";

export const useSentToServer = () => {
    return (serverInput: ServerInputFormat) => {
        (window as any).api.send("toMain", serverInput);
    }
}