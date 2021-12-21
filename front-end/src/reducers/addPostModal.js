import *as types from '.././contains/containTypes';
const initialState = false;


const addPostModal = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_POST:
            state = action.show
            return state
        default: return state
    }
}

export default addPostModal;