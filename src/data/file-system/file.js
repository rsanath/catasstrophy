import RNFetchBlob from 'react-native-fetch-blob'
import {generateName} from "../../commons/helper";


export function saveImage(url) {
    console.log('ape');
    console.log(RNFetchBlob.fs.dirs.DCIMDir.toString());
    const path = RNFetchBlob.fs.dirs.DCIMDir + '/Cats/' + generateName() + '.png';
    return RNFetchBlob
        .config({path: path})
        .fetch('GET', url)
}