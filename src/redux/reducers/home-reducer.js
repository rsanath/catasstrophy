import {HomeConstants} from "../actions/home-action";

const initialState = {
    loading: false,
    error: false,
    refreshing: false,
    data: [],
};

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
        default:
            return state
    }
}