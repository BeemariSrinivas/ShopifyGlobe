import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from '../utils/appStore.js'

const App=lazy(()=>import('./App.jsx'));
const ProductList = lazy(()=>import('./components/ProductList.jsx'));
const ProductDetails = lazy(()=>import('./components/Product Detail.jsx'));
const Cart = lazy(()=>import('./components/Cart.jsx'));
const CartItem = lazy(()=>import('./components/CartItem.jsx'));
const NotFound = lazy(()=>import('./components/NotFound.jsx'));
const Home = lazy(()=>import('./components/Home.jsx'));
const Checkout = lazy(()=>import('./components/Checkout.jsx'));

const appRouter = createBrowserRouter([
  {
    path:"/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "/product",
        element : <ProductList />
      },
      {
        path : "/Cart",
        element : <Cart />
      },
      {
        path : "/product/:category",
        element : <ProductList />
      },
      {
        path : "/productDetails/:id",
        element : <ProductDetails />
      },
      {
        path : "/cart/:id",
        element : <CartItem />
      },
    ],
    errorElement : <NotFound/>
  },
  {
    path : "/checkout",
    element : <Checkout />,
    errorElement : <NotFound/>,
  }
]);

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <Provider store={appStore}>
      <Suspense fallback={<div>Loading.......</div>}>
        <RouterProvider router={appRouter}></RouterProvider>
      </Suspense>
    </Provider>
  </StrictMode>,
)