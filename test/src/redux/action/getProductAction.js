import {
  PRODUCT_LIST_REQUEST,
  ADD_PRODUCT_TO_LIST,
  PRODUCT_LIST_RECIVE,
  PRODUCT_LIST_FAILD,
  POST_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT} from "../types/productListTypes";

export const productActions = {
    request: () => ({
      type: PRODUCT_LIST_REQUEST
    }),
    addproduct: (payload) => ({
      type: ADD_PRODUCT_TO_LIST,
      payload
    }),
    productDelete:(id) => ({
      type:DELETE_PRODUCT,
      id
    }),
    postProduct:(data) => ({
      type:POST_PRODUCT,
      data
    }),
    editProduct:(data) => ({
      type:EDIT_PRODUCT,
      data
    }),
    receive:(payload)=> ({
        type:PRODUCT_LIST_RECIVE,
        payload
    }),
    failed: (e) => ({
      type: PRODUCT_LIST_FAILD,
      error: e
    })
  };
  
  export const getProducts = () => async (dispatch) => {
    const { request, receive, failed } = productActions;
    dispatch(request());
    try {
      const products = await fetch("http://localhost:3002/products").then(res => res.json())
      dispatch(receive(products));
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
  export const postProduct = (data) => async (dispatch) => {
    const { request, receive, failed } = productActions;
    try {
      const editProduct = await fetch("http://localhost:3002/products/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      dispatch(productActions.postProduct(data))
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
  export const deleteProduct = (id) => async (dispatch) => {
    const { request, receive, failed } = productActions;
    try {
      const product = await fetch(`http://localhost:3002/products/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      dispatch(productActions.productDelete(id))
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
  export const editProduct = (data) => async (dispatch) => {
    const { request, receive, failed } = productActions;
    try {
      const editProduct = await fetch(`http://localhost:3002/products/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.text()) 
      dispatch(productActions.editProduct(data))
    } catch (e) {
      dispatch(failed(e.response.data.error));
    } 
  };
 