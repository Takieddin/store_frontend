import * as actions from '../actions/PaymentActions'

export const initialState = {
  payments: [],
  loading: false,
  hasErrors: false,
  suc : false,
}

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLOSE_SNACKBAR:
      return {...state, loading: false,hasErrors:false,suc:false}    
    case actions.POST_PAYMENT:
      return {...state, loading: true, hasErrors: false,suc:false}
      case actions.GET_PAYMENTS:
        return {...state, payments:[...action.payload]}
    case actions.POST_PAYMENT_FAILURE:
      return {...state, loading: false, hasErrors: true,suc:false}
    case actions.POST_PAYMENT_SUCCESS:
      return {...state,payments:[action.payload,...state.payments] , loading: false, hasErrors: false,suc:true}
    default:
      return state
  }
}



