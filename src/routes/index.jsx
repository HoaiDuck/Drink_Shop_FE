import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/login";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Navbar from "../components/Layout/Navbar";
import AddToCart from "../pages/AddToCart";
import ProductForm from "../pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Account",
        element: <Account />,
      },
      {
        path: "Product",
        element: <ProductForm/>
      },
      {
        path: "AddToCart",
        element: <AddToCart/>
      }
    ],
  },
  //{
  //     path: "register",
  //     element: <RegisterPage />,
  //},
  {
    path: "Login",
    element: <LoginForm />,
  },
]);

export default router;
