export const DRAG_START = 'DRAG_START';
export const DRAG_END = 'DRAG_END';

export function dragStart(allowDrag, source) {
    return {
        type: DRAG_START,
        allowDrag,
        source,
    };
}

export function dragEnd() {
    return {
        type: DRAG_END,
    };
}
