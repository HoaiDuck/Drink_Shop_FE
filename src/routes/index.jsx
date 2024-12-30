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
  DetailItem,
  Cart,
  Bill,
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
        element: (
          <PrivateRoute action="manage" subject="Item">
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <UnAuthor />,
      },
      {
        path: "DetailItem",
        element: <DetailItem />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "Bill",
        element: <Bill/>,
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
