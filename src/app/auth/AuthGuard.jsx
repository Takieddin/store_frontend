import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import AppContext from 'app/contexts/AppContext'
import useAuth from 'app/hooks/useAuth'

const getUserRoleAuthStatus = (pathname, user, routes) => {
    const matched = routes.find((r) => r.path === pathname) || '/'
    const authenticated =
        matched && matched.auth && matched.auth.length
            ? matched.auth.includes(user?.role)
            : false
    console.log(matched, user, authenticated)
    return authenticated
}

const AuthGuard = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState('/')
    const { pathname } = useLocation()

    const { routes } = useContext(AppContext)
    const isUserRoleAuthenticated = getUserRoleAuthStatus(
        pathname,
        user,
        routes
    )
    let authenticated = isAuthenticated && isUserRoleAuthenticated

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE
    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) {
        console.log('/')

        return <>{children}</>
    } else {
        if (isAuthenticated) {
            console.log('op')
            return (
                <Redirect
                    to={{
                        pathname: '/operation',
                        state: { redirectUrl: previouseRoute },
                    }}
                />
            )
        } else {
            return (
                <Redirect
                    to={{
                        pathname: '/session/signin',
                        state: { redirectUrl: previouseRoute },
                    }}
                />
            )
        }
    }
}

export default AuthGuard
