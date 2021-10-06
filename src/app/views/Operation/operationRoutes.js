import React from 'react'
import { authRoles } from '../../auth/authRoles'

const operationRoutes = [
    {   path: '/operation',
        component: React.lazy(() => import('./Operation')),
        auth: authRoles.editor,
    }
]

export default operationRoutes
