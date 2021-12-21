import *as types from '.././contains/containTypes';
const initialState = '';


const users = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            state = action.userId;
            return [...state]
        default: return [...state];
    }
}
export default users;