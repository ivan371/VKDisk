import update from 'react-addons-update';
import { MODAL_OPEN } from '../actions/modal';

const initalStore = {
    isOpen: false,
};

export default function modal(store = initalStore, action) {
    switch (action.type) {
        case MODAL_OPEN:
            return update(store, {
                isOpen: {
                    $set: !store.isOpen,
                },
            });
        default:
            return store;
    }
}
