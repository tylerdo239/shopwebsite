import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/home/Home";
import ShopPage from "./pages/shop/Shop";
import CartPage from "./pages/cart/Cart";
import LoginPage from "./pages/login/Login";
import DetailPage from "./pages/detail/Detail";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";
import CheckoutPage from "./pages/checkout/Checkout";

// Using router for the website
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "login",
        element: <LoginPage />,
        children: [
          { path: "signup", element: <SignUp /> },
          { path: "signin", element: <SignIn /> },
        ],
      },
      { path: "detail/:detailId", element: <DetailPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
