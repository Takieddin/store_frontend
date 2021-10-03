// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'

export const GET_CLIENTS = 'GET_CLIENTS'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS'
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE'
export const POST_CLIENT = 'POST_CLIENT'
export const POST_CLIENT_SUCCESS = 'POST_CLIENT_SUCCESS'
export const SELECT_CLIENT = 'SELECT_CLIENT'

// Create Redux action creators that return an action
export const getClients = () => ({
    type: GET_CLIENTS,
  })
export const postClient = () => ({
    type: POST_CLIENT,
  })
  
  export const getClientsSuccess = (clients) => ({
    type: GET_CLIENTS_SUCCESS,
    payload: clients,
  })
  export const postClientSuccess = (client) => ({
    type: POST_CLIENT_SUCCESS,
    payload: client,
  })
  
  export const getClientsFailure = () => ({
    type: GET_CLIENTS_FAILURE,
  })
// Combine them all in an asynchronous thunk
export function fetchClients() {
    return async (dispatch) => {
      dispatch(getClients())  
      try {
        const response = await fetch(url+'/clients/')
        const data = await response.json()  
        dispatch(getClientsSuccess(data))
      } catch (error) {
        dispatch(getClientsFailure())
      }
    }
  }
  export function addClient(payload) {
    return async (dispatch) => {
      dispatch(postClient())  
      try {
        axios
        .post(url+'/clients/', { ...payload})
        .then((res) => {
            console.log("rrr")
            console.log(res)
            if(res&&(res.hasOwnProperty("data"))&&(res.status==201)){console.log("a");dispatch(postClientSuccess(res.data))}else{dispatch(getClientsFailure());console.log("b")}
            //console.log(res.data)
            //if(!res.data.hasOwnProperty("id")){getClientsFailure();console.log(res);console.log("data")}
        //else{dispatch()}
          console.log('err')
    }).catch((err)=>{
        console.log('er')
        dispatch(getClientsFailure())

    })
      } catch (error) {
          console.log('err')
        dispatch(getClientsFailure())
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
