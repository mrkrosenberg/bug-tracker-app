import { 
    SET_POSTS, 
    LOADING_DATA,
    CREATE_POST, 
    LIKE_POST, 
    UNLIKE_POST, 
    DELETE_POST, LOADING_UI 
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

// Create a new post
export const createPost = (newPost) => {

    dispatch({ type: LOADING_UI });
    axios.post('/posts', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST
            })
        })
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