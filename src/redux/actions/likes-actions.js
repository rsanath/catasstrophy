import {getLikedImages} from '../../helpers/likes-helper'

export const LikesConstants = {
    LOAD_LIKED_IMAGES: 'LOAD_LIKED_IMAGES',
}

export const LikesActions = {
    loadLikedImages: data => ({type: LikesConstants.LOAD_LIKED_IMAGES, payload: data}),
}

export function getLikedItems() {
    return dispatch => {
        getLikedImages().then(data => {
            dispatch(LikesActions.loadLikedImages(data))
        })
    }
}