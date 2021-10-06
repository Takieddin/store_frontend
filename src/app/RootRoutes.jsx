import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import clientsRoutes from './views/listClients/clientsRoutes'
import stockRoutes from './views/stock/stockRoutes'
import fournisseursRoutes from './views/listFournisseurs/fournisseursRoutes'
import operationRoutes from './views/Operation/operationRoutes'
import { authRoles } from './auth/authRoles'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        auth: authRoles.sa,
        component: () => <Redirect to="/dashboard" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...clientsRoutes,
    ...stockRoutes,
    ...operationRoutes,
    ...fournisseursRoutes,
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
