import { createBrowserRouter } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import { LoginForm, Account, Home } from "@/pages";
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
    ],
  },
  //   {
  //     path: "register",
  //     element: <RegisterPage />,
  //   },
  {
    path: "Login",
    element: <LoginForm />,
  },
  // {
  //   path: "/Admin",
  //   element: <Dashboard />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //     {
  //       path: "Account",
  //       element: <Account />,
  //     },
  //   ],
  // },
]);

export default router;
