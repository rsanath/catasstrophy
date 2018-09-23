import {addToLikes, removeFromLikes} from '../../helpers/likes-helper'

export const ArticleConstants = {
    LIKE_ITEM: 'LIKE_ITEM',
    UNLIKE_ITEM: 'UNLIKE_ITEM',
    SAVE_IMAGE: 'SAVE_IMAGE'
};

export const ArticleActions = {
    likeItem: item => ({type: ArticleConstants.LIKE_ITEM, payload: item}),
    unlikeItem: item => ({type: ArticleConstants.UNLIKE_ITEM, payload: item}),
    saveImage: url => ({type: ArticleConstants.SAVE_IMAGE, payload: url})
};

export function likeItem(item) {
    return dispatch => addToLikes(item).then(dispatch(ArticleActions.likeItem(item)))
}

export function unlikeItem(imageUrl) {
    return dispatch => removeFromLikes(imageUrl).then(dispatch(ArticleActions.unlikeItem(imageUrl)))
}

export function saveImage(item) {
    //TODO
}