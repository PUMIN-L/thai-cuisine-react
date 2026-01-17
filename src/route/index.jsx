import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy } from "react"

const MainContainer = lazy(() => import("../layouts/MainContainer"))
const Homepage = lazy(() => import("../pages/Homepage"))
const MenuPage = lazy(() => import("../pages/MenuPage"))
const Setting = lazy(() => import("../pages/SettingPage"))
const ProtectedRoute = lazy(
  () => import("../features/althentication/components/ProtectedRoute")
)
const ProductProtectedRoute = lazy(
  () => import("../features/products/components/ProductProtectedRoute")
)
const ProtectedRouteIsAdmin = lazy(
  () => import("../features/althentication/components/ProtectedRouteIsAdmin")
)
const OrdersPage = lazy(() => import("../pages/OrdersPage"))
const SeeOrderPage = lazy(() => import("../pages/SeeOrderPage"))
const ContectUs = lazy(() => import("../pages/ContactUs"))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/setting",
        element: (
          <ProtectedRouteIsAdmin>
            <Setting />
          </ProtectedRouteIsAdmin>
        )
      },
      {
        path: "/menu",
        element: <MenuPage />
      },
      { path: "/contactus", element: <ContectUs /> },
      { path: "/your-order", element: <SeeOrderPage /> },
      { path: "/orders", element: <OrdersPage /> }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
