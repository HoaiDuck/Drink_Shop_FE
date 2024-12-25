import { createBrowserRouter } from "react-router-dom";

import Navbar from "@/components/Layout/Navbar";
import { LoginForm, Account, Home, Register, UnAuthor } from "@/pages";
import {
  Dashboard,
  AccountList,
  Role,
  Request,
  Error,
  Products,
  AddToCart,
  Payment,
} from "@/pages";
import { PrivateRoute } from "@/components/Layout"; // Import ProtectedRoute
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
        path: "unauthorized",
        element: <UnAuthor />,
      },
      {
        path: "AddToCart",
        element: <AddToCart />,
      },
      {
        path: "Payment",
        element: <Payment />,
      },
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
    element: (
      <PrivateRoute action="manage" subject="Dashboard">
        <DashboardLayout />
      </PrivateRoute>
    ),
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
