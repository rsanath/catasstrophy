/**
 * This module serves in persisting a image in the phone's storage.
 *
 * Info: The images are stored under the 'internal_storage'/Pictures/Cats on android
 * Info: Most of the following implementations are referenced from
 *  https://github.com/wkh237/react-native-fetch-blob/wiki/File-System-Access-API#createfilepath-data-encodingpromise
 */

import RNFetchBlob from 'rn-fetch-blob'
import {getFunnyName, log} from './application-helper'
import ImageCache from './image-cache'
import {NativeModules} from 'react-native'
import {getFileExtention} from './util'

export async function saveImage(item) {
    const fs = RNFetchBlob.fs

    const cachePath = await ImageCache.get(item.url)

    const fileName = getFunnyName()
    const newPath = `${fs.dirs.PictureDir}/Cats/${fileName}.${getFileExtention(item.url)}`

    return fs.createFile(newPath, cachePath, 'uri')
}

/**
 * Given the image uri this method will share the image
 * @param path
 * @param message
 */
export function shareImage(path, message='') {
    log('share path = ' + path)
    NativeModules.ImageShareModule.shareImage(path, message);
}