/**
 * This module is to help with obtaining storage permission for saving images.
 *
 * Note: This module contains permission requesters only for android.
 */

import {PermissionsAndroid, Platform} from 'react-native';
import {log} from "./application-helper";


async function requestAndroidStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'CatPhotos Storage Permission',
                message: 'CatPhotos App needs access to your storage ' +
                'so that you can save and share cute cat pictures.',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
        console.warn(err);
        return false;
    }
}

async function checkAndroidStoragePermission() {
    try {
        return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    } catch (err) {
        log(err);
        return false;
    }
}

export async function requestStoragePermission() {
    return Platform.OS === 'android' ?
        await requestAndroidStoragePermission() : undefined
}

export async function checkStoragePermission() {
    return Platform.OS === 'android' ?
        checkAndroidStoragePermission() : undefined
}

/**
 * Returns true if Storage Permission is already granted
 * else prompts for permission and returns the user's result.
 *
 * @returns {Promise<*>}
 */
export async function checkAndRequestStoragePermission() {
    if (await checkStoragePermission()) return true;
    else return requestStoragePermission()
}