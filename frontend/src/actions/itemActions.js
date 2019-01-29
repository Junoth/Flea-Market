import axios from 'axios';

import { GET_ERRORS, GET_ITEM, GET_CURRENT_ITEMS, GET_ITEMS, GET_AMOUNT, GET_PAGE } from './types';

// Create item
export const createItem = (newItem, history) => dispatch => {
  axios
    .post('/api/items', newItem)
    .then(res => {
      const id = res.data._id;
      history.push(`/create-item/photos/${id}`);
    })
    .catch(err => {
      dispatch(getErrors(err.response.data));  
    })
}

// Edit item
export const editItem = (newItem, id, history) => dispatch => {
  axios
    .post(`/api/items/${id}`, newItem)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch(getErrors(err.response.data)); 
    })
}

// Get item
export const getItem = (id) => dispatch => {
  axios
    .get(`/api/items/${id}`)
    .then(res => {
      dispatch({
        type: GET_ITEM,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response));
}

// Get current items
export const getCurrentItems = () => dispatch => {
  axios
    .get('/api/items/current')
    .then(res => {
      dispatch({
        type: GET_CURRENT_ITEMS,
        payload: res.data
      })
    })
    .catch(err => console.log(err.response));
}

// Get items by page
export const getItems = (page) => dispatch => {
  axios
    .get(`/api/items/page/${page}`)
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data.data
      })
      dispatch({
        type: GET_PAGE,
        payload: res.data.page
      })
    });
}

// Get items by number
export const getItemsByNumber = (num) => dispatch => {
  axios
    .get(`api/items/number/${num}`)
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    })
}

// Get items by search
export const getItemsBySearch = (search, history) => dispatch => {
  axios
    .post('api/items/search/result', search)
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
      history.push('/results')
    })
    .catch(err => {
      dispatch(getErrors(err.response.data));
    })
}

// Get items by user
export const getItemsByUser = (id) => dispatch => {
  axios
    .get(`/api/items/user/${id}`)
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    });
}

// Get amount of items
export const getAmount = () => dispatch => {
  axios
    .get('/api/items/amount')
    .then(res => {
      dispatch({
        type: GET_AMOUNT,
        payload: res.data.amount
      })
    });
}

// Create photos 
export const createPhotos = (photos, id, history) => dispatch => {
  axios
    .post(`/api/items/photos/${id}`, photos)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => console.log(err.response));
}

// Add like
export const addLike = (id) => dispatch => {
  axios
    .post(`/api/items/like/${id}`)
    .then(res => {
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
} 

// Add comment
export const addComment = (id, newComment) => dispatch => {
  axios
    .post(`/api/items/comments/${id}`, newComment)
    .then(res => {
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(getErrors(err.response.data));
    })
}

// Delete comment
export const deleteComment = ( id, commentId ) => dispatch => {
  axios
    .delete(`/api/items/comments/${id}/${commentId}`)
    .then(res => {
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    })
}

// Get errors
export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  }
}