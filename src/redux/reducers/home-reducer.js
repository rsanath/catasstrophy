import {HomeConstants} from '../actions/home-action'
import {ArticleConstants} from '../actions/article-actions'
import {replace} from '../../helpers/util'


const initialState = {
    loading: false,
    error: false,
    refreshing: false,
    data: [],
};

function setLiked(item, data, flag) {
    // This is our opportunity to set the liked flag in our homescreen data list.
    // Returns the data list with the specific item's liked property set to true.
    return replace(data, item, {...item, liked: flag});
}

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case HomeConstants.FETCH_CATS_BEGIN:
            return {
                ...state,
                loading: true,
                refreshing: false,
                error: false
            };
        case HomeConstants.FETCH_CATS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                refreshing: false,
                data: [...state.data, ...action.payload]
            };
        case HomeConstants.FETCH_CATS_ERROR:
            return {
                ...state,
                refreshing: false,
                loading: false,
                error: true
            };
        case HomeConstants.FETCH_MORE_CATS:
            return {
                ...state,
                refreshing: false,
                error: false
            };
        case HomeConstants.REFRESH_CATS_BEGIN:
            return {
                ...state,
                refreshing: true,
                error: false,
            };
        case HomeConstants.REFRESH_CATS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                refreshing: false,
                data: action.payload
            };
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