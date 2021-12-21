import { combineReducers } from 'redux';
import users from './users';
import checkLogin from './checkLogin';
import posts from './posts';
import addPostModal from './addPostModal';
import showToast from './showToast';
import post from './post'


const appReducers = combineReducers({
    users,
    checkLogin,
    posts,
    addPostModal,
    showToast,
    post
});

export default appReducers;