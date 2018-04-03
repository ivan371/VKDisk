import update from 'react-addons-update';
import { TAG_OPEN } from '../actions/tag';

const initalState = {
    isOpen: false,
};

export default function tag(store = initalState, action) {
    switch (action.type) {
        case TAG_OPEN:
            return update(store, {
                isOpen: {
                    $set: !store.isOpen,
                },
            });
        default:
            return store;
    }
}
