import update from 'react-addons-update';
import {MODAL_OPEN, SET_MODAL} from '../actions/modal';

const initalStore = {
    isOpen: false,
    modal: null,
};

export default function modal(store = initalStore, action) {
    switch (action.type) {
        case MODAL_OPEN:
            return update(store, {
                isOpen: {
                    $set: !store.isOpen,
                },
            });
        case SET_MODAL:
            return update(store, {
                modal: {
                    $set:  action.modal,
                },
            });
        default:
            return store;
    }
}
