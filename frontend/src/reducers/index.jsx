import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import folder from './folder';

export default combineReducers({
    routerReducer,
    folder,
});
