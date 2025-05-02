import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

const router = createHashRouter([
  {
      path: "/",
      Component: App,
      children: [
          { index: true, Component: Home },
          { path: "/cart", Component: Cart },

          
      ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
