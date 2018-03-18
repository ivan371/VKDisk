import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import folder from './folder';
import document from './document';
import modal from "./modal";
import page from "./page";

export default combineReducers({
    routerReducer,
    folder,
    document,
    modal,
    page,
});
