import { createBrowserRouter } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import { LoginForm, Account, Home, Register } from "@/pages";
import { Dashboard, AccountList, Role, Request, Error } from "@/pages";
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
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
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
