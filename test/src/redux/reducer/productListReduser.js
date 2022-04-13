import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RECIVE,
  PRODUCT_LIST_FAILD,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILED,
  PUT_PRODUCT_REQUEST,
  PUT_PRODUCT_SUCCESS,
  PUT_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} from "../types/productListTypes";


const initialState = {
    list:[],
    isLoading: false,
    error: null
  };
  
  const productListReducer = (state = initialState, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case PRODUCT_LIST_RECIVE:
        return {
          ...state,
          list: action.payload,
          isLoading:false
        };
      case POST_PRODUCT_SUCCESS:
        return {
          ...state,
          list: [...state.list, action.data],
          isLoading: false
        };
      case PRODUCT_LIST_FAILD:
        return {
          ...state,
          error:action.error,
          isLoading:false
        };
      case DELETE_PRODUCT_SUCCESS:
          const index = state.list.findIndex(record => record.id === action.id);

          if (index > -1) {
            state.list.splice(index, 1);
          }

          return {
            ...state,
            list: [...state.list],
            isLoading: false
          }
      case PUT_PRODUCT_SUCCESS:
        const productIndex = state.list.findIndex(record=> record.id === action.data.id);
        state.list[productIndex] = action.data;

        return {
          ...state,
          list: [...state.list],
          isLoading: false
        }
      default:
        return state;
    }
  };
  
  export default productListReducer;
  