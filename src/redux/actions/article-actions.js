import {addToLikes, removeFromLikes} from '../../helpers/likes-helper'
import {saveImage as _saveImage, shareImage as _shareImage} from '../../helpers/file-helper'
import {checkAndRequestStoragePermission} from '../../helpers/permissions-helper'
import {toast} from '../../helpers/application-helper'
import ImageCache from '../../helpers/image-cache'

export const ArticleConstants = {
    LIKE_ITEM: 'LIKE_ITEM',
    UNLIKE_ITEM: 'UNLIKE_ITEM',
    SAVE_IMAGE: 'SAVE_IMAGE',
    SAVE_IMAGE_SUCCESS: 'SAVE_IMAGE_SUCCESS',
    SAVE_IMAGE_FAILURE: 'SAVE_IMAGE_FAILURE'
};

export const ArticleActions = {
    likeItem: item => ({type: ArticleConstants.LIKE_ITEM, payload: item}),
    unlikeItem: item => ({type: ArticleConstants.UNLIKE_ITEM, payload: item}),
    saveImageSuccess: result => ({type: ArticleConstants.SAVE_IMAGE_SUCCESS, payload: result}),
    saveImageFailure: error => ({type: ArticleConstants.SAVE_IMAGE_FAILURE, payload: error})
};

export function likeItem(item) {
    return dispatch => addToLikes(item).then(dispatch(ArticleActions.likeItem(item)))
}

export function unlikeItem(item) {
    return dispatch => removeFromLikes(item).then(dispatch(ArticleActions.unlikeItem(item)))
}

export async function shareImage(item, message) {
    let path = await ImageCache.get(item.url)
    return _shareImage(path, message)
}

export function saveImage(item) {
    return dispatch => {
        checkAndRequestStoragePermission().then(result => {
            if (!result) return;
            _saveImage(item)
                .then(result => {
                    dispatch(ArticleActions.saveImageSuccess(result))
                    toast('Image saved')
                })
                .catch(error => {
                    dispatchEvent(ArticleActions.saveImageFailure(error))
                    toast('Unable to save image')
                })
        })
    }
}