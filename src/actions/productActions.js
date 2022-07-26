import Axios from 'axios';
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, 
  ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, 
  PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, 
  ALL_PRODUCT_LIST_REQUEST,ALL_PRODUCT_LIST_SUCCESS,ALL_PRODUCT_LIST_FAIL,
  PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_FAIL,PRODUCT_REVIEW_CREATE_REQUEST,PRODUCT_REVIEW_CREATE_SUCCESS } from '../constants/productConstants'

  export const listProducts = ({
    pageNumber = '',
    seller = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `http://3.6.86.22:5000/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
  
export const listProductCategories = () => async (dispatch) =>{
  dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST
  });
  try {
      const { data } = await Axios.get(`http://3.6.86.22:5000/api/products/categories`);
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
      dispatch({ type:PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};


export const detailsProduct = (productId) => async (dispatch) =>{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`http://3.6.86.22:5000/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        });
    }
};

export const addProduct = (name, seller, image, category, price, brand, countInStock, rating, numReview, description) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST, payload: { name, seller, image, category, price, brand, countInStock, rating, numReview, description } });
  try {
    const { data } = await Axios.post('http://3.6.86.22:5000/api/products/create', { name, seller, image, category, price, brand, countInStock, rating, numReview, description });
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    localStorage.setItem('productInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      'http://3.6.86.22:5000/api/products',
      {},
      {
        headers: { Authorization: `Sanju ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`http://3.6.86.22:5000/api/products/${product._id}`, product, {
      headers: { Authorization: `Sanju ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`http://3.6.86.22:5000/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const createReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `http://3.6.86.22:5000/api/products/${productId}/reviews`,
      review,
      {
        headers: { Authorization: `Sanju ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};
