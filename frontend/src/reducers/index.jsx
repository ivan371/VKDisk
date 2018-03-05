import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import folder from './folder';
import document from './document';

export default combineReducers({
    routerReducer,
    folder,
    document,
});
