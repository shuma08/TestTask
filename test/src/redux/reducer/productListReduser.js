import {
  ADD_PRODUCT_TO_LIST, 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RECIVE,
  PRODUCT_LIST_FAILD,
  POST_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from "../types/productListTypes";


const initialState = {
    // list: [ {
    //     title: "First product",
    //     text: "Some text",
    //     photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
    // },
    // {
    //     title: "First product",
    //     text: "Some text",
    //     photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
    // },
    // {
    //     title: "First product",
    //     text: "Some text",
    //     photo: "https://www.thenewsolutions.org/wp-content/uploads/2019/10/bmw-logo-248C3D90E6-seeklogo.com_.png"
    // }],
    list:[],
    isLoading: false,
    error: null
  };
  
  const productListReducer = (state = initialState, action) => {
    console.log("reducer", action); // eslint-disable-line
    switch (action.type) {
      case ADD_PRODUCT_TO_LIST:
        return {
          ...state,
          list: [...state.list, action.payload]
        };
      case PRODUCT_LIST_REQUEST:
        return{
            ...state,
            isLoading:true
        };
        case PRODUCT_LIST_RECIVE:
            return {
                ...state,
                list:action.payload,
                isLoading:false
            };
        case POST_PRODUCT:
            return {
                ...state,
                list:[...state.list,action.data],
                isLoading:false
            };
        case PRODUCT_LIST_FAILD:
            return {
                ...state,
                error:action.error,
                isLoading:false
            };
            case DELETE_PRODUCT:
            const {id}= action;
            const {list}= state
            const itemIndex = list.findIndex(res=> res.id === id)
            const updproducts =[
              ...list.slice(0,itemIndex),
              ...list.slice(itemIndex + 1)
            ]
              return {
                ...state,
                list: updproducts
              }
            case EDIT_PRODUCT:
              const productIndex = state.list.findIndex(res=> res.id === action.data.id)
              return {
                ...state,
                list:[
                  ...state.list.slice(0,productIndex),
                  ...state.list.slice(productIndex + 1),
                  action.data]
              }
      default:
        return state;
    }
  };
  
  export default productListReducer;
  