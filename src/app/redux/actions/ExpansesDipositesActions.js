// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const POST_EXP_DIP = 'POST_EXP_DIP'
export const GET_EXP_DIP = 'GET_EXP_DIP'
export const POST_FAILURE = 'POST_FAILURE'
export const POST_EXP_SUCCESS = 'POST_EXP_SUCCESS'
export const POST_DIP_SUCCESS = 'POST_DIP_SUCCESS'

export const postExp = () => ({
  type: POST_EXP_DIP,
})

export const postExpSuccess = (expance) => ({
  type: POST_EXP_SUCCESS,
  payload: expance,
})
export const postDipSuccess = (diposite) => ({
  type: POST_DIP_SUCCESS,
  payload: diposite,
})
export const getExpDip = (payload) => ({
  type: GET_EXP_DIP,
  payload: payload,
})
export const postExpDipFailure = () => ({
  type: POST_FAILURE,
})
// Combine them all in an asynchronous thunk

export function addExp(payload) {
  return async (dispatch) => {
    dispatch(postExp())
    try {
      axios
        .post(url + '/expances/', { ...payload })
        .then((res) => {
          if (res && (res.hasOwnProperty("data")) && (res.status == 201)) { console.log("a"); dispatch(postExpSuccess(res.data)); } else { dispatch(postExpDipFailure()); console.log("b") }
        }).catch((err) => {
          dispatch(postExpDipFailure())
        })
    } catch (error) {
      dispatch(postExpDipFailure())
    }
  }
}
export function addDip(payload) {
  return async (dispatch) => {
    dispatch(postExp())
    try {
      axios
        .post(url + '/diposites/', { ...payload })
        .then((res) => {
          if (res && (res.hasOwnProperty("data")) && (res.status == 201)) { console.log("a"); dispatch(postDipSuccess(res.data)); } else { dispatch(postExpDipFailure()); console.log("b") }
        }).catch((err) => {
          dispatch(postExpDipFailure())
        })
    } catch (error) {
      dispatch(postExpDipFailure())
    }
  }
}
export function fetchData() {
  return async (dispatch) => {
    dispatch({ type: "GET_DATA" })
    try {

      const fexpances = await fetch(url + '/expances/')
      const fdiposites = await fetch(url + '/diposites/')
      const fcash = await fetch(url + '/cash/')
      const fcoffre = await fetch(url + '/coffre/')
      const fcredit = await fetch(url + '/credit/')
      const fprofit = await fetch(url + '/profit/')
      const fsale_profit = await fetch(url + '/saleprofit/')
      const fsale_profits = await fetch(url + '/saleprofit/?s=30')
      const fprofits = await fetch(url + '/profit/?s=30')
      const fmonthprofit = await fetch(url + '/profit/?s=12')
      const fmonthsaleprofit = await fetch(url + '/saleprofit/?s=12')

      console.log("ss")
      const expances = await fexpances.json()

      const diposites = await fdiposites.json()
      const cash = await fcash.json()
      const coffre = await fcoffre.json()
      const credit = await fcredit.json()
      const profit = await fprofit.json()
      const sale_profit = await fsale_profit.json()
      const sale_profits = await fsale_profits.json()
      const profits = await fprofits.json()
      const monthprofit = await fmonthprofit.json()
      const monthsaleprofit = await fmonthsaleprofit.json()
      console.log("sale_profits")
      console.log(sale_profits)
      const data = { expances: [...expances], diposites: [...diposites], cash: cash?.cash_sum, coffre: coffre?.coffre_sum, profit: profit?.profit_sum, credit: credit?.credit_sum, monthprofit: [...monthprofit?.profit_sum], monthsaleprofit: [...monthsaleprofit?.sale_profit_sum], sale_profit: sale_profit?.sale_profit_sum, sale_profits: [...sale_profits?.sale_profit_sum], profits: [...profits?.profit_sum] }
      console.log(data)

      dispatch(getExpDip({ ...data }))
    } catch (error) {
      dispatch(postExpDipFailure())
    }
  }
}

