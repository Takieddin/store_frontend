// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'
export const GET_CBS = 'GET_CBS'
export const POST_CBS = 'POST_CBS'
export const POST_STOCKS_SUCCESS = 'POST_STOCKS_SUCCESS'
export const POST_CATEGORIES_SUCCESS = 'POST_CATEGORIES_SUCCESS'
export const POST_BRANDS_SUCCESS = 'POST_BRANDS_SUCCESS'
export const POST_CBS_FAILURE = 'POST_CBS_FAILURE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_BRAND = 'SELECT_BRAND'
export const SELECT_STOCK = 'SELECT_STOCK'
export const CLOSE_STOCK_SNACKBAR = 'CLOSE_STOCK_SNACKBAR'

// Create Redux action creators that return an action
export const selectCat = (payload) => ({
    type: SELECT_CATEGORY,
    payload: payload,
})
export const selectBrand = (payload) => ({
    type: SELECT_BRAND,
    payload: payload,
})
export const selectStock = (payload) => ({
    type: SELECT_STOCK,
    payload: payload,
})
export const getCBS = (payload) => ({
    type: GET_CBS,
    payload: payload,
})
export const postCBS = () => ({
    type: POST_CBS,
})

export const postStockSuccess = (stocks) => ({
    type: POST_STOCKS_SUCCESS,
    payload: stocks,
})
export const postCategoriesSuccess = (categories) => ({
    type: POST_CATEGORIES_SUCCESS,
    payload: categories,
})
export const postBrandsSuccess = (brands) => ({
    type: POST_BRANDS_SUCCESS,
    payload: brands,
})
export const postCBSFailure = () => ({
    type: POST_CBS_FAILURE,
})

// Combine them all in an asynchronous thunk
export function fetchCBS() {
    return async (dispatch) => {
        try {
            const response = await fetch(url+'/categories/')
            const categories = await response.json()
            const response2 = await fetch(url+'/brands/')
            const brands = await response2.json()
            const response3 = await fetch(url+'/stocks/')
            const stocks = await response3.json()
            dispatch(
                getCBS({
                    categories: categories,
                    brands: brands,
                    stocks: stocks,
                })
            )
        } catch (error) {
            dispatch(getCBS({}))
        }
    }
}
export function postCategory(payload) {
    return async (dispatch) => {
        dispatch(postCBS())
        try {
            axios
                .post(url+'/categories/', { ...payload })
                .then((res) => {
                    if (
                        res &&
                        res.hasOwnProperty('data') &&
                        res.status == 201
                    ) {
                        dispatch(postCategoriesSuccess(res.data))
                    } else {
                        dispatch(postCBSFailure())
                    }
                })
                .catch((err) => {
                    dispatch(postCBSFailure())
                })
        } catch (error) {
            dispatch(postCBSFailure())
        }
    }
}
export function postBrand(payload) {
    return async (dispatch) => {
        dispatch(postCBS())
        try {
            axios
                .post(url+'/brands/', { ...payload })
                .then((res) => {
                    if (
                        res &&
                        res.hasOwnProperty('data') &&
                        res.status == 201
                    ) {
                        console.log("res")
                        console.log(res)
                        dispatch(postBrandsSuccess(res.data))
                    } else {
                        console.log("resf")
                        console.log(res)
                        dispatch(postCBSFailure())
                    }
                })
                .catch((err) => {
                    console.log("resff")
                    console.log(err)
                    dispatch(postCBSFailure())
                })
        } catch (error) {
            console.log("resfff")
            console.log(error)
            dispatch(postCBSFailure())
        }
    }
}
export function postStock(payload) {
    return async (dispatch) => {
        dispatch(postCBS())
        try {
            axios
                .post(url+'/stocks/', { ...payload })
                .then((res) => {
                    if (
                        res &&
                        res.hasOwnProperty('data') &&
                        res.status == 201
                    ) {
                       
                        dispatch(postStockSuccess(res.data))
                        
                    } else {
                        dispatch(postCBSFailure())
                    }
                })
                .catch((err) => {
                    dispatch(postCBSFailure())
                })
        } catch (error) {
            dispatch(postCBSFailure())
        }
    }
}
/*

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST'
export const GET_CART_LIST = 'GET_CART_LIST'
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST'
export const GET_RATING_LIST = 'GET_RATING_LIST'
export const GET_BRAND_LIST = 'GET_BRAND_LIST'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

export const UPDATE_CART_AMOUNT = 'UPDATE_CART_AMOUNT'

export const getProductList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-product-list').then((res) => {
        dispatch({
            type: GET_PRODUCT_LIST,
            payload: res.data,
        })
    })
}

export const getCategoryList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-category-list').then((res) => {
        dispatch({
            type: GET_CATEGORY_LIST,
            payload: res.data,
        })
    })
}

export const getRatingList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-rating-list').then((res) => {
        dispatch({
            type: GET_RATING_LIST,
            payload: res.data,
        })
    })
}

export const getBrandList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-brand-list').then((res) => {
        dispatch({
            type: GET_BRAND_LIST,
            payload: res.data,
        })
    })
}

export const getCartList = (uid) => (dispatch) => {
    axios.get('/api/ecommerce/get-cart-list', { data: uid }).then((res) => {
        dispatch({
            type: GET_CART_LIST,
            payload: res.data,
        })
    })
}

export const addProductToCart = (uid, productId) => (dispatch) => {
    axios.post('/api/ecommerce/add-to-cart', { uid, productId }).then((res) => {
        console.log(res.data)
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: res.data,
        })
    })
}

export const deleteProductFromCart = (uid, productId) => (dispatch) => {
    axios
        .post('/api/ecommerce/delete-from-cart', { uid, productId })
        .then((res) => {
            dispatch({
                type: DELETE_PRODUCT_FROM_CART,
                payload: res.data,
            })
        })
}

export const updateCartAmount = (uid, productId, amount) => (dispatch) => {
    console.log(uid, productId, amount)
    axios
        .post('/api/ecommerce/update-cart-amount', { uid, productId, amount })
        .then((res) => {
            dispatch({
                type: UPDATE_CART_AMOUNT,
                payload: res.data,
            })
        })
}*/
