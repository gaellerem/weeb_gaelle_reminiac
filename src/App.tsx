import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./components/ToastProvider"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Blog from "./pages/Blog"
import Register from "./pages/Register"
import BlogDetail from "./pages/BlogDetail"
import PrivateRoute from "./components/PrivateRoute"
import BlogForm from "./pages/BlogForm"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"

// TODO forgot-password, reset-password, profile, 404
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login />},
    { path: "/register", element: <Register /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:slug", element: <BlogDetail /> },
    { path: "/blog/new", element: <PrivateRoute><BlogForm/></PrivateRoute> },
    { path: "/blog/:slug/edit", element: <PrivateRoute><BlogForm /></PrivateRoute> },
    { path: "/forgot-password", element: <ForgotPassword />},
    { path: "/reset-password", element: <ResetPassword />},
    { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute>}
])

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <RouterProvider router={router} />
            </ToastProvider>
        </AuthProvider>
    )
}