import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Blog from "./pages/Blog"
import Register from "./pages/Register"
import BlogDetail from "./pages/BlogDetail"
import PrivateRoute from "./components/PrivateRoute"
import BlogEdit from "./pages/BlogEdit"

// TODO forgot-password, reset-password, profile, 404
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login />},
    { path: "/register", element: <Register /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:slug", element: <BlogDetail /> },
    { path: "/blog/:slug/edit", element: <PrivateRoute><BlogEdit /></PrivateRoute> }
])

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}