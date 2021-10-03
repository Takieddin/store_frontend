import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import ClientReducer from './ClientReducer'
import processReducer from './ProcessReducer'
import paymentReducer from './PaymentReducer'
import stockReducer from './StockReducer'
import fournisseurReducer from './FournisseurReducer'
import ExpansesDipositesReducer from './ExpansesDipositesReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    clients: ClientReducer,
    processes:processReducer,
    payments:paymentReducer,
    stocks:stockReducer,
    fournisseurs:fournisseurReducer,
    expdip:ExpansesDipositesReducer,
})

export default RootReducer
