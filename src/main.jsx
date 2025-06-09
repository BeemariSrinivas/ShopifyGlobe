import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/Product Detail.jsx'
import Cart from './components/Cart.jsx'
import CartItem from './components/CartItem.jsx'
import NotFound from './components/NotFound.jsx'
import Home from './components/Home.jsx'

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
        path : "/ProductList",
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
    ],
    errorElement : <NotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
 // <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  //</StrictMode>,
)