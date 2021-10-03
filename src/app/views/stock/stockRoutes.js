import React from 'react'
import { authRoles } from '../../auth/authRoles'

const stockRoutes = [
    {
        path: '/stock',
        component: React.lazy(() => import('./Stock')),
        auth: authRoles.sa,
    }
]

export default stockRoutes