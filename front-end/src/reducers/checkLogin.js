import * as types from '../contains/containTypes';
const initialState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
};

const checkLogin = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            state = action.user
            return state
        default: return state;
    }
}
export default checkLogin;