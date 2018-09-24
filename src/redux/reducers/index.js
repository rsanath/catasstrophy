import {combineReducers} from 'redux';
import HomeReducer from "./home-reducer";
import LikesReducer from './likes-reducer'

export default combineReducers({
    home: HomeReducer,
    likes: LikesReducer
})