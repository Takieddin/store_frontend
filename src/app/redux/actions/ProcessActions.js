// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'
export const GET_PROCESSES = 'GET_PROCESSES'
export const GET_PROCESSES_SUCCESS = 'GET_PROCESSES_SUCCESS'
export const GET_PROCESSES_FAILURE = 'GET_PROCESSES_FAILURE'
export const POST_PROCESS = 'POST_PROCESS'
export const POST_PROCESS_SUCCESS = 'POST_PROCESS_SUCCESS'
export const SELECT_PROCESS = 'SELECT_PROCESS'
export const ADD_PROCESS_SUCCESS = 'ADD_PROCESS_SUCCESS'
export const CLOSE_STOCK_SNACKBAR = 'CLOSE_STOCK_SNACKBAR'



// Create Redux action creators that return an action
export const getProcesses = () => ({
    type: GET_PROCESSES,
  })
export const postProcess = () => ({
    type: POST_PROCESS,
  })
  
  export const getProcessesSuccess = (clients) => ({
    type: GET_PROCESSES_SUCCESS,
    payload: clients,
  })
  export const addProcessSuccess = (payload) => ({
    type: ADD_PROCESS_SUCCESS,
    payload: payload,
  })
  export const postProcessesSuccess = (client) => ({
    type: POST_PROCESS_SUCCESS,
    payload: client,
  })
  
  export const getProcessesFailure = () => ({
    type: GET_PROCESSES_FAILURE,
  })
// Combine them all in an asynchronous thunk
export function fetchProcesses() {
    return async (dispatch) => {
      dispatch(getProcesses())  
      try {
        const response = await fetch(url+'/processes/')
        const data = await response.json()  
        dispatch(getProcessesSuccess(data))
      } catch (error) {
        dispatch(getProcessesFailure())
      }
    }
  }
  export function addClient(payload) {
    return async (dispatch) => {
      dispatch(postProcess())  
      try {
        axios
        .post(url+'/clients/', { ...payload})
        .then((res) => {
            console.log("rrr")
            console.log(res)
            if(res&&(res.hasOwnProperty("data"))&&(res.status==201)){console.log("a");dispatch(postProcessesSuccess(res.data))}else{dispatch(getProcessesFailure());console.log("b")}
            //console.log(res.data)
            //if(!res.data.hasOwnProperty("id")){getProcessesFailure();console.log(res);console.log("data")}
        //else{dispatch()}
          console.log('err')
    }).catch((err)=>{
        console.log('er')
        dispatch(getProcessesFailure())

    })
      } catch (error) {
          console.log('err')
        dispatch(getProcessesFailure())
      }
    }
  }
  export function addProcess(payload) {
    return async (dispatch) => {
      dispatch(getProcesses())  
      try {
        axios
        .post(url+'/processes/', { ...payload})
        .then((res) => {
            if(res&&(res.hasOwnProperty("data"))&&(res.status==201)){dispatch(addProcessSuccess(res.data))}else{dispatch(getProcessesFailure())}
           
    }).catch((err)=>{
        dispatch(getProcessesFailure())

    })
      } catch (error) {
        dispatch(getProcessesFailure())
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
