import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk  from 'redux-thunk';

import * as reducerMerge from '../redux/reducers';

let createStores = combineReducers({
    ...reducerMerge
});

export default createStore(
    createStores,
    applyMiddleware(thunk)
)
