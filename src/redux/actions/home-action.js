import {getCats} from "../../data/catapi";
import {log} from "../../helpers/application-helper";

export const HomeConstants = {
    FETCH_CATS_BEGIN: 'FETCH_CATS_BEGIN',
    FETCH_CATS_SUCCESS: 'FETCH_CATS_SUCCESS',
    FETCH_CATS_ERROR: 'FETCH_CATS_ERROR',
    FETCH_MORE_CATS: 'FETCH_MORE_CATS',
    REFRESH_CATS_BEGIN: 'REFRESH_CATS_BEGIN',
    REFRESH_CATS_SUCCESS: 'REFRESH_CATS_SUCCESS',
    SAVE_IMAGE: 'SAVE_IMAGE'
};

export const HomeActions = {
    fetchCatsBegin: () => ({type: HomeConstants.FETCH_CATS_BEGIN}),
    fetchCatsSuccess: cats => ({type: HomeConstants.FETCH_CATS_SUCCESS, payload: cats}),
    fetchCatsError: error => ({type: HomeConstants.FETCH_CATS_ERROR, payload: error}),
    fetchMoreCats: moreCats => ({type: HomeConstants.FETCH_MORE_CATS, payload: moreCats}),
    refreshCatsBegin: () => ({type: HomeConstants.REFRESH_CATS_BEGIN}),
    refreshCatsSuccess: cats => ({type: HomeConstants.REFRESH_CATS_SUCCESS, payload: cats}),
    saveImage: url => ({type: HomeConstants.SAVE_IMAGE, payload: url})
};

export function fetchCats() {
    return dispatch => {
        dispatch(HomeActions.fetchCatsBegin());
        getCats(10)
            .then(cats => dispatch(HomeActions.fetchCatsSuccess(cats)))
            .catch(error => dispatch(HomeActions.fetchCatsError(error)))
    }
}

export function fetchMoreCats() {
    return dispatch => {
        getCats(5)
            .then(cats => dispatch(HomeActions.fetchCatsSuccess(cats)))
            .catch(error => log(error))
    }
}

export function refreshCats() {
    return dispatch => {
        dispatch(HomeActions.refreshCatsBegin());
        getCats(10)
            .then(cats => dispatch(HomeActions.refreshCatsSuccess(cats)))
            .catch(error => log(error))
    }
}