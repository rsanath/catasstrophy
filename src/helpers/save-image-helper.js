/**
 * This module serves in persisting a image in the phone's storage
 */

import RNFetchBlob from 'react-native-fetch-blob'
import {getFunnyName} from "./application-helper"
import {getFileExtention} from "./util"
import localStorage from './local-storage';


async function getAllSavedPhotos() {
    return (await localStorage.get('saved')) || [];
}

/**
 * Locally store the info of the images tha are saved
 * so tha we don't save the same image twice.
 *
 * @param url
 * @param filepath
 * @returns {Promise<boolean>}
 */
async function markAsSaved(url, filepath) {
    const savedImages = await getAllSavedPhotos();
    savedImages.push({url, filepath});
    return await localStorage.set('saved', savedImages);
}

async function getSavedPhoto(url) {
    const savedImages = await getAllSavedPhotos();
    return savedImages.find(image => image.url == url)
}

async function isSaved(url) {
    return (await getSavedPhoto(url)) != null;
}

/**
 * Given the url for the image download and save it locally and return the
 * file path of the saved image.
 *
 * @param url
 * @returns {Promise<*>}
 */
export async function saveImage(url) {
    const extension = getFileExtention(url) || 'png';
    const fileName = getFunnyName();
    const filePath = `${RNFetchBlob.fs.dirs.PictureDir}/Cats/${fileName}.${extension}`;

    if (await isSaved(url)) return {successful: true, path: (await getSavedPhoto(url)).filepath};
    else await markAsSaved(url, filePath);

    return await RNFetchBlob
        .config({path: filePath})
        .fetch('GET', url)
        .then(response => ({successful: true, path: filePath}))
        .catch(error => ({successful: false, error: error.toString()}))
}