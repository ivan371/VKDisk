export const DRAG_START = 'DRAG_START';
export const DRAG_END = 'DRAG_END';
export const DROP_OVER = 'DROP_OVER';

export function dragStart(allowDrag, source, id) {
    return {
        type: DRAG_START,
        allowDrag,
        source,
        id,
    };
}

export function dragEnd() {
    return {
        type: DRAG_END,
    };
}

export function dropOver() {
    return {
        type: DROP_OVER,
    };
}
