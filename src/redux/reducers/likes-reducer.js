import {LikesConstants} from '../actions/likes-actions'
import {ArticleConstants} from '../actions/article-actions'
import {setLiked} from './home-reducer'
import {remove} from '../../helpers/util'

const initialState = {
    data: []
}

export default function LikesReducer(state = initialState, action) {
    switch (action.type) {
        case LikesConstants.LOAD_LIKED_IMAGES:
            return {
                ...state,
                data: action.payload
            }
        case ArticleConstants.LIKE_ITEM:
            return {
                ...state,
                data: setLiked(action.payload, state.data, true)
            }
        case ArticleConstants.UNLIKE_ITEM:
            return {
                ...state,
                data: setLiked(action.payload, state.data, false)
            }
        default:
            return state
    }
}