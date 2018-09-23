/**
 *
 * Info: The structure of the liked object is
 * [ {id: 'unique_id', source_url: 'url-to-catapi.com', url: 'url-of-the-image', cachePath}, ...]
 */

import localStorage from './local-storage'
import {removeFromList, toBoolean} from './util'

const LIKES = 'likes';

let _likes = undefined;

/**
 * Takes in an array of string which are urls to cat images
 * and maps them to an array of object which looks like.
 *
 * [{url: 'url_to_the_image', liked: boolean}]
 *
 * @param cats
 * @returns {Promise<void>}
 */
export async function attachLikeInfo(cats) {
    const res = []

    for (let i in cats) {
        let item = cats[i]
        res.push({
            ...item,
            liked: await isLiked(item.url)
        })
    }
    return res
}

export async function isLiked(imageUrl) {
    if (!_likes) {
        _likes = await getLikedImages()
    }
    return toBoolean(_likes.find(item => item.url == imageUrl))
}

export async function getLikedImages() {
    const likes = await localStorage.get(LIKES);
    _likes = likes;
    return likes || []
}

export async function setLikedImages(likes) {
    return await localStorage.set(LIKES, likes);
}

export async function addToLikes(item) {
    const likedImages = await getLikedImages();
    if (likedImages.find(likedImage => likedImage.url === item.url)) return;
    likedImages.unshift(item);
    return await setLikedImages(likedImages)
}

export async function removeFromLikes(item) {
    let likedImages = await getLikedImages();
    const likedImage = likedImages.find(like => like.url === item.url);
    if (!likedImage) return;
    likedImages = removeFromList(likedImages, likedImage);
    return await setLikedImages(likedImages);
}