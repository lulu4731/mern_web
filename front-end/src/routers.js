import React from "react"
import Landing from "./components/Landing"
import About from "./views/About"
import Auth from "./views/Auth"
import Dashboard from "./views/Dashboard"
import NotFound from "./views/NotFound"
import ProtectedRoute from "./views/ProtectedRoute"

const routers = [
    {
        path: "/",
        exact: true,
        main: () => <Landing />,
    },
    {
        path: "/login",
        exact: false,
        main: ({ props }) => <Auth {...props} authRoute="login" />,
    },
    {
        path: "/register",
        exact: false,
        main: ({ props }) => <Auth {...props} authRoute="register" />,
    },
    {
        path: "/dashboard",
        exact: false,
        main: () => <ProtectedRoute component={Dashboard} />,
    },
    {
        path: "/about",
        exact: false,
        main: () => <ProtectedRoute component={About} />,
    },
    {
        path: "",
        exact: false,
        main: () => <NotFound />,
    },
]
export default routers
