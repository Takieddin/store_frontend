// Create Redux action types
import axios from 'axios'
import { url } from '../constanst'
export const GET_FOU = 'GET_FOU'
export const POST_FOU = 'POST_FOU'
export const POST_FOU_SUCCESS = 'POST_FOU_SUCCESS'
export const POST_FOU_FAILURE = 'POST_FOU_FAILURE'
export const SELECT_FOU = 'SELECT_FOU'
export const POST_CLEARANCE_SUCCESS = 'POST_CLEARANCE_SUCCESS'
export const CLOSE_FOU_SNACKBAR = 'CLOSE_FOU_SNACKBAR'

// Create Redux action creators that return an action

export const selectFou = (payload) => ({
    type: SELECT_FOU,
    payload: payload,
})
export const getFou = (payload) => ({
    type: GET_FOU,
    payload: payload,
})
export const postFou = () => ({
    type: POST_FOU,
})

export const postFouSuccess = (fou) => ({
    type: POST_FOU_SUCCESS,
    payload: fou,
})
export const postClearanceSuccess = (fou) => ({
    type: POST_CLEARANCE_SUCCESS,
    payload: fou,
})

export const postFouFailure = () => ({
    type: POST_FOU_FAILURE,
})

// Combine them all in an asynchronous thunk
export function fetchFou() {
    return async (dispatch) => {
        try {
            const response = await fetch(url+'/supliers/')
            const fournisseurs = await response.json()
            const response2 = await fetch(url+'/clearances/')
            const clearances = await response2.json()
            dispatch(
                getFou({
                    fournisseurs: fournisseurs,
                    clearances: clearances,
                })
            )
        } catch (error) {
            //dispatch(getFou({}))
        }
    }
}
export function postFournisseur(payload) {
    return async (dispatch) => {
        dispatch(postFou())
        try {
            axios
                .post(url+'/supliers/', { ...payload })
                .then((res) => {
                    if (
                        res &&
                        res.hasOwnProperty('data') &&
                        res.status == 201
                    ) {
                        dispatch(postFouSuccess(res.data))
                    } else {
                        dispatch(postFouFailure())
                    }
                })
                .catch((err) => {
                    dispatch(postFouFailure())
                })
        } catch (error) {
            dispatch(postFouFailure())
        }
    }
}
export function postClearnace(payload) {
    return async (dispatch) => {
        dispatch(postFou())
        try {
            axios
                .post(url+'/clearances/', { ...payload })
                .then((res) => {
                    if (
                        res &&
                        res.hasOwnProperty('data') &&
                        res.status == 201
                    ) {
                        dispatch(postClearanceSuccess(res.data))
                    } else {
                        dispatch(postFouFailure())
                    }
                })
                .catch((err) => {
                    dispatch(postFouFailure())
                })
        } catch (error) {
            dispatch(postFouFailure())
        }
    }
}
