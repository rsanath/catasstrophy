/**
 * This module serves in persisting a image in the phone's storage.
 *
 * Info: The images are stored under the 'internal_storage'/Pictures/Cats on android
 * Info: Most of the following implementations are referenced from
 *  https://github.com/wkh237/react-native-fetch-blob/wiki/File-System-Access-API#createfilepath-data-encodingpromise
 */

import RNFetchBlob from 'rn-fetch-blob'
import {getFunnyName} from './application-helper'
import ImageCache from './image-cache'

export async function saveImage(item) {
    const fs = RNFetchBlob.fs

    const cachePath = await ImageCache.get(item.url)

    const fileName = getFunnyName()
    const newPath = `${fs.dirs.PictureDir}/Cats/${fileName}.jpg`

    return fs.createFile(newPath, cachePath, 'uri')
}