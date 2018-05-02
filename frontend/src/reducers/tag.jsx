import update from 'react-addons-update';
import {SELECTED_TAG, TAG_OPEN} from '../actions/tag';

const initalState = {
    isOpen: false,
    selected: null,
};

export default function tag(store = initalState, action) {
    switch (action.type) {
        case TAG_OPEN:
            return update(store, {
                isOpen: {
                    $set: !store.isOpen,
                },
            });
        case SELECTED_TAG:
            return update(store, {
                selected: {
                    $set: action.tag,
                }
            });
        default:
            return store;
    }
}
