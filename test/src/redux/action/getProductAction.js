import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RECIVE,
  PRODUCT_LIST_FAILD,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILED,
  PUT_PRODUCT_FAILED,
  PUT_PRODUCT_REQUEST,
  PUT_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS
} from "../types/productListTypes";

export const getProductActions = {
    request: () => ({
      type: PRODUCT_LIST_REQUEST
    }),
    receive: (payload)=> ({
        type:PRODUCT_LIST_RECIVE,
        payload
    }),
    failed: (error) => ({
      type: PRODUCT_LIST_FAILD,
      error
    })
  };

  export const postProductActions = {
    request: () => ({
      type: POST_PRODUCT_REQUEST
    }),
    success: (data) => ({
      type: POST_PRODUCT_SUCCESS,
      data
    }),
    failed: (error) => ({
      type: POST_PRODUCT_FAILED,
      error
    })
  };

  export const putProductActions = {
    request: () => ({
      type: PUT_PRODUCT_REQUEST
    }),
    success: (data) => ({
      type: PUT_PRODUCT_SUCCESS,
      data
    }),
    failed: (error) => ({
      type: PUT_PRODUCT_FAILED,
      error
    })
  };

  export const deleteProductActions = {
    request: () => ({
      type: DELETE_PRODUCT_REQUEST
    }),
    success: (id) => ({
      type: DELETE_PRODUCT_SUCCESS,
      id
    }),
    failed: (error) => ({
      type: DELETE_PRODUCT_FAILED,
      error
    })
  };

  
  export const getProducts = () => async (dispatch) => {
    const { request, receive, failed } = getProductActions;

    dispatch(request());

    try {
      const products = await fetch("http://localhost:3002/products").then(res => res.json());
      dispatch(receive(products));
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
  export const postProduct = (data) => async (dispatch) => {
    const {request, success, failed } = postProductActions;

    dispatch(request());

    try {
      const response = await fetch("http://localhost:3002/products", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => res.json());
      dispatch(success(response))
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
  export const deleteProduct = (id) => async (dispatch) => {
    const { request, success, failed } = deleteProductActions;

    dispatch(request());

    try {
      await fetch(`http://localhost:3002/products/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      });
      dispatch(success(id));
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };

  export const editProduct = (data) => async (dispatch) => {
    const { request, success, failed } = putProductActions;

    dispatch(request());
  
    try {
      const response = await fetch(`http://localhost:3002/products/${data.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json());

      dispatch(success(response));
    } catch (e) {
      console.log('error', e);
      dispatch(failed(e.response.data.error));
    } 
  };
 