import {saveImage} from "./save-image-helper";
import {NativeModules} from 'react-native';
import Share from 'react-native-share';
import React from 'react';


function __shareFile__(filepath) {
    let filename = filepath.split('/');
    filename = filename[filename.length - 1];

    const shareOptions = {
        title: filename,
        message: "Meow meow!",
        url: `file://${filepath}`,
    };

    Share.open(shareOptions)
        .then(res => alert('shared' + res.toString()))
        .catch(err => alert('not shared' + err.toString()))
}

export function shareFile(pathToFile) {
    const shareMessage = 'Shared from Catasstrophy 🐈';
    NativeModules.ImageShareModule.shareImage(shareMessage, `file://${pathToFile}`);
}

export async function saveAndShareImage(url) {
    saveImage(url)
        .then(response => {
            if (response.successful) return response.path;
            else throw response.error
        })
        .then(filepath => shareFile(filepath))
        .catch(error => alert(error))
}