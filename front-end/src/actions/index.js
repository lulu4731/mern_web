
import axios from 'axios';
import * as types from '.././contains/containTypes';
import { callerAPI } from '.././utils/callerAPI';
import setAuthToken from '../utils/setAuthToken';

export const acLoginFormRequest = (userForm) => {
    return (dispatch) => {
        return callerAPI('auth/login', 'POST', userForm).then(res => {
            dispatch(loginForm(res.data.accessToken));
        }).catch(error => {
            if (error.data) return error.data;
            else return { success: false, message: error.message }
        })
    }
}
export const loginForm = (userId) => {
    return {
        type: types.USER_LOGIN,
        userId
    }
};
export const loadUser = () => async (dispatch) => {
    if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[types.LOCAL_STORAGE_TOKEN_NAME])
    }
    try {
        const response = await axios.get('http://localhost:5000/api/auth');
        if (response.data.success) {
            dispatch(setAuth({
                // authLoading: false,
                isAuthenticated: true,
                user: response.data.user
            }));
        }
    } catch (error) {
        localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null);
        dispatch(setAuth({
            // authLoading: true,
            isAuthenticated: false,
            user: null
        }))
    }
};

export const setAuth = (user) => {
    return {
        type: types.SET_USER,
        user
    }
};
export const logout = () => dispatch => {
    localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
    setAuthToken(null);
    dispatch(setAuth({
        // authLoading: true,
        isAuthenticated: false,
        user: null
    }))
};
export const showPostModal = (isTrue) => dispatch => {
    dispatch({
        type: types.SHOW_POST,
        show: isTrue
    })
}
export const acFetchPostRequest = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/api/post');
        if (response.data.success) {
            dispatch(posts({
                post: null,
                posts: response.data.posts,
                postLoading: false
            }))
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
};
export const posts = (posts) => {
    return {
        type: types.FETCH_POST,
        posts
    }
};

export const acAddPostRequest = (newPost) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/post/add', newPost)
        if (response.data.success) {
            dispatch({
                type: types.ADD_POST,
                payload: response.data.post
            })
            return response.data
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
}

export const acDeleteRequest = (id) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/post/${id}`);
        if (response.data.success) {
            dispatch({
                type: types.DELETE_POST,
                id: id
            })
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
}

export const acUpdateRequest = (post) => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:5000/api/post/${post._id}`, post);
        if (response.data.success) {
            dispatch({
                type: types.UPDATE_POST,
                post: response.data.post
            })
            return response.data
        }
    } catch (error) {
        return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
}

export const findPost = (id) => dispatch => {
    dispatch({
        type: types.FIND_POST,
        id: id
    })
}
export const setShowToast = (isTrue, message, type) => dispatch => {
    dispatch({
        type: types.SHOW_TOAST,
        toast: {
            show: isTrue,
            message: message,
            type: type
        }
    })
}

export const setUpdatePost = () => dispatch => {
    dispatch({
        type: types.SET_POST,
        post: null
    })
}
