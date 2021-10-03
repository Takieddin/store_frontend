import * as actions from '../actions/StockActions'

export const initialState = {
  categories: [],
  brands: [],
  stocks: [],
  loading: false,
  hasErrors: false, success:false,
  selectedCategory:0,
  selectedBrand:0,
  selectedStock:0,
}

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLOSE_STOCK_SNACKBAR:
        return {...state, hasErrors: false,success: false}
    case actions.GET_CBS:
      return {...state, categories: action.payload.categories,brands: action.payload.brands,stocks: action.payload.stocks,}
    case actions.POST_CBS:
      return {...state, loading: true}
    case actions.POST_STOCKS_SUCCESS:
      return {...state, stocks: [action.payload, ...state.stocks],loading: false,success:true}
    case actions.POST_CATEGORIES_SUCCESS:
        return {...state, categories: [action.payload, ...state.categories],loading: false,success:true}
    case actions.POST_BRANDS_SUCCESS:
        return {...state, brands: [action.payload, ...state.brands],loading: false,success:true}
    case actions.POST_CBS_FAILURE:
      return {...state, loading: false, hasErrors: true}
    case actions.SELECT_CATEGORY:
        return {...state, selectedCategory: action.payload}
    case actions.SELECT_BRAND:
        return {...state, selectedBrand: action.payload}
    case actions.SELECT_STOCK:
        return {...state, selectedStock: action.payload}
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

