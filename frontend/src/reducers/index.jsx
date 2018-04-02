import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import folder from './folder';
import document from './document';
import modal from './modal';
import page from './page';
import drag from './drag';
import tag from './tag';

export default combineReducers({
    routerReducer,
    folder,
    document,
    modal,
    page,
    drag,
    tag,
});
