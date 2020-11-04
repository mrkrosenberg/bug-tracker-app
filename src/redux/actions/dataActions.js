import { 
    SET_POSTS,
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_DATA,
    CREATE_POST, 
    LIKE_POST, 
    UNLIKE_POST, 
    DELETE_POST, 
    LOADING_UI, 
    SET_POST ,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types';

import axios from 'axios';


// Fetch all posts
export const getPosts = () => (dispatch) => {

    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        });
};

// Fetch a single post
export const getPost = (postId) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios.get(`/posts/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => {
            console.log(err)
        });
};

// Create a new post
export const createPost = (newPost) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios.post('/posts', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

// Like a post
export const likePost = (postId) => (dispatch) => {

    axios.get(`/posts/${postId}/like`)
        .then(res => {

            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
};

// Unlike a post
export const unlikePost = (postId) => (dispatch) => {

    axios.get(`/posts/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });
};

// Delete post
export const deletePost = (postId) => (dispatch) => {

    axios.delete(`/posts/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => {
            console.log(err)
        });
};

// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {

    axios.post(`/posts/${postId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            console.log('submit error: ', err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

// Clear errors from global state
export const clearErrors = () =>  (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
};