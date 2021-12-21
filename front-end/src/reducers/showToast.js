import * as types from '.././contains/containTypes'

const initialState = {
    show: false,
    message: '',
    type: null
};

const showToast = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_TOAST:
            state = action.toast
            return {
                ...state
            }
        default: return {
            ...state
        }
    }
}

export default showToast;