import * as actions from '../actions/ExpansesDipositesActions'

export const initialState = {
    expances: [],
    diposites: [],
    cash: 0,
    coffre: 0,
    profit: 0,
    monthprofit: [],
    monthsaleprofit: [],
    credit: 0,
    profits: [],
    sale_profits: [],
    sale_profit: 0,
    s: 30,
    loading: false,
    hasErrors: false,
    suc: false,
}

export default function ExpansesDipositesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.CLOSE_SNACKBAR:
            return { ...state, loading: false, hasErrors: false, suc: false }
        case actions.POST_EXP_DIP:
            return { ...state, loading: true, hasErrors: false, suc: false }

        case actions.GET_EXP_DIP:
            return {
                ...state,
                expances: [...action.payload?.expances],
                diposites: [...action.payload?.diposites],
                cash: action.payload.cash,
                coffre: action.payload.coffre,
                profit: action.payload.profit,
                credit: action.payload.credit,
                sale_profit: action.payload.sale_profit,
                profits: [...action.payload.profits],
                sale_profits: [...action.payload.sale_profits],
                monthprofit:[...action.payload.monthprofit],
                monthsaleprofit:[...action.payload.monthsaleprofit],
            }
        case actions.POST_FAILURE:
            return { ...state, loading: false, hasErrors: true, suc: false }
        case actions.POST_EXP_SUCCESS:
            return {
                ...state,
                expances: [action.payload, ...state.expances],
                loading: false,
                hasErrors: false,
                suc: true,
            }
        case actions.POST_DIP_SUCCESS:
            return {
                ...state,
                diposites: [action.payload, ...state.diposites],
                loading: false,
                hasErrors: false,
                suc: true,
            }
        default:
            return state
    }
}
