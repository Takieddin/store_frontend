import React from 'react'
import { authRoles } from '../../auth/authRoles'

const fournisseursRoutes = [
    {
        path: '/fournisseurs',
        component: React.lazy(() => import('./Fournisseurs')),
        auth: authRoles.sa,
    }
]

export default fournisseursRoutes
