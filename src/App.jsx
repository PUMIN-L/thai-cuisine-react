import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route"
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./components/Spinner";
import ProductContextProvider from "./features/products/contexts/ProductContext";
import OrderContextProvider from "./features/orders/contexts/OrderContext";
function App() {


  return (
    <>
      <Suspense fallback={<Spinner />}>
        <AuthContextProvider>
          <ProductContextProvider>
            <OrderContextProvider>
              <Router />
              <ToastContainer position="bottom-right"
                autoClose={3000}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </OrderContextProvider>
          </ProductContextProvider>
        </AuthContextProvider>

      </Suspense>
    </>
  )
}

export default App
