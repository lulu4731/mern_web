import * as types from '.././contains/containTypes';

const initialState = {
    post: null,
    posts: [],
    postLoading: true
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_POST:
            state = action.posts;
            return {
                ...state
            }
        case types.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.id)
            }
        case types.UPDATE_POST:
            const newPost = state.posts.map(post => post._id === action.post._id ? action.post : post);
            return {
                ...state,
                posts: newPost
            }
        case types.FIND_POST:
            const post = state.posts.find(post => post._id === action.id);
            return {
                ...state,
                post: post
            };
        case types.SET_POST:
            return {
                ...state,
                post: action.post
            }
        default: return state
    }
}

export default posts;