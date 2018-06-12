import RNFetchBlob from 'react-native-fetch-blob'
import {funnyName} from "../commons/helper"
import {getFileExtention} from "../commons/util"
import localStorage from './local-storage';


async function addToSaved(url, shortPath, fullPath) {
    return await localStorage.set(url, {shortPath, fullPath});
}

async function getSaved(url) {
    return await localStorage.get(url);
}

async function isSaved(url) {
    return (await getSaved(url)) != null;
}

export async function saveImage(url) {
    const extension = getFileExtention(url) || 'png';
    const fileName = funnyName();
    const fullPath = `${RNFetchBlob.fs.dirs.PictureDir}/Cats/${fileName}.${extension}`;
    const shortPath = `Pictures/Cats/${fileName}.${extension}`;

    if (await isSaved(url)) {
        return {status: 'success', path: (await getSaved(url).fullPath)}
    } else {
        await addToSaved(url, shortPath, fullPath)
    }

    return await RNFetchBlob
        .config({path: fullPath})
        .fetch('GET', url)
        .then(response => ({status: 'success', path: shortPath}))
        .catch(error => ({status: 'failure', error: error.toString()}))
}