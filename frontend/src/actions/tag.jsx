export const TAG_OPEN = 'TAG_OPEN';
export const SELECTED_TAG = 'SELECTED_TAG';

export function tagOpen() {
    return {
        type: TAG_OPEN,
    };
}

export function tagSelect(tag) {
    return {
        type: SELECTED_TAG,
        tag
    };
}
