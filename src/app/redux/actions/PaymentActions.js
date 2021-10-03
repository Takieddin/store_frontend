// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const GET_PAYMENTS = 'GET_PAYMENTS'
export const POST_PAYMENT = 'POST_PAYMENT'
export const POST_PAYMENT_SUCCESS = 'POST_PAYMENT_SUCCESS'
export const POST_PAYMENT_FAILURE = 'POST_PAYMENT_FAILURE'

export const postPayment = () => ({
    type: POST_PAYMENT,
  })
  
  export const postPaymentSuccess = (payment) => ({
      type: POST_PAYMENT_SUCCESS,
      payload: payment,
    })  
    export const getPayments = (payments) => ({
        type: GET_PAYMENTS,
        payload: payments,
      })  
    export const postPaymentsFailure = () => ({
        type: POST_PAYMENT_FAILURE,
    })
// Combine them all in an asynchronous thunk

  export function addPayment(payload) {
    return async (dispatch) => {
      dispatch(postPayment())  
      try {
        axios
        .post(url+'/payments/', { ...payload})
        .then((res) => {
            if(res&&(res.hasOwnProperty("data"))&&(res.status==201)){console.log("a");dispatch(postPaymentSuccess(res.data));}else{dispatch(postPaymentsFailure());console.log("b")}
    }).catch((err)=>{
        dispatch(postPaymentsFailure())
    })
      } catch (error) {
        dispatch(postPaymentsFailure())
      }
    }
  }
