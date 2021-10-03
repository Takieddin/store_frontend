import React from 'react'
import { authRoles } from '../../auth/authRoles'

const clientsRoutes = [
    {
        path: '/listClients',
        component: React.lazy(() => import('./Clients')),
        auth: authRoles.sa,
    }
]

export default clientsRoutes
