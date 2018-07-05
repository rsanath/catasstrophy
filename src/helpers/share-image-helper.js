import {saveImage} from "./save-image-helper";
import {NativeModules} from 'react-native';
import React from 'react';

/**
 * Given the file uri this method will use Intents to share pick and share the file
 * Warn: Although the method name is shareFile, only apps which can receive images will be displayed.
 * @param pathToFile
 */
export function shareFile(pathToFile, message) {
    const fileUri = `file://${pathToFile}`;
    NativeModules.ImageShareModule.shareImage(message, fileUri);
}

export async function saveAndShareImage(url, message) {
    saveImage(url)
        .then(response => {
            if (response.successful) return response.path;
            else throw response.error
        })
        .then(filepath => shareFile(filepath, message))
        .catch(error => alert(error))
}