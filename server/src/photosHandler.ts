import { Source, Target } from '../../shared_modules/Types';

interface PhotosInput {
    targetProperties: Target,
    sources: Source[]
}

function processPhotosConfig ( {targetProperties, sources}: PhotosInput ) {
    return "fuck";
}

module.exports =  processPhotosConfig ;
