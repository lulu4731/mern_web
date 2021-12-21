import axios from 'axios';
import * as types from '.././contains/containTypes';


export const callerAPI = async (endpoint, method = 'GET', body) => {
    return await axios({
        method: method,
        url: `http://localhost:5000/api/${endpoint}`,
        data: body
    })
};
export const loginUser = async (userForm) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', userForm);
        if (response.data.success)
            localStorage.setItem(types.LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
        return await (response.data);
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message }
    }
};

export const registerUser = async (registerForm) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', registerForm);
        if (response.data.success)
        return await (response.data);
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message }
    }
};