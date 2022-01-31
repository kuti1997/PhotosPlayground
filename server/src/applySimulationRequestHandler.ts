import fs from 'fs';
import { ApplySimulationRequest } from 'shared-modules';

export const applySimulationRequest = (request: ApplySimulationRequest) => {
    request.changedImages.forEach(changedFile => {
        try {
            fs.copyFileSync(changedFile.originPath, changedFile.newPath);
        }
        catch{
            console.error(`file ${changedFile.originPath} could't be copied`);
        }
    });
}