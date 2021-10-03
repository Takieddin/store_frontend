import * as actions from '../actions/ClientActions'

export const initialState = {
  clients: [],
  loading: false,
  hasErrors: false,
  selected:1
}

export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLOSE_SNACKBAR:
      return {...state, loading: false,hasErrors:false}
    case actions.GET_CLIENTS:
      return {...state, loading: true}
    case actions.POST_CLIENT:
      return {...state, loading: false, hasErrors: false}
    case actions.GET_CLIENTS_SUCCESS:
      return {clients: action.payload, loading: false, hasErrors: false}
    case actions.SELECT_CLIENT:
        return {...state, selected: action.payload}
    case actions.GET_CLIENTS_FAILURE:
      return {...state, loading: false, hasErrors: true}
    case actions.POST_CLIENT_SUCCESS:
      return {...state,clients:[action.payload,...state.clients] , loading: true, hasErrors: false}
    default:
      return state
  }
}



/*import {
    GET_PRODUCT_LIST,
    GET_CART_LIST,
    ADD_PRODUCT_TO_CART,
    DELETE_PRODUCT_FROM_CART,
    UPDATE_CART_AMOUNT,
    GET_CATEGORY_LIST,
    GET_RATING_LIST,
    GET_BRAND_LIST,
} from '../actions/EcommerceActions'

const initialState = {
    productList: [],
    cartList: [],
}

const ClientReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST: {
            return {
                ...state,
                productList: [...action.payload],
            }
        }
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: [...action.payload],
            }
        }
        case GET_RATING_LIST: {
            return {
                ...state,
                ratingList: [...action.payload],
            }
        }
        case GET_BRAND_LIST: {
            return {
                ...state,
                brandList: [...action.payload],
            }
        }
        case GET_CART_LIST: {
            return {
                ...state,
                cartList: [...action.payload],
            }
        }
        case ADD_PRODUCT_TO_CART: {
            return {
                ...state,
                cartList: [...action.payload],
            }
        }
        case DELETE_PRODUCT_FROM_CART: {
            return {
                ...state,
                cartList: [...action.payload],
            }
        }
        case UPDATE_CART_AMOUNT: {
            return {
                ...state,
                cartList: [...action.payload],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}
export default ClientReducer

*/

