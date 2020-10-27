import axios from 'axios';

import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    axios.post('/login', userData)
            .then(res => {
                const FBIdToken = `Bearer ${res.data.token}`;
                // set auth token to local storage
                localStorage.setItem('FBIdToken', FBIdToken);
                // sets headers for axios requests
                axios.defaults.headers.common['Authorization'] = FBIdToken;
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

export const getUserData = () => (dispatch) => {

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