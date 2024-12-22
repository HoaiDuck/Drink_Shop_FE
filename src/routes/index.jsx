import { createBrowserRouter } from "react-router-dom";

import Navbar from "@/components/Layout/Navbar";
import { LoginForm, Account, Home, Register } from "@/pages";
import {
  Dashboard,
  AccountList,
  Role,
  Request,
  Error,
  Products,
  AddToCart,
  Payment
} from "@/pages";

import { DashboardLayout } from "@/components/LayoutAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
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
        element: <Products />,
      },
      {
        path: "AddToCart",
        element: <AddToCart/>,
      },
      {
        path: "Payment",
        element: <Payment/>
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
  {
    path: "/Admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "Role",
        element: <Role />,
      },
      {
        path: "Request",
        element: <Request />,
      },
      {
        path: "Account",
        element: <AccountList />,
      },
    ],
  },
]);

export default router;
