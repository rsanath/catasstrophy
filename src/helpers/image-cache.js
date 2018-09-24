import RNFetchBlob from "rn-fetch-blob";
import {getFileExtention} from './util'
const SHA1 = require("crypto-js/sha1");

export default class ImageCache {
    static get(uri: string): Promise<string> {
        const path = RNFetchBlob.fs.dirs.CacheDir + "/images/" + SHA1(uri) + '.' + getFileExtention(uri)
        return RNFetchBlob.fs.exists(path).then(exists => {
            if(exists) {
                return path;
            } else {
                return RNFetchBlob.config({ path })
                    .fetch("GET", uri, {})
                    .then(() => path);
            }
        });
    }
}