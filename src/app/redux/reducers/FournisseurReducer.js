import * as actions from '../actions/FournisseurActions'

export const initialState = {
  fournisseurs: [],
  clearances: [],
  loading: false,
  hasErrors: false,
  success:false,
  selectedFou:0,
}

export default function fournisseurReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLOSE_FOU_SNACKBAR:
        return {...state, hasErrors: false,success: false}
    case actions.GET_FOU:
      return {...state, fournisseurs: action.payload.fournisseurs,clearances: action.payload.clearances}
    case actions.POST_FOU:
      return {...state, loading: true}
    case actions.POST_FOU_SUCCESS:
        return {...state, fournisseurs: [action.payload, ...state.fournisseurs],loading: false,success:true}
    case actions.POST_CLEARANCE_SUCCESS:
        return {...state, clearances: [action.payload, ...state.clearances],loading: false,success:true}
    case actions.POST_FOU_FAILURE:
      return {...state, loading: false, hasErrors: true}
    case actions.SELECT_FOU:
        return {...state, selectedFou: action.payload}
    default:
      return state
  }
}
