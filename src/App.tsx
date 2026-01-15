import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> }
])

export default function App() {
  return <RouterProvider router={router} />
}