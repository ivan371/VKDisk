export const MODAL_OPEN = 'MODAL_OPEN';
export const SET_MODAL = 'SET_MODAL';

export function modalOpen() {
    return {
        type: MODAL_OPEN,
    };
}

export function setModal(modal) {
    return {
        type: SET_MODAL,
        modal,
    };
}