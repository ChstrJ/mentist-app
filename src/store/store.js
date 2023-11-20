// import { createStore,,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import loginReducer from '../reducers/loginReducer'

const rootReducer = combineReducers({
    loginReducer
})





const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
