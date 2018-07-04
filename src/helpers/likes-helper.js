/**
 *
 * Info: The structure of the liked object is
 * [ { url: 'url_to_the_image' }, ... ]
 */

import localStorage from './local-storage'
import {removeFromList} from "./util";

const LIKES = 'likes';

export async function getLikedImages() {
    const likes = await localStorage.get(LIKES);
    return likes || []
}

async function setLikedImages(likes) {
    return await localStorage.set(LIKES, likes);
}

export async function likeImage(imageUrl) {
    const likedImages = await getLikedImages();
    if (likedImages.find(likedImage => likedImage.url === imageUrl)) return;
    likedImages.push({url: imageUrl});
    return await setLikedImages(likedImages)
}

export async function removeLike(imageUrl) {
    let likedImages = await getLikedImages();
    const likedImage = likedImages.find(like => like.url === imageUrl);
    if (!likedImage) return;
    likedImages = removeFromList(likedImages, likedImage);
    return await setLikedImages(likedImages);
}