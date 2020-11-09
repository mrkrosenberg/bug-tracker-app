import axios from 'axios';

import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';

// Login 
export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    axios.post('/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                // get user data
                dispatch(getUserData());
                // clear any errors in our form
                dispatch({ type: CLEAR_ERRORS});
                // redirect to home page
                history.push('/');
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
};


// Signup
export const signupUser = (newUserData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    axios.post('/signup', newUserData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                // get user data
                dispatch(getUserData());
                // clear any errors in our form
                dispatch({ type: CLEAR_ERRORS});
                // redirect to home page
                history.push('/');
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
};


// Logout & clear out user state
export const logoutUser = () => (dispatch) => {

    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
};


// Fetch current user data
export const getUserData = () => (dispatch) => {

    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
};

// Update user image
export const uploadImage = (formData) => (dispatch) => {

    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => {
            console.log(err)
        })
};

// Update user info/profile
export const editUserDetails = (userDetails) => (dispatch) => {

    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => {
            console.log(err);
        })
};

export const  markNotificationsRead = (notificationIds) => (dispatch) => {

    axios.post('/notifications', notificationIds)
        .then(res => {
            dispatch({ type: MARK_NOTIFICATIONS_READ })
        })
        .catch(err => {
            console.log(err)
        });
};

// Sets authorization header for axios
const setAuthorizationHeader = (token) => {

    const FBIdToken = `Bearer ${token}`;
                // set auth token to local storage
                localStorage.setItem('FBIdToken', FBIdToken);
                // sets headers for axios requests
                axios.defaults.headers.common['Authorization'] = FBIdToken;
};

