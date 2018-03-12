import update from 'react-addons-update';
import { DRAG_START, DRAG_END } from '../actions/drag';

const initalState = {
    allowDrag: false,
    source: null,
};

export default function drag(store = initalState, action) {
    switch (action.type) {
        case DRAG_START:
            return update(store, {
                allowDrag: {
                    $set: action.allowDrag,
                },
                source: {
                    $set: action.source,
                },
            });
        case DRAG_END:
            return update(store, {
                allowDrag: {
                    $set: false,
                },
                source: {
                    $set: null,
                },
            });
        default:
            return store;
    }
}
