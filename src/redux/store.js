import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

export default store = createStore(reducer, undefined, applyMiddleware(thunk));
