import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Blog from "./pages/Blog"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login />},
  { path: "/blog", element: <Blog /> }
])

export default function App() {
  return <RouterProvider router={router} />
}