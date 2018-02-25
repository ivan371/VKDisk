import { createStore, applyMiddleware, compose } from 'redux';
import initReducers from './reducers';
// import middlewares from './middlewares';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from "redux-devtools-extension";
// import {logger} from "./middlewares/logger";
// import {headerMiddleware} from "./middlewares/header";

export default function initStore() {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        composeWithDevTools(applyMiddleware(apiMiddleware)),
    );
}