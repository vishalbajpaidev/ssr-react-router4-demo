import { createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';

import reducers from './reducers';
import middleware from './middlewares';

import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';


let environment = (process.env.NODE_ENV || 'development').toString().trim().toLowerCase();
if (environment != 'production' && typeof window !== "undefined") {
    middleware.push(createLogger());
}
let initialState = {};
__CLIENT__ && (initialState = window.__REDUX_STATE__);
const store = createStore(combineReducers(reducers),initialState,compose(applyMiddleware(...middleware)),
);

store.subscribe(()=> {
    // console.log('Store updated: ', store.getState());
});
export default store;
