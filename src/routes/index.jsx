import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/login";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Navbar from "../components/Layout/Navbar";
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
]);

export default router;
