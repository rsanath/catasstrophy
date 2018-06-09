import RNFetchBlob from 'react-native-fetch-blob'
import {funnyName} from "../../commons/helper"
import {getFileExtention} from "../../commons/util"
import * as Alert from "react-native";


export function saveImage(url) {
    const ext = getFileExtention(url) || 'png';
    const fileName = funnyName();
    const path = `${RNFetchBlob.fs.dirs.PictureDir}/Cats/${fileName}.${ext}`;

    return RNFetchBlob
        .config({path: path})
        .fetch('GET', url)
        .then(res => ({status: 'success', path: `Pictures/Cats/${fileName}.${ext}`}))
        .catch(error => ({status: 'failure', error: error.toString()}))
}


export function alertForPhotosPermission() {
    Alert.alert(
        'Can we access your storage?',
        'We need access so that we can save cute cat photos to your phone',
        [
            {
                text: 'No way',
                onPress: () => console.log('Permission denied'),
                style: 'cancel',
            },
            this.state.photoPermission == 'undetermined'
                ? {text: 'MEOW', onPress: requestStoragePermission}
                : {text: 'Open Settings', onPress: Permissions.openSettings},
        ],
    )
}


function requestStoragePermission() {
    // Returns once the user has chosen to 'allow' or to 'not allow' access
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    return Permissions.request('storage').then(response => {
        if (response !== 'authorized') {
            Alert.alert('Okay we wont disturb you again')
        } else {
            Alert.alert('Cool!')
        }
    })
}