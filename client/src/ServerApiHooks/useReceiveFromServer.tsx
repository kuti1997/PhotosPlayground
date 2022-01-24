import { useEffect } from "react";

export const useReceiveFromServer = () => {
    useEffect(() => {
        (window as any).api.receive("fromMain", (data: string) => {
            console.log(data);
            console.log(`Received ${data} from main process`);
        });
    }, []);
}